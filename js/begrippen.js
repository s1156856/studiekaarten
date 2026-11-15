const BEGRIPPEN = [
  { titel: "n (aantal observaties)", names: [" n ", "observaties", "sample size"], tekst: "n is het aantal observaties (rijen) in de dataset." },
  { titel: "p (aantal predictors)", names: ["predictors", "p predictors", "aantal variabelen"], tekst: "p is het aantal predictors/features (kolommen, behalve Y)." },
  { titel: "Statistical learning", names: ["statistical learning"], tekst: "Methoden om uit data f te schatten: inference (begrijpen) en prediction (voorspellen)." },
  { titel: "Supervised learning", names: ["supervised"], tekst: "Leren mét een bekende response Y bij elke X (regressie of classificatie)." },
  { titel: "Unsupervised learning", names: ["unsupervised"], tekst: "Geen Y: structuur in X zoeken, zoals PCA of clustering." },
  { titel: "Prediction", names: ["prediction", "voorspell"], tekst: "Doel: Ŷ zo goed mogelijk. Interpretatie van f is secundair." },
  { titel: "Inference", names: ["inference"], tekst: "Doel: begrijpen hoe Y samenhangt met X." },
  { titel: "Response Y", names: ["response variable", "response", " uitkomst"], tekst: "Y is de output die je wilt verklaren of voorspellen." },
  { titel: "Predictor / feature X", names: ["predictor", "feature", "invoervariabele"], tekst: "X is een invoervariabele. Ook: feature of covariate." },
  { titel: "Error term ε", names: ["error term", "foutterm", "ε", "epsilon", "irreducible"], tekst: "ε in Y = f(X) + ε: onverklaarde ruis. Irreducible error verdwijnt nooit helemaal." },
  { titel: "MSE (mean squared error)", names: ["mse", "mean squared error"], tekst: "Gemiddelde van gekwadrateerde fouten (yi − ŷi)². Vaak gebruikt als verliesfunctie bij regressie." },
  { titel: "Bias", names: ["bias"], tekst: "Systematische misser: het model kan de echte f niet vatten. Hoge bias → underfitting." },
  { titel: "Variantie", names: ["variantie", "variance"], tekst: "Hoe sterk de fit verandert bij een andere steekproef. Hoge variantie → overfitting." },
  { titel: "Overfitting", names: ["overfitting", "overfit"], tekst: "Te goed op training, slecht op nieuwe data. Vaak hoge variantie." },
  { titel: "Underfitting", names: ["underfitting", "underfit"], tekst: "Te simpel model. Trainingsfout én testfout hoog. Vaak hoge bias." },
  { titel: "Generalisatie", names: ["generalisatiefout", "generalization", "generalisatie"], tekst: "Prestatie op ongeziene data. Dit wil je optimaliseren, niet alleen de trainingsfout." },
  { titel: "Training- vs testdata", names: ["trainingsdata", "treindata", "testdata", "trainingset", "testset"], tekst: "Training: model schatten. Test: eerlijke prestatie / generalisatie meten." },
  { titel: "Regressie", names: ["regressie", "regression"], tekst: "Y is kwantitatief (getal): prijs, temperatuur, omzet." },
  { titel: "Classificatie", names: ["classificatie", "classification"], tekst: "Y is categorisch (label): spam/geen spam, stijgt/daalt." },
  { titel: "RSS (residual sum of squares)", names: ["rss", "residual sum of squares"], tekst: "RSS = Σ(yi − ŷi)². Least squares kiest β zo dat RSS minimaal is." },
  { titel: "TSS (total sum of squares)", names: ["tss", "total sum of squares"], tekst: "TSS = Σ(yi − ȳ)², totale spreiding van Y. R² = 1 − RSS/TSS." },
  { titel: "RSE (residual standard error)", names: ["rse", "residual standard error"], tekst: "Schatting van σ. √(RSS/(n−p−1)). Meet lack of fit in dezelfde eenheid als Y." },
  { titel: "R²", names: ["r²", "r2", "r-squared"], tekst: "Aandeel verklaarde variantie in Y: 1 − RSS/TSS. Lig tussen 0 en 1. Stijgt op training als je een predictor toevoegt." },
  { titel: "Least squares", names: ["least squares", "kleinste kwadraten"], tekst: "Schat β door RSS te minimaliseren." },
  { titel: "Intercept β0 / slope β1", names: ["intercept", "slope", "β0", "β1", "beta0", "beta1"], tekst: "β0: Y als predictors 0 zijn. β1: verandering in Y bij +1 op X (ceteris paribus)." },
  { titel: "t-statistic", names: ["t-statistic", "t-statistiek", "t-toets"], tekst: "t = β̂j / SE(β̂j). Groot |t| → coefficient wijkt sterk van 0 af." },
  { titel: "SE (standard error)", names: ["standard error", "standaardfout", "std. error"], tekst: "SE meet de onzekerheid van een schatting (bijv. van β̂)." },
  { titel: "p-waarde", names: ["p-waarde", "p-value", "p value"], tekst: "Kans op zo’n resultaat (of extremer) als H0 waar is. Klein (vaak < 0,05) → verwerp H0." },
  { titel: "H0 / Ha", names: ["h0", "null hypothesis", "nulhypothese", "ha "], tekst: "H0: geen effect (vaak β = 0). Ha: wel een effect." },
  { titel: "F-statistic", names: ["f-statistic", "f-toets", "f-test"], tekst: "Toetst H0: β1 = … = βp = 0. F ≈ 1 past bij geen verband; F ≫ 1 wijst op minstens één nuttige predictor." },
  { titel: "VIF (variance inflation factor)", names: ["vif", "variance inflation", "collineariteit", "collinearity"], tekst: "VIF meet collineariteit. Hoge VIF: predictors hangen samen, SE’s van β worden groot." },
  { titel: "Dummy / one-hot", names: ["dummy", "indicator", "one-hot", "one hot"], tekst: "Codering van een factor. Bij k niveaus: k−1 dummy’s. Het weggelaten niveau is de baseline." },
  { titel: "Interaction / synergy", names: ["interaction", "interactie", "synergy", "synergie"], tekst: "Effect van X1 hangt af van X2 (productterm). In marketing: synergy." },
  { titel: "Confidence interval", names: ["confidence interval", "betrouwbaarheidsinterval"], tekst: "Interval voor een parameter of voor het gemiddelde f(X). Meet schattingsonzekerheid." },
  { titel: "Prediction interval", names: ["prediction interval"], tekst: "Interval voor één nieuwe Y. Wijder dan een CI, want irreducible error telt mee." },
  { titel: "KNN (k-nearest neighbors)", names: ["knn", "k-nearest", "nearest neighbors", "k nearest"], tekst: "Non-parametrisch: voorspel met de K dichtstbijzijnde punten. Flexibel, zwak bij grote p (curse of dimensionality)." },
  { titel: "Logistic regression", names: ["logistic regression", "logistische", "logit"], tekst: "Classificatie: modelleert P(Y=1|X) via de logistic functie. Log-odds zijn lineair in X." },
  { titel: "Odds / log-odds", names: ["odds", "log-odds", "log odds"], tekst: "Odds = p / (1−p). Log-odds = logit(p). Logistic regression is lineair in de log-odds." },
  { titel: "LDA (linear discriminant analysis)", names: ["lda", "linear discriminant", "discriminant analysis"], tekst: "Classificatie: schat klassen-dichtheden (vaak normaal) met gedeelde covarianties. Beslissingsgrens is lineair." },
  { titel: "QDA (quadratic discriminant analysis)", names: ["qda", "quadratic discriminant"], tekst: "Zoals LDA, maar elke klasse heeft een eigen covariantiestructuur. Beslissingsgrens is kwadratisch." },
  { titel: "Naive Bayes", names: ["naive bayes", "naïve bayes", "naieve bayes"], tekst: "Classificatie: neemt aan dat features binnen een klasse onafhankelijk zijn. Werkt vaak goed, ook bij grotere p." },
  { titel: "ROC / AUC", names: ["roc", "auc", "roc-curve"], tekst: "ROC: true positive rate vs false positive rate bij verschillende drempels. AUC: oppervlak onder de ROC; 1 is perfect, 0,5 is kans." },
  { titel: "Confusion matrix", names: ["confusion matrix", "verwarringsmatrix", "true positive", "false positive", "sensitivity", "specificity", "sensitiviteit", "specificiteit"], tekst: "Tabel van voorspelde vs echte labels. Sensitivity = TPR, specificity = 1 − FPR." },
  { titel: "GLM (generalized linear model)", names: ["glm", "generalized linear", "poisson regression", "poisson"], tekst: "Uitbreiding van linear regression (andere error-verdeling en link). Logistic en Poisson regression zijn GLM’s." },
  { titel: "CV (cross-validation)", names: ["cross-validation", "kruisvalidatie", "k-fold", "k fold"], tekst: "Verdeel data in folds: train op een deel, valideer op de rest, herhaal. Schat testfout zonder aparte vaste testset." },
  { titel: "LOOCV (leave-one-out CV)", names: ["loocv", "leave-one-out", "leave one out"], tekst: "CV met n folds: telkens één observatie weglaten. Bijna zuiver, vaak hoge variantie en duur." },
  { titel: "Validation set", names: ["validation set", "validatieset"], tekst: "Eén split: train op een deel, evalueer op de rest. Eenvoudig, maar de schatting hangt van de split af." },
  { titel: "Bootstrap", names: ["bootstrap"], tekst: "Steekproeven mét teruglegging uit de data. Schat SE’s, CI’s of de nauwkeurigheid van een statistiek." },
  { titel: "Best subset / stepwise", names: ["best subset", "forward selection", "backward selection", "stepwise", "mixed selection"], tekst: "Manieren om predictors te kiezen. Backward kan niet als p > n. Forward kan altijd." },
  { titel: "Cp / AIC / BIC", names: ["mallows", " cp", "aic", "bic", "adjusted r"], tekst: "Criteria die fit én complexiteit meewegen. BIC straft extra parameters zwaarder dan AIC (vooral bij grote n)." },
  { titel: "Ridge regression", names: ["ridge"], tekst: "Least squares + L2-straf λΣβj². Krimpt coëfficiënten, zet ze niet op 0. Helpt bij collineariteit." },
  { titel: "Lasso", names: ["lasso"], tekst: "Least squares + L1-straf λΣ|βj|. Kan coëfficiënten op 0 zetten → automatische selectie." },
  { titel: "λ (tuning parameter)", names: ["tuning parameter", "λ", "lambda"], tekst: "Strafsterkte bij ridge/lasso. Groot λ: meer krimpen. Kies λ meestal met CV." },
  { titel: "PCR (principal components regression)", names: ["pcr", "principal components regression"], tekst: "Regressie van Y op de eerste principale componenten van X. Dimension reduction, unsupervised in de X-stap." },
  { titel: "PLS (partial least squares)", names: ["pls", "partial least squares"], tekst: "Zoals PCR, maar componenten gebruiken ook Y. Vaak minder componenten nodig dan PCR." },
  { titel: "High-dimensional (p > n)", names: ["high-dimensional", "p > n", "p>n", "p groter"], tekst: "Meer predictors dan observaties. Least squares is niet uniek. Ridge/lasso/PCR zijn dan nuttig." },
  { titel: "Polynomial regression", names: ["polynomial", "polynoom"], tekst: "Voeg X², X³, … toe. Nog lineair in β." },
  { titel: "Basis / splines / knots", names: ["basis function", "spline", "knot", "knots", "smoothing spline"], tekst: "Flexibele stukken polynoom, aan elkaar op knots. Smoothing splines straffen te veel wiggelen." },
  { titel: "GAM (generalized additive model)", names: ["gam", "additive model", "generalized additive"], tekst: "Y ≈ β0 + f1(X1) + f2(X2) + … : soepele effecten per predictor, wél additief (geen interactie tenzij je die extra zet)." },
  { titel: "Decision tree / CART", names: ["decision tree", "beslisboom", "cart", "regression tree", "classification tree"], tekst: "Splits de ruimte in rechthoeken. Goed interpreteerbaar, maar instabiel; daarom bagging/RF/boosting." },
  { titel: "Gini / entropy", names: ["gini", "entropy", "entropie", "information gain", "node impurity"], tekst: "Onzuiverheidsmaten in classificatiebomen. Lage Gini/entropy = zuivere knoop." },
  { titel: "Pruning", names: ["pruning", "snoeien", "cost-complexity"], tekst: "Takken wegsnoeien om overfitting van een grote boom te beperken." },
  { titel: "Bagging", names: ["bagging", "bootstrap aggregating"], tekst: "Veel bomen op bootstrap-steekproeven, daarna middelen/stemmen. Verlaagt variantie." },
  { titel: "Random forest", names: ["random forest", "random forests"], tekst: "Bagging + bij elke split maar een willekeurige subset features. Decorreleert bomen." },
  { titel: "Boosting / GBM", names: ["boosting", "gbm", "gradient boosting", "adaboost", "xgboost"], tekst: "Bomen na elkaar: elke nieuwe boom corrigeert restfouten. shrinkage (λ) en aantal bomen met CV kiezen." },
  { titel: "BART", names: ["bart", "bayesian additive"], tekst: "Bayesian Additive Regression Trees: som van bomen met een prior die overfitting temt." },
  { titel: "Variable importance", names: ["variable importance", "feature importance"], tekst: "Hoeveel een predictor bijdraagt in een boomensemble (bijv. daling impurity of permutatie)." },
  { titel: "Hyperplane / margin", names: ["hyperplane", "margin", "maximal margin"], tekst: "Scheidingsvlak. Maximal margin: zo breed mogelijke strook tussen klassen. Support vectors liggen op de rand." },
  { titel: "Support vector / SVM", names: ["support vector", "svm", "support vector machine", "svc", "support vector classifier"], tekst: "SVC/SVM: classificeer met een (kernel)hyperplane. C stuurt de zachte margin. Kernels maken niet-lineaire grenzen." },
  { titel: "Kernel trick", names: ["kernel", "radial", "rbf", "polynomial kernel"], tekst: "Reken inner products in een hogere ruimte zonder die ruimte expliciet te bouwen. RBF/polynomial kernels zijn gangbaar." },
  { titel: "C (SVM cost)", names: ["svm", "soft margin", "slack", "klein c", "grote c"], tekst: "Bij SVM: hoe hard overtredingen van de margin worden bestraft. Klein C: bredere, soepelere margin." },
  { titel: "Neural network / MLP", names: ["neural", "hidden layer", "mlp", "multilayer", "deep learning"], tekst: "Lagen van gewogen som + non-lineaire activatie. Deep = veel lagen. Weights via backpropagation." },
  { titel: "Activatie (ReLU, sigmoid)", names: ["relu", "sigmoid", "activation", "activatie", "softmax"], tekst: "Non-lineariteit per neuron. ReLU is standaard in diepe netten; sigmoid/softmax bij kansen." },
  { titel: "Backpropagation", names: ["backprop", "backpropagation", "gradient descent", "sgd", "epoch"], tekst: "Gradients van de loss t.o.v. weights, laag-voor-laag terug. SGD/Adam updaten de weights." },
  { titel: "Dropout / regularization (DL)", names: ["dropout", "weight decay"], tekst: "Dropout: tijdens training willekeurig neuronen uit. Tegen overfitting, naast weight decay." },
  { titel: "CNN / RNN", names: ["cnn", "convolution", "rnn", "lstm", "recurrent"], tekst: "CNN: lokale filters, sterk bij beelden. RNN/LSTM: sequenties (tekst, tijd)." },
  { titel: "Survival / censoring", names: ["survival", "censoring", "gecensureerd", "time-to-event"], tekst: "Tijd tot event. Censoring: je weet alleen dat het event ná een tijd nog niet gebeurde." },
  { titel: "Kaplan–Meier", names: ["kaplan", "km-curve", "survival curve"], tekst: "Niet-parametrische schatting van de overlevingsfunctie, rekening houdend met censoring." },
  { titel: "Log-rank toets", names: ["log-rank", "logrank"], tekst: "Vergelijkt survivalcurves tussen groepen." },
  { titel: "Cox model (PH)", names: ["cox", "proportional hazard", "hazard"], tekst: "Semi-parametrisch: hazard = h0(t) · exp(βᵀX). Proportional hazards: effect van X is een constante factor op de hazard." },
  { titel: "PCA (principal component analysis)", names: ["pca", "principal component", "pc1", "score", "loading"], tekst: "Unsupervised: nieuwe assen (PC’s) met maximale variantie. Loadings = gewichten van originele X; scores = projecties." },
  { titel: "K-means", names: ["k-means", "kmeans", "k means"], tekst: "Clustering: k groepen, punten bij dichtstbijzijnde centroid, centroids opnieuw gemiddelde, herhaal." },
  { titel: "Hierarchical clustering", names: ["hierarchical", "dendrogram", "agglomerative", "linkage", "ward"], tekst: "Bouwt een boom van clusters. Dendrogram visualiseert. Linkage (complete/single/average/Ward) bepaalt afstanden tussen groepen." },
  { titel: "FWER (family-wise error rate)", names: ["fwer", "family-wise", "family wise"], tekst: "Kans op minstens één false positive onder alle toetsen. Bonferroni beheerst FWER." },
  { titel: "FDR (false discovery rate)", names: ["fdr", "false discovery", "benjamini"], tekst: "Verwachte fractie false positives onder de verworpen H0’s. Vaak minder streng dan FWER; Benjamini–Hochberg." },
  { titel: "Bonferroni / Holm", names: ["bonferroni", "holm"], tekst: "p-waarde-correctie bij meerdere toetsen. Bonferroni: drempel α/m. Holm is iets krachtiger, nog wel FWER." },
  { titel: "Multiple testing", names: ["multiple testing", "meerdere toetsen", "p-hacking"], tekst: "Veel hypotheses tegelijk: meer kans op toevallige ‘significante’ hits. Corrigeer p-waarden of beheers FDR/FWER." },
  { titel: "Array", names: ["array", "arr[i]", "indexeren"], tekst: "Aaneengesloten geheugen. Index O(1), zoeken op waarde en insert middenin O(n)." },
  { titel: "Linked list", names: ["linked list", "pointer", "node"], tekst: "Nodes met pointers. Insert/delete O(1) als je de node hebt; toegang tot het k-de element O(n)." },
  { titel: "Stack (LIFO)", names: ["stack", "lifo", "push", "pop", "peek"], tekst: "Last In, First Out. Push/pop/peek O(1). Undo, call stack, DFS." },
  { titel: "Queue (FIFO)", names: ["queue", "fifo", "enqueue", "dequeue"], tekst: "First In, First Out. Enqueue/dequeue O(1). Scheduling, BFS." },
  { titel: "Hash table", names: ["hash", "collision", "load factor", "chaining"], tekst: "hash(sleutel) → vak. Gemiddeld O(1). Collisions via chaining of open addressing; slechte hashes maken O(n)." },
  { titel: "BST", names: ["bst", "binary search tree", "avl", "rood-zwart"], tekst: "Links < knoop < rechts. Gebalanceerd O(log n); een keten wordt O(n)." },
  { titel: "Heap", names: ["heap", "max-heap", "heapify", "prioriteit"], tekst: "Parent ≥ children (max-heap). Max O(1), insert O(log n). Geen willekeurige O(log n)-zoek." },
  { titel: "Bubble sort", names: ["bubble"], tekst: "Buren wisselen. Beste O(n) met vlag, verder O(n²). Zelden productie." },
  { titel: "Selection sort", names: ["selection sort", "selection"], tekst: "Steeds het minimum vooraan. Altijd O(n²), weinig swaps." },
  { titel: "Insertion sort", names: ["insertion"], tekst: "Gesorteerd prefix. Beste O(n) op nearly sorted, anders O(n²). Sterk op klein n." },
  { titel: "Merge sort", names: ["merge sort", "divide and conquer"], tekst: "Altijd O(n log n), stabiel, O(n) hulpruimte." },
  { titel: "Quick sort", names: ["quick sort", "quicksort", "pivot", "introsort"], tekst: "Pivot + partitie. Gemiddeld O(n log n), worst O(n²). Vaak snel, niet stabiel in-place." },
  { titel: "Heap sort", names: ["heap sort"], tekst: "Heapify + herhaaldelijk max naar het einde. Altijd O(n log n), in-place, niet stabiel." },
  { titel: "Big-O", names: ["big-o", "tijdscomplexiteit", "groeipatroon"], tekst: "Aantal stappen (of extra geheugen) als functie van n. Geen wall-clock." },
  { titel: "O(1) / O(log n) / O(n)", names: ["o(1)", "o(log n)", "o(n)", "halveren"], tekst: "O(1) constante sprong, O(log n) halveren, O(n) lineair scannen." },
  { titel: "O(n log n) / O(n²) / O(2ⁿ)", names: ["o(n log n)", "o(n²)", "o(2ⁿ)", "kwadratisch", "exponentieel"], tekst: "n log n: merge/heap/gem. quick. n²: dubbele lus. 2ⁿ: meestal onpraktisch." },
  { titel: "Best / average / worst", names: ["best case", "worst case", "gemiddeld"], tekst: "Zonder bijvoeglijk naamwoord bedoelen we meestal worst-case. Gemiddeld n/2 blijft O(n)." },
  { titel: "Ruimtecomplexiteit", names: ["ruimtecomplexiteit", "space complexity", "in-place", "hulpruimte"], tekst: "Extra geheugen vs n. In-place ≈ O(1) extra; merge sort typisch O(n) hulp." },
]

function begripHaystack(question) {
  return ` ${question.prompt} ${question.options.join(" ")} ${question.category} `
    .replaceAll("²", "2")
    .replaceAll("−", "-");
}

function begripMatch(hay, term) {
  const t = term.trim();
  if (!t) return false;
  const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const short = t.length <= 5 && /^[A-Za-z0-9λβ²]+$/i.test(t.replaceAll(" ", ""));
  const pattern = short
    ? new RegExp(`(^|[^A-Za-z0-9])${escaped}([^A-Za-z0-9]|$)`, "i")
    : new RegExp(escaped, "i");
  return pattern.test(hay);
}

function begrippenVoor(question) {
  const hay = begripHaystack(question);
  const hits = [];
  const ranked = [...BEGRIPPEN].sort((a, b) => {
    const la = Math.max(...a.names.map((n) => n.trim().length));
    const lb = Math.max(...b.names.map((n) => n.trim().length));
    return lb - la;
  });
  ranked.forEach((item) => {
    if (hits.includes(item)) return;
    if (item.names.some((name) => begripMatch(hay, name))) hits.push(item);
  });
  if (hits.length >= 2) return hits.slice(0, 8);

  const extra = BEGRIPPEN.filter((item) => {
    const cat = (question.category || "").toLowerCase();
    return item.names.some((n) => cat.includes(n.toLowerCase().trim()));
  });
  extra.forEach((item) => {
    if (!hits.includes(item)) hits.push(item);
  });
  return hits.slice(0, 8);
}

const HOOFDSTUK_FOCUS = {
  "H1 Introduction": ["n en p", "Supervised vs unsupervised", "Prediction vs inference", "ISLP-notatie"],
  "H2 Statistical Learning": ["Prediction", "Inference", "Y, X, ε", "Overfitting / underfitting", "Bias–variance", "Generalisatie"],
  "H3 Linear Regression": ["RSS / RSE / R²", "t en p-waarde", "F-statistic", "Dummy", "VIF", "KNN vs lineair"],
  "H4 Classification": ["Logistic / odds / logit", "LDA vs QDA", "Naive Bayes", "ROC / AUC", "GLM"],
  "H5 Resampling": ["Validation set", "LOOCV", "k-fold CV", "Bootstrap"],
  "H6 Regularization": ["Subset selection", "Ridge", "Lasso", "λ", "PCR / PLS", "p > n"],
  "H7 Beyond Linearity": ["Polynomial", "Splines / knots", "Smoothing spline", "GAM"],
  "H8 Trees": ["CART", "Gini / pruning", "Bagging", "Random forest", "Boosting"],
  "H9 SVM": ["Hyperplane / margin", "Support vectors", "C", "Kernel / RBF"],
  "H10 Deep Learning": ["MLP", "Activatie", "Backprop / SGD", "Dropout", "CNN / RNN"],
  "H11 Survival": ["Censoring", "Kaplan–Meier", "Log-rank", "Cox PH"],
  "H12 Unsupervised": ["PCA", "K-means", "Hierarchical / dendrogram"],
  "H13 Multiple Testing": ["FWER", "FDR", "Bonferroni / Holm", "Benjamini–Hochberg"],
  "H1 Arrays": ["Index O(1)", "Zoeken O(n)", "Insert O(n)"],
  "H2 Linked Lists": ["Nodes + pointer", "Insert O(1)", "Toegang O(n)"],
  "H3 Stacks": ["LIFO", "Push/pop O(1)", "Call stack"],
  "H4 Queues": ["FIFO", "Enqueue/dequeue O(1)", "BFS"],
  "H5 Hash Tables": ["Gemiddeld O(1)", "Collision", "Load factor"],
  "H6 Trees": ["BST", "O(log n)", "Balans"],
  "H7 Heaps": ["Max O(1)", "Insert O(log n)", "Geen BST"],
  "H8 Waarom sorteren": ["Binary search", "O(n log n)", "Voorbereiding"],
  "H9 Bubble Sort": ["Buren", "O(n²)", "Zelden productie"],
  "H10 Selection Sort": ["Minimum", "Altijd O(n²)", "Weinig swaps"],
  "H11 Insertion Sort": ["Prefix", "Beste O(n)", "Klein n"],
  "H12 Merge Sort": ["Altijd n log n", "Stabiel", "O(n) extra"],
  "H13 Quick Sort": ["Pivot", "Gem. n log n", "Worst n²"],
  "H14 Heap Sort": ["Heapify", "Altijd n log n", "In-place"],
  "H15 Eindoverzicht": ["Hotspot", "Sort-tabel", "Structuur kiest O"],
  "H1 Waarom Big-O": ["n groeit", "Tijdscomplexiteit", "Hardware vs algoritme"],
  "H2 Wat meet Big-O": ["Stappen f(n)", "Geen wall-clock", "O(n)"],
  "H3 Intuïtie": ["O(1)", "O(n)", "O(log n)"],
  "H4 Complexiteiten": ["n log n", "n²", "2ⁿ"],
  "H5 Constanten": ["3n = O(n)", "Grote n", "1000n vs n²"],
  "H6 Beste gemiddeld slechtst": ["Best", "Worst", "Gemiddeld"],
  "H7 Ruimtecomplexiteit": ["O(1) extra", "O(n) extra", "In-place"],
  "H8 Praktijk": ["Grote n", "Datastructuur", "Andere O"],
  "H9 Valkuilen": ["Geen stopwatch", "Geen O(100n)", "Worst case"],
  "H10 Kernidee": ["Schalen", "log n vs n vs n²", "Eerst klasse"],
};
