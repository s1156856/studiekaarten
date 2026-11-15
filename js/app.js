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

const SESSION_SIZES = { ml: 50, ds: 20, bigo: 20 };
const ALL_CHAPTERS = "Alle hoofdstukken";

const SUBJECTS = {
  ml: { id: "ml", label: "Machine learning", fallback: ALL_CHAPTERS },
  ds: { id: "ds", label: "Datastructuren", fallback: ALL_CHAPTERS },
  bigo: { id: "bigo", label: "Big-O", fallback: ALL_CHAPTERS },
};

function tagSubject(list, subject) {
  return (list || []).map((q) => ({ ...q, subject }));
}

const QUESTIONS = [
  ...tagSubject(typeof H1_QUESTIONS !== "undefined" ? H1_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H2_QUESTIONS !== "undefined" ? H2_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H3_QUESTIONS !== "undefined" ? H3_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H4_QUESTIONS !== "undefined" ? H4_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H5_QUESTIONS !== "undefined" ? H5_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H6_QUESTIONS !== "undefined" ? H6_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H7_QUESTIONS !== "undefined" ? H7_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H8_QUESTIONS !== "undefined" ? H8_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H9_QUESTIONS !== "undefined" ? H9_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H10_QUESTIONS !== "undefined" ? H10_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H11_QUESTIONS !== "undefined" ? H11_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H12_QUESTIONS !== "undefined" ? H12_QUESTIONS : [], "ml"),
  ...tagSubject(typeof H13_QUESTIONS !== "undefined" ? H13_QUESTIONS : [], "ml"),
  ...tagSubject(typeof DS_VRAGEN !== "undefined" ? DS_VRAGEN : [], "ds"),
  ...tagSubject(typeof BIGO_VRAGEN !== "undefined" ? BIGO_VRAGEN : [], "bigo"),
];

const state = {
  view: "home",
  subject: "ml",
  category: ALL_CHAPTERS,
  level: "basis",
  quiz: null,
  helpOpen: false,
  summaryChapter: 0,
};

const el = {
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
  overlay: document.getElementById("summary-overlay"),
  summaryTitle: document.getElementById("summary-title"),
  summaryNav: document.getElementById("summary-nav"),
  summaryBody: document.getElementById("summary-body"),
};

function chapters() {
  const available = [...new Set(QUESTIONS.filter((q) => q.subject === state.subject).map((q) => q.category).filter(Boolean))].sort(
    (a, b) => {
      const na = Number((a.match(/^H(\d+)/) || [0, 99])[1]);
      const nb = Number((b.match(/^H(\d+)/) || [0, 99])[1]);
      return na - nb;
    }
  );
  return [ALL_CHAPTERS, ...available];
}

function filteredQuestions() {
  return QUESTIONS.filter(
    (q) =>
      q.subject === state.subject &&
      (state.category === ALL_CHAPTERS || q.category === state.category) &&
      q.level === state.level
  );
}

function sessionSize() {
  if (state.subject === "ml" && state.category !== ALL_CHAPTERS) return 20;
  return SESSION_SIZES[state.subject] || 20;
}

function hasQuestionsForLevel(level) {
  return QUESTIONS.some(
    (q) =>
      q.subject === state.subject &&
      (state.category === ALL_CHAPTERS || q.category === state.category) &&
      q.level === level
  );
}

function currentSummary() {
  return typeof SAMENVATTINGEN !== "undefined" ? SAMENVATTINGEN[state.subject] : null;
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
  const allChapters = state.category === ALL_CHAPTERS;
  const items = allChapters
    ? ["Vragen uit alle hoofdstukken"]
    : typeof HOOFDSTUK_FOCUS !== "undefined"
      ? HOOFDSTUK_FOCUS[state.category] || []
      : [];
  el.focusTitle.textContent = allChapters ? "Oefenmix" : `Examenfocus ${state.category.split(" ")[0]}`;
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
  if (!hasQuestionsForLevel(state.level)) {
    const availableLevel = Object.keys(LEVELS).find(hasQuestionsForLevel);
    if (availableLevel) state.level = availableLevel;
  }
  const pool = filteredQuestions();
  const max = pool.length;
  const busy = state.view === "quiz";
  const done = state.view === "result";
  const question = currentQuestion();
  const answered = Boolean(question && state.quiz.queue[0].selected != null);

  el.category.value = state.category;
  setDisabled(el.category, busy);
  document.querySelectorAll("[data-subject]").forEach((btn) => {
    const active = btn.dataset.subject === state.subject;
    btn.classList.toggle("secondary", !active);
    btn.classList.toggle("is-active", active);
    setDisabled(btn, busy);
  });
  document.querySelectorAll("[data-level]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.level === state.level);
    setDisabled(btn, busy || !hasQuestionsForLevel(btn.dataset.level));
  });
  el.sessionMeta.textContent = `${Math.min(sessionSize(), max)} vragen per sessie · ${max} beschikbaar op dit niveau.`;
  setDisabled(el.start, busy || !max);
  el.start.textContent = busy ? "Sessie bezig" : "Start sessie";
  renderFocus();

  if (state.view === "home") {
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
  const target = Math.min(sessionSize(), pool.length);
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

function renderSummary() {
  const pack = currentSummary();
  if (!pack || !el.overlay) return;
  el.summaryTitle.textContent = translateSummaryTerms(pack.titel);
  el.summaryNav.innerHTML = pack.hoofdstukken
    .map(
      (h, i) =>
        `<button type="button" data-summary-chapter="${i}" class="${i === state.summaryChapter ? "is-active" : ""}">${i + 1}</button>`
    )
    .join("");
  el.summaryBody.innerHTML = pack.hoofdstukken
    .map(
      (h, i) =>
        `<article class="summary-chapter" id="summary-chapter-${i}">
          <h3>${i + 1}. ${escapeHtml(translateSummaryTerms(h.titel))}</h3>
          ${h.tekst.map((p) => `<p>${escapeHtml(translateSummaryTerms(p))}</p>`).join("")}
          <ul>${h.kern.map((k) => `<li>${escapeHtml(translateSummaryTerms(k))}</li>`).join("")}</ul>
        </article>`
    )
    .join("");
}

function openSummary() {
  state.summaryChapter = 0;
  renderSummary();
  el.overlay.hidden = false;
  jumpToSummaryChapter(0, false);
}

function closeSummary() {
  el.overlay.hidden = true;
}

function jumpToSummaryChapter(index, smooth = true) {
  state.summaryChapter = Number(index);
  el.summaryNav.querySelectorAll("[data-summary-chapter]").forEach((btn) => {
    btn.classList.toggle("is-active", Number(btn.dataset.summaryChapter) === state.summaryChapter);
  });
  const node = document.getElementById(`summary-chapter-${state.summaryChapter}`);
  if (node) node.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

function setSubject(id) {
  if (!SUBJECTS[id] || id === state.subject || state.view === "quiz") return;
  state.subject = id;
  const available = chapters();
  state.category = available.includes(SUBJECTS[id].fallback) ? SUBJECTS[id].fallback : available[0] || "";
  fillChapters();
  render();
}

document.addEventListener("click", (event) => {
  const subject = event.target.closest("[data-subject]");
  if (subject) {
    if (subject.disabled) return;
    setSubject(subject.dataset.subject);
    return;
  }
  if (event.target.closest("#open-summary")) {
    openSummary();
    return;
  }
  if (event.target.closest("#close-summary") || event.target === el.overlay) {
    closeSummary();
    return;
  }
  const summaryChapter = event.target.closest("[data-summary-chapter]");
  if (summaryChapter) {
    jumpToSummaryChapter(summaryChapter.dataset.summaryChapter);
    return;
  }
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && el.overlay && !el.overlay.hidden) closeSummary();
});

fillChapters();
render();
