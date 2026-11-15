const TYPE_LABELS = {
  abc: "Meerkeuze A–C",
  abcd: "Meerkeuze A–D",
  tf: "Waar / niet waar",
};

const LEVELS = {
  basis: "Basis",
  gemiddeld: "Gemiddeld",
  moeilijk: "Moeilijk",
};

const SESSION_SIZE = 20;

const QUESTIONS = [
  ...(typeof H1_QUESTIONS !== "undefined" ? H1_QUESTIONS : []),
  ...(typeof H2_QUESTIONS !== "undefined" ? H2_QUESTIONS : []),
  ...(typeof H3_QUESTIONS !== "undefined" ? H3_QUESTIONS : []),
  ...(typeof H4_QUESTIONS !== "undefined" ? H4_QUESTIONS : []),
  ...(typeof H5_QUESTIONS !== "undefined" ? H5_QUESTIONS : []),
  ...(typeof H6_QUESTIONS !== "undefined" ? H6_QUESTIONS : []),
  ...(typeof H7_QUESTIONS !== "undefined" ? H7_QUESTIONS : []),
  ...(typeof H8_QUESTIONS !== "undefined" ? H8_QUESTIONS : []),
  ...(typeof H9_QUESTIONS !== "undefined" ? H9_QUESTIONS : []),
  ...(typeof H10_QUESTIONS !== "undefined" ? H10_QUESTIONS : []),
  ...(typeof H11_QUESTIONS !== "undefined" ? H11_QUESTIONS : []),
  ...(typeof H12_QUESTIONS !== "undefined" ? H12_QUESTIONS : []),
  ...(typeof H13_QUESTIONS !== "undefined" ? H13_QUESTIONS : []),
];

const state = {
  view: "home",
  category: "H2 Statistical Learning",
  level: "basis",
  quiz: null,
  helpOpen: false,
};

const el = {
  mode: document.getElementById("app-mode"),
  category: document.getElementById("home-category"),
  sessionMeta: document.getElementById("session-meta"),
  start: document.getElementById("start-session"),
  focusTitle: document.getElementById("focus-title"),
  focusList: document.getElementById("focus-list"),
  statusLeft: document.getElementById("status-left"),
  statusRight: document.getElementById("status-right"),
  progress: document.getElementById("progress-bar"),
  badge: document.getElementById("q-badge"),
  text: document.getElementById("q-text"),
  helpBtn: document.getElementById("toggle-help"),
  helpPanel: document.getElementById("help-panel"),
  helpBody: document.getElementById("help-body"),
  feedback: document.getElementById("feedback"),
  stop: document.getElementById("btn-stop"),
  next: document.getElementById("btn-next"),
  slots: [...document.querySelectorAll("[data-slot]")],
};

function chapters() {
  return [...new Set(QUESTIONS.map((q) => q.category).filter(Boolean))].sort((a, b) => {
    const na = Number((a.match(/^H(\d+)/) || [0, 99])[1]);
    const nb = Number((b.match(/^H(\d+)/) || [0, 99])[1]);
    return na - nb;
  });
}

function filteredQuestions() {
  return QUESTIONS.filter((q) => q.category === state.category && q.level === state.level);
}

function levelLabel(level) {
  return LEVELS[level] || "";
}

function letters(count) {
  return ["A", "B", "C", "D"].slice(0, count);
}

function isCorrect(selected, answer) {
  return Number(selected) === Number(answer);
}

function currentQuestion() {
  const item = state.quiz?.queue[0];
  if (!item) return null;
  return QUESTIONS.find((q) => q.id === item.id) || null;
}

function eindcijfer(quiz) {
  if (!quiz.target) return "–";
  return (Math.round((quiz.correct / quiz.target) * 100) / 10).toFixed(1);
}

function aandachtspunten(quiz) {
  const seen = new Set();
  const tips = [];
  quiz.wrongIds.forEach((id) => {
    const question = QUESTIONS.find((q) => q.id === id);
    if (!question || typeof begrippenVoor !== "function") return;
    begrippenVoor(question).forEach((item) => {
      const naam = item.titel || item.names[0];
      if (seen.has(naam)) return;
      seen.add(naam);
      tips.push(naam);
    });
  });
  return tips.slice(0, 8);
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setDisabled(node, off) {
  node.disabled = off;
}

function fillChapters() {
  el.category.innerHTML = chapters()
    .map((c) => `<option value="${escapeAttr(c)}">${escapeHtml(c)}</option>`)
    .join("");
  el.category.value = state.category;
}

function renderFocus() {
  const items = typeof HOOFDSTUK_FOCUS !== "undefined" ? HOOFDSTUK_FOCUS[state.category] || [] : [];
  el.focusTitle.textContent = `Examenfocus ${state.category.split(" ")[0]}`;
  el.focusList.innerHTML = items.map((term) => `<li>${escapeHtml(term)}</li>`).join("");
}

function renderHelp(question) {
  if (!question || !state.helpOpen) {
    el.helpPanel.classList.add("is-idle");
    el.helpBtn.classList.remove("is-open");
    el.helpBody.innerHTML = `<p class="meta">Druk op ? bij een vraag voor uitleg van termen en afkortingen.</p>`;
    return;
  }
  el.helpPanel.classList.remove("is-idle");
  el.helpBtn.classList.add("is-open");
  const items = typeof begrippenVoor === "function" ? begrippenVoor(question) : [];
  if (!items.length) {
    el.helpBody.innerHTML = `<p class="meta">Geen extra begrippen voor deze vraag.</p>`;
    return;
  }
  el.helpBody.innerHTML = `<dl>${items
    .map(
      (item) =>
        `<div><dt>${escapeHtml(item.titel || item.names[0])}</dt><dd>${escapeHtml(item.tekst)}</dd></div>`
    )
    .join("")}</dl>`;
}

function renderChoices(question, selected, answered) {
  el.slots.forEach((slot, i) => {
    slot.classList.remove("is-correct", "is-wrong", "is-selected");
    const opt = question?.options[i];
    if (!question || opt == null) {
      slot.textContent = "—";
      slot.disabled = true;
      delete slot.dataset.choice;
      return;
    }
    const letter = question.type === "tf" ? "" : `${letters(question.options.length)[i]}. `;
    slot.textContent = `${letter}${opt}`;
    slot.dataset.choice = String(i);
    slot.disabled = state.view !== "quiz" || answered;
    if (answered && i === Number(selected)) slot.classList.add("is-selected");
    if (answered && i === Number(question.answer)) slot.classList.add("is-correct");
    if (answered && i === Number(selected) && !isCorrect(i, question.answer)) slot.classList.add("is-wrong");
  });
}

function render() {
  const pool = filteredQuestions();
  const max = pool.length;
  const busy = state.view === "quiz";
  const done = state.view === "result";
  const question = currentQuestion();
  const answered = Boolean(question && state.quiz.queue[0].selected != null);

  el.category.value = state.category;
  setDisabled(el.category, busy);
  document.querySelectorAll("[data-level]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.level === state.level);
    setDisabled(btn, busy);
  });
  el.sessionMeta.textContent = `${Math.min(SESSION_SIZE, max)} vragen per sessie · ${max} beschikbaar op dit niveau.`;
  setDisabled(el.start, busy || !max);
  el.start.textContent = busy ? "Sessie bezig" : "Start sessie";
  renderFocus();

  if (state.view === "home") {
    el.mode.textContent = "Start";
    el.statusLeft.textContent = "Nog geen sessie";
    el.statusRight.textContent = "Cijfer: —";
    el.progress.style.width = "0%";
    el.badge.textContent = `${state.category} · ${levelLabel(state.level)}`;
    el.text.textContent = "Start een sessie om vragen te oefenen.";
    setDisabled(el.helpBtn, true);
    state.helpOpen = false;
    renderChoices(null, null, true);
    el.feedback.className = "feedback is-idle";
    el.feedback.textContent = "Kies een antwoord.";
    setDisabled(el.stop, true);
    setDisabled(el.next, true);
    el.stop.textContent = "Stoppen";
    el.next.textContent = "Volgende";
    renderHelp(null);
    return;
  }

  if (state.view === "result") {
    const quiz = state.quiz;
    const cijfer = eindcijfer(quiz);
    const tips = aandachtspunten(quiz);
    el.mode.textContent = "Cijfer";
    el.statusLeft.textContent = "Sessie klaar";
    el.statusRight.textContent = `Cijfer: ${cijfer}`;
    el.progress.style.width = "100%";
    el.badge.textContent = `${state.category} · ${levelLabel(state.level)}`;
    el.text.textContent = quiz.wrongIds.length
      ? `Je moet meer aandacht besteden aan: ${tips.join(", ") || "deze stof"}.`
      : "Geen extra aandachtspunten — alles goed.";
    setDisabled(el.helpBtn, true);
    state.helpOpen = false;
    renderChoices(null, null, true);
    el.feedback.className = "feedback ok";
    el.feedback.textContent = `${quiz.correct} van ${quiz.target} goed. Eindcijfer ${cijfer}.`;
    setDisabled(el.stop, false);
    setDisabled(el.next, false);
    el.stop.textContent = "Stoppen";
    el.next.textContent = "Nog een sessie";
    renderHelp(null);
    return;
  }

  const quiz = state.quiz;
  const number = quiz.target - quiz.queue.length + 1;
  const correct = answered && isCorrect(quiz.queue[0].selected, question.answer);
  el.mode.textContent = "Sessie";
  el.statusLeft.textContent = `Vraag ${number} van ${quiz.target}`;
  el.statusRight.textContent = `Goed: ${quiz.correct} / ${quiz.answered}`;
  el.progress.style.width = `${Math.round(((number - (answered ? 0 : 1)) / quiz.target) * 100)}%`;
  el.badge.textContent = `${question.category} · ${levelLabel(question.level)} · ${TYPE_LABELS[question.type]}`;
  el.text.textContent = question.prompt;
  setDisabled(el.helpBtn, false);
  renderChoices(question, quiz.queue[0].selected, answered);
  if (!answered) {
    el.feedback.className = "feedback is-idle";
    el.feedback.textContent = "Kies een antwoord.";
  } else if (correct) {
    el.feedback.className = "feedback ok";
    el.feedback.textContent = "Goed.";
  } else {
    el.feedback.className = "feedback bad";
    el.feedback.textContent = `Fout. Het juiste antwoord is ${labelFor(question, question.answer)}.`;
  }
  setDisabled(el.stop, false);
  setDisabled(el.next, !answered);
  el.stop.textContent = "Stoppen";
  el.next.textContent = quiz.queue.length === 1 ? "Bekijk cijfer" : "Volgende";
  renderHelp(question);
}

function labelFor(question, index) {
  if (question.type === "tf") return question.options[index];
  return `${letters(question.options.length)[index]}. ${question.options[index]}`;
}

function startSession() {
  if (el.start.disabled) return;
  const pool = shuffle(filteredQuestions());
  if (!pool.length) return;
  const target = Math.min(SESSION_SIZE, pool.length);
  state.helpOpen = false;
  state.quiz = {
    target,
    correct: 0,
    answered: 0,
    wrongIds: [],
    queue: pool.slice(0, target).map((q) => ({ id: q.id, selected: null })),
  };
  state.view = "quiz";
  render();
}

function goHome() {
  state.view = "home";
  state.quiz = null;
  state.helpOpen = false;
  render();
}

function answerCurrent(index) {
  if (state.view !== "quiz") return;
  const current = state.quiz.queue[0];
  if (current.selected != null) return;
  const question = QUESTIONS.find((q) => q.id === current.id);
  current.selected = Number(index);
  state.quiz.answered += 1;
  if (isCorrect(current.selected, question.answer)) state.quiz.correct += 1;
  else state.quiz.wrongIds.push(question.id);
  render();
}

function nextQuestion() {
  if (el.next.disabled) return;
  if (state.view === "result") {
    startSession();
    return;
  }
  const quiz = state.quiz;
  quiz.queue.shift();
  state.helpOpen = false;
  if (!quiz.queue.length) {
    state.view = "result";
    render();
    return;
  }
  render();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

document.addEventListener("click", (event) => {
  const level = event.target.closest("[data-level]");
  if (level) {
    if (level.disabled) return;
    state.level = level.dataset.level;
    render();
    return;
  }
  if (event.target.closest("#start-session")) startSession();
  if (event.target.closest("#btn-stop")) {
    if (!el.stop.disabled) goHome();
    return;
  }
  if (event.target.closest("#btn-next")) nextQuestion();
  if (event.target.closest("#toggle-help")) {
    if (el.helpBtn.disabled) return;
    state.helpOpen = !state.helpOpen;
    render();
    return;
  }
  const choice = event.target.closest("[data-choice]");
  if (choice && !choice.disabled) answerCurrent(choice.dataset.choice);
});

el.category.addEventListener("change", () => {
  if (el.category.disabled) return;
  state.category = el.category.value;
  render();
});

fillChapters();
render();
