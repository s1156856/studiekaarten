const SAMENVATTING_TERM_TRANSLATIONS = [
  ["sorteeralgoritmen", "sorting algorithms"],
  ["invoegsortering", "insertion sort"],
  ["selectiesortering", "selection sort"],
  ["samenvoegsortering", "merge sort"],
  ["bubbelsortering", "bubble sort"],
  ["gekoppelde lijsten", "linked lists"],
  ["heap-structuren", "heap structures"],
  ["hash-tabellen", "hash tables"],
  ["datastructuren", "data structures"],
  ["ensemble-methoden", "ensemble methods"],
  ["bomen", "trees"],
  ["wachtrijen", "queues"],
  ["stapels", "stacks"],
  ["examenbegrippen", "exam terms"],
  ["voorspellingen", "predictions"],
  ["voorspelling", "prediction"],
  ["onderhoudskosten", "maintenance costs"],
  ["coëfficiënten", "coefficients"],
  ["observaties", "observations"],
  ["bootstrap-steekproeven", "bootstrap samples"],
  ["train-test-splitsing", "train-test split"],
  ["beslissingsvlak", "decision boundary"],
  ["scheidingsvlak", "separating hyperplane"],
  ["principale component", "principal component"],
  ["gemiddeld n/2", "average n/2"],
  ["lineair zoeken", "linear search"],
  ["hoge variantie", "high variance"],
  ["hoge bias", "high bias"],
  ["gemiddelde kwadratische fout", "mean squared error"],
  ["modelcoëfficiënten", "model coefficients"],
  ["significantie", "significance"],
  ["regularisatie", "regularization"],
  ["generaliseren", "generalize"],
  ["variabelenselectie", "feature selection"],
  ["kenmerkselectie", "feature selection"],
  ["steekproeven met teruglegging", "sampling with replacement"],
  ["constante factoren", "constant factors"],
  ["onderaanpassing", "underfitting"],
  ["overaanpassing", "overfitting"],
  ["variabelen", "features"],
  ["gemiddeld", "average"],
  ["slechtst", "worst"],
  ["beste", "best"],
  ["variantie", "variance"],
  ["variatie", "variation"],
  ["voorspellen", "prediction"],
  ["verklaren", "inference"],
  ["aaneengesloten geheugen", "contiguous memory"],
  ["invoegen", "insertion"],
  ["verwijderen", "deletion"],
  ["toegang", "access"],
  ["hashfunctie", "hash function"],
  ["gebalanceerd", "balanced"],
  ["gesorteerde rij", "sorted sequence"],
  ["gesorteerd prefix", "sorted prefix"],
  ["hulpruimte", "auxiliary space"],
  ["hulpgeheugen", "auxiliary memory"],
  ["extra geheugen", "extra memory"],
  ["slechtste geval", "worst case"],
  ["beste geval", "best case"],
  ["tijdscomplexiteit", "time complexity"],
  ["ruimtecomplexiteit", "space complexity"],
  ["groeipatroon", "growth rate"],
  ["complexiteiten", "complexity classes"],
  ["datastructuur", "data structure"],
  ["zoeken", "searching"],
  ["exponentieel", "exponential"],
  ["kwadratisch", "quadratic"],
  ["constanten", "constants"],
  ["waarom big-o", "why Big-O"],
  ["wat meet big-o", "what Big-O measures"],
  ["eindoverzicht", "final overview"],
  ["intuïtie", "intuition"],
  ["praktijk", "practical considerations"],
  ["valkuilen", "pitfalls"],
  ["kernidee", "core idea"],
  ["bias–variantie-afweging", "bias–variance trade-off"],
  ["singuliere-waarde-ontbinding", "singular value decomposition"],
  ["principale-componentenanalyse", "principal component analysis"],
  ["steekproeven met teruglegging", "sampling with replacement"],
  ["gemiddelde kwadratische fout", "mean squared error"],
  ["logistische regressie", "logistic regression"],
  ["lineaire regressie", "linear regression"],
  ["dimensiereductie", "dimensionality reduction"],
  ["significantietoets", "significance test"],
  ["achterwaartse propagatie", "backpropagation"],
  ["gradiëntafdaling", "gradient descent"],
  ["variabelenselectie", "feature selection"],
  ["kenmerkselectie", "feature selection"],
  ["activatiefuncties", "activation functions"],
  ["verborgen lagen", "hidden layers"],
  ["prioriteitswachtrijen", "priority queues"],
  ["neurale netwerken", "neural networks"],
  ["neuraal netwerk", "neural network"],
  ["beslissingsbomen", "decision trees"],
  ["beslissingsboom", "decision tree"],
  ["eigenvectoren", "eigenvectors"],
  ["eigenwaarden", "eigenvalues"],
  ["kruisvalidering", "cross-validation"],
  ["onbegeleid leren", "unsupervised learning"],
  ["begeleid leren", "supervised learning"],
  ["statistisch leren", "statistical learning"],
  ["classificatie", "classification"],
  ["regressie", "regression"],
  ["onderaanpassing", "underfitting"],
  ["overaanpassing", "overfitting"],
  ["residu", "residual"],
  ["matrixaanvulling", "matrix completion"],
  ["diep leren", "deep learning"],
  ["invoerlaag", "input layer"],
  ["uitvoerlaag", "output layer"],
  ["gewichten", "weights"],
  ["knoop", "node"],
  ["gebalanceerd", "balanced"],
  ["prioriteitswachtrij", "priority queue"],
  ["lagere-orde termen", "lower-order terms"],
  ["waarom sorteren", "why sorting"],
  ["sorteren", "sorting"],
];

function translateSummaryTerms(value) {
  let translated = String(value);
  SAMENVATTING_TERM_TRANSLATIONS.forEach(([dutchTerm, englishTerm]) => {
    const escapedTerm = dutchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(^|[^\\p{L}])(${escapedTerm})(?!\\p{L})`, "giu");
    translated = translated.replace(pattern, (match, prefix, term, offset, source) => {
      const before = source.slice(0, offset + prefix.length);
      const openParens = (before.match(/\(/g) || []).length;
      const closeParens = (before.match(/\)/g) || []).length;
      const termStart = offset + prefix.length;
      const termEnd = termStart + term.length;
      const beforeTerm = source[termStart - 1];
      const afterTerm = source[termEnd];
      const isHyphenated = ["-", "–"].includes(beforeTerm) || ["-", "–"].includes(afterTerm);
      if (
        openParens > closeParens ||
        isHyphenated ||
        /^\s*\(/.test(source.slice(offset + match.length))
      ) return match;
      return `${prefix}${term} (${englishTerm})`;
    });
  });
  return translated;
}

const SAMENVATTINGEN = {
  ml: {
    titel: "Data Science & Machine Learning",
    hoofdstukken: [
      {
        titel: "Statistisch leren",
        kern: ["Prediction", "Inference", "Y = f(X) + ε"],
        tekst: [
          "Statistisch leren gebruikt gegevens om verbanden te onderzoeken en uitkomsten te voorspellen.",
          "Er zijn twee doelen: voorspellen en verklaren. Bij voorspellen wil je een zo nauwkeurig mogelijke Ŷ; bij verklaren onderzoek je hoe en hoeveel X met Y samenhangt.",
          "Het model Y = f(X) + ε zegt: de uitkomst Y bestaat uit een deel dat samenhangt met invoer X, plus ε: variatie die het model niet verklaart.",
        ],
      },
      {
        titel: "Begeleid leren",
        kern: ["Supervised", "Regressie", "Classificatie"],
        tekst: [
          "Bij begeleid leren krijgt het model voorbeelden met zowel invoer als het juiste antwoord. Het leert antwoorden voor nieuwe invoer voorspellen.",
          "Regressie voorspelt een getal, bijvoorbeeld een huisprijs. Voorbeelden zijn lineaire regressie, ridge en lasso.",
          "Classificatie kiest een categorie, bijvoorbeeld spam of geen spam. Voorbeelden zijn logistische regressie, beslissingsbomen, SVM en neurale netwerken.",
        ],
      },
      {
        titel: "Onbegeleid leren",
        kern: ["Clustering", "Dimensiereductie", "PCA / SVD"],
        tekst: [
          "Bij onbegeleid leren ontbreken de juiste antwoorden (labels). Clustering zoekt dan zelf groepen met vergelijkbare observaties, bijvoorbeeld met k-means.",
          "Dimensiereductie vat veel variabelen samen in minder nieuwe variabelen, zodat belangrijke patronen behouden blijven en ruis of rekenwerk kan afnemen.",
          "PCA en SVD zijn veelgebruikte wiskundige technieken voor dimensiereductie.",
        ],
      },
      {
        titel: "Lineaire regressie",
        kern: ["Residu", "R²", "MSE"],
        tekst: [
          "Het model Y = β₀ + β₁X + ε beschrijft een rechte lijn: β₀ is het startpunt en β₁ geeft aan hoeveel de voorspelde Y verandert als X één stap stijgt.",
          "Een residu is het verschil tussen de echte waarde en de voorspelling. De gemiddelde kwadratische fout (mean squared error, MSE) is het gemiddelde van die verschillen nadat ze zijn gekwadrateerd; grote fouten tellen daardoor extra zwaar.",
          "R² geeft aan welk deel van de variatie in Y door het model wordt verklaard. Een significantietoets onderzoekt of een gevonden verband lastig met toeval alleen te verklaren is.",
        ],
      },
      {
        titel: "Bias–variantie-afweging",
        kern: ["Hoge bias", "Hoge variantie", "Balans"],
        tekst: [
          "Een model met hoge bias is te eenvoudig en mist patronen: onderaanpassing (underfitting). Het presteert dan vaak slecht op zowel trainingsdata als nieuwe data.",
          "Een model met hoge variantie past zich te sterk aan de trainingsdata aan, inclusief toevallige ruis: overaanpassing (overfitting). Het presteert dan minder goed op nieuwe data.",
          "Het doel is niet de trainingsdata perfect te onthouden, maar goed te presteren op nieuwe voorbeelden. Dat heet generaliseren.",
        ],
      },
      {
        titel: "Kruisvalidering",
        kern: ["K-fold", "Train op K−1", "Test op 1 fold"],
        tekst: [
          "Kruisvalidering schat hoe goed een model op nieuwe data zal werken. Zo hangt de beoordeling minder af van één toevallige train-test-splitsing.",
          "Bij K-fold verdeel je de trainingsdata in K delen. Je traint K keer: steeds op K−1 delen en test op het overgebleven deel. Neem daarna het gemiddelde van de K scores.",
        ],
      },
      {
        titel: "Regularisatie",
        kern: ["Ridge L2", "Lasso L1", "Feature selection"],
        tekst: [
          "Regularisatie voegt een straf toe voor grote modelcoëfficiënten. Zo wordt het model minder complex en neemt de kans op overfitting af.",
          "Ridge gebruikt een L2-straf en maakt coëfficiënten meestal kleiner. Lasso gebruikt een L1-straf en kan sommige coëfficiënten precies 0 maken.",
          "Een coëfficiënt van 0 betekent dat die variabele niet bijdraagt aan de voorspelling. Lasso doet zo automatisch aan variabelenselectie.",
        ],
      },
      {
        titel: "Beslissingsbomen",
        kern: ["Interpreteerbaar", "Regressie + classificatie", "Overfitting"],
        tekst: [
          "Een beslissingsboom stelt achtereenvolgens vragen over de invoer en splitst zo de gegevens in kleinere groepen. De uitkomst is een getal (regressie) of een categorie (classificatie).",
          "De splitsingen zijn vaak goed uit te leggen, maar een diepe boom kan de trainingsdata uit het hoofd leren. Een ensemble combineert meerdere bomen om dat risico te verkleinen.",
        ],
      },
      {
        titel: "Ensemble-methoden",
        kern: ["Bagging", "Random forest", "Boosting"],
        tekst: [
          "Bagging traint meerdere modellen op bootstrap-steekproeven: willekeurige steekproeven met teruglegging. Daarna combineert het de uitkomsten, wat voorspellingen vaak stabieler maakt.",
          "Een random forest combineert bagging met een willekeurige selectie van variabelen bij elke splitsing. Daardoor lijken de bomen minder op elkaar.",
          "Boosting traint modellen na elkaar. Elk nieuw model richt zich extra op fouten van eerdere modellen. Voorbeelden zijn AdaBoost, gradient boosting en XGBoost.",
        ],
      },
      {
        titel: "Support Vector Machine",
        kern: ["Hyperplane", "Marge", "Kernel-truc"],
        tekst: [
          "Een support-vector-machine (SVM) zoekt een grens die klassen scheidt en de afstand tot de dichtstbijzijnde punten zo groot mogelijk maakt. Die afstand heet de marge; de dichtstbijzijnde punten zijn de support vectors.",
          "Met een kernel kan een SVM ook gebogen grenzen maken zonder de gegevens expliciet naar een hogere dimensie om te rekenen. Veelgebruikte kernels zijn lineair, polynomiaal en RBF.",
        ],
      },
      {
        titel: "Principale-componentenanalyse",
        kern: ["Minder dimensies", "Variantie", "Eigenvectoren"],
        tekst: [
          "Principale-componentenanalyse (principal component analysis, PCA) vat gegevens samen met minder variabelen. Dat kan visualisatie en berekeningen eenvoudiger maken.",
          "De eerste principale component wijst in de richting waarin de gegevens het meest variëren; de volgende componenten vatten zoveel mogelijk overgebleven variatie samen. Eigenvectoren bepalen de richtingen en eigenwaarden geven aan hoeveel variatie elke richting bevat.",
        ],
      },
      {
        titel: "Singuliere-waarde-ontbinding",
        kern: ["A = UΣVᵀ", "Matrixaanvulling", "Compressie"],
        tekst: [
          "Singuliere-waarde-ontbinding (singular value decomposition, SVD) schrijft een matrix A als A = UΣVᵀ. De factoren U, Σ en Vᵀ leggen verschillende richtingen en hun relatieve sterkte vast.",
          "Door kleine waarden in Σ weg te laten, kun je gegevens compacter benaderen. SVD wordt onder meer gebruikt voor PCA, aanbevelingen en het aanvullen van ontbrekende matrixwaarden.",
        ],
      },
      {
        titel: "Diep leren",
        kern: ["Lagen", "Backprop", "Gradient descent"],
        tekst: [
          "Een neuraal netwerk verwerkt invoer via een invoerlaag, een of meer verborgen lagen en een uitvoerlaag. Elke verbinding heeft een gewicht dat bepaalt hoe sterk informatie meetelt.",
          "Tijdens training vergelijkt het netwerk zijn voorspelling met het juiste antwoord. Backpropagation berekent hoe gewichten de fout beïnvloeden; gradient descent past die gewichten stap voor stap aan. Activatiefuncties maken ook niet-lineaire verbanden leerbaar.",
        ],
      },
      {
        titel: "Examenbegrippen",
        kern: ["NL ↔ EN", "Underfitting / overfitting", "PCA / SVD"],
        tekst: [
          "Onderaanpassing (underfitting) betekent dat een model te eenvoudig is. Overaanpassing (overfitting) betekent dat het trainingsdata te precies volgt en daardoor slechter kan voorspellen op nieuwe data.",
          "Kruisvalidering herhaalt het trainen en testen op verschillende delen van de beschikbare data. Een beslissingsboom is een decision tree; een random forest combineert veel bomen.",
          "Principale-componentenanalyse (principal component analysis, PCA) en singuliere-waarde-ontbinding (singular value decomposition, SVD) kunnen gegevens met minder dimensies beschrijven.",
          "Regressie voorspelt een getal; logistische regressie wordt meestal voor classificatie gebruikt. Regularisatie remt complexiteit; kenmerkselectie kiest bruikbare variabelen.",
        ],
      },
    ],
  },
  ds: {
    titel: "Datastructuren & sorteeralgoritmen",
    hoofdstukken: [
      {
        titel: "Arrays",
        kern: ["Aaneengesloten geheugen", "Index O(1)", "Insert/delete O(n)"],
        tekst: [
          "Een array legt elementen opeenvolgend in het geheugen, met vaste index 0…n−1.",
          "arr[3] is O(1): adres = basis + 3 × elementgrootte. Zoeken op waarde zonder extra index is O(n).",
          "Invoegen of verwijderen in het midden schuift de staart: O(n). Gebruik arrays als indexeren of scannen de hotspot is, niet als je steeds moet inschuiven.",
        ],
      },
      {
        titel: "Gekoppelde lijsten",
        kern: ["Nodes + pointer", "Insert O(1)", "Toegang O(n)"],
        tekst: [
          "Elke node heeft data en een pointer naar de volgende. Elementen liggen niet naast elkaar.",
          "Het k-de element opzoeken is O(n). Invoegen of verwijderen, als je de node hebt, is pointerwerk O(1).",
          "Doubly linked lists kennen ook de voorganger. Prijs: extra pointers en slechte cache. Kies lists bij veel insert/delete.",
        ],
      },
      {
        titel: "Stapels",
        kern: ["LIFO", "Push/pop/peek O(1)", "Call stack"],
        tekst: [
          "Last In, First Out: zoals een stapel boeken. Push, pop en peek werken alleen aan de top en zijn O(1).",
          "Toepassingen: undo, browser-terug, recursie, haakjes matchen, depth-first search.",
          "Zoeken naar een willekeurige waarde hoort niet bij de API (zou O(n) zijn).",
        ],
      },
      {
        titel: "Wachtrijen",
        kern: ["FIFO", "Enqueue/dequeue O(1)", "Scheduling"],
        tekst: [
          "First In, First Out: de kassa. Enqueue achteraan, dequeue vooraan; beide O(1) met kop+staart of ringbuffer.",
          "Toepassingen: printwachtrijen, taakplanning, BFS. Een stack keert volgorde om; een queue bewaart aankomstvolgorde.",
        ],
      },
      {
        titel: "Hash-tabellen",
        kern: ["hash(sleutel) → vak", "Gemiddeld O(1)", "Collisions"],
        tekst: [
          "Een hashfunctie zet de sleutel om in een vak. Gemiddeld zoeken, invoegen en verwijderen O(1).",
          "Dat kraakt bij slechte hashes of een te volle tabel (load factor). Collisions: chaining of open addressing.",
          "Slechte hashes, mutabele keys of niet resizen maken “O(1)” in de praktijk O(n).",
        ],
      },
      {
        titel: "Bomen",
        kern: ["BST", "Links < knoop < rechts", "O(log n)"],
        tekst: [
          "In een binary search tree: links < knoop < rechts. Gebalanceerd zijn zoeken, insert en delete O(log n).",
          "Een keten degradeert tot O(n). AVL en rood-zwart bewaren balans.",
          "Bomen combineren gesorteerde zoekkracht met dynamische inserts.",
        ],
      },
      {
        titel: "Heap-structuren",
        kern: ["Parent ≥ children", "Max O(1)", "Insert O(log n)"],
        tekst: [
          "Een max-heap is een complete boom met parent ≥ children. Het maximum zit in de wortel: O(1).",
          "Insert en max verwijderen zijn O(log n). Min-heap spiegelt de ongelijkheid.",
          "Gebruik: prioriteitswachtrijen, Dijkstra, heap sort. Willekeurig zoeken is O(n). Kinderen van i in een array: 2i+1 en 2i+2.",
        ],
      },
      {
        titel: "Waarom sorteren",
        kern: ["Binary search", "Voorbereiding", "Kernprobleem"],
        tekst: [
          "Op een gesorteerde rij werkt binary search; op een warboel niet.",
          "Je betaalt vaak O(n log n) één keer en oogst daarna O(log n) queries, grouping of joins.",
          "Zonder sorteren val je terug op scans O(n) per vraag.",
        ],
      },
      {
        titel: "Bubbelsortering",
        kern: ["Buren wisselen", "O(n²)", "Zelden productie"],
        tekst: [
          "Vergelijkt buren en wisselt tot de rij op volgorde is.",
          "Beste geval O(n) met een vlag op al gesorteerde input; gemiddeld en slechtst O(n²).",
          "Didactisch nuttig, in productie zelden: te veel swaps en passes.",
        ],
      },
      {
        titel: "Selectiesortering",
        kern: ["Steeds het minimum", "Altijd O(n²)", "Weinig swaps"],
        tekst: [
          "Zoekt telkens het kleinste resterende element en zet het vooraan.",
          "Altijd O(n²): geen nearly-sorted bonus. Weinig swaps (hooguit n).",
          "Het idee keert terug in heap sort, maar dan met een heap in plaats van een lineaire min-scan.",
        ],
      },
      {
        titel: "Invoegsortering",
        kern: ["Gesorteerd prefix", "Beste O(n)", "Klein / bijna gesorteerd"],
        tekst: [
          "Bouwt links een gesorteerd deel en schuift elk nieuw element op z’n plek.",
          "Beste O(n) als data bijna gesorteerd is; anders O(n²). Sterk op kleine arrays en in hybrides (quick/merge tot een drempel, daarna insertion).",
        ],
      },
      {
        titel: "Samenvoegsortering",
        kern: ["Divide and conquer", "Altijd O(n log n)", "Extra geheugen"],
        tekst: [
          "Splits tot enkelingen, merge gesorteerde helften. Altijd O(n log n).",
          "Stabiel, voorspelbaar, goed voor grote data. Nadeel: O(n) hulpruimte.",
          "Schoolvoorbeeld van divide-and-conquer op de O(n log n)-grens voor vergelijkend sorteren.",
        ],
      },
      {
        titel: "Quick sort",
        kern: ["Pivot + partitie", "Gem. O(n log n)", "Worst O(n²)"],
        tekst: [
          "Kies een pivot, kleiner links, groter rechts, recursief. Gemiddeld O(n log n); worst O(n²) bij slechte pivots.",
          "Populair door kleine constanten, in-place partitie en cache. Introsort schakelt naar heap als de diepte ontspoort.",
          "Niet stabiel in de gebruikelijke in-place vorm. Gemiddelde ≠ garantie.",
        ],
      },
      {
        titel: "Heap sort",
        kern: ["Heapify", "Altijd O(n log n)", "In-place"],
        tekst: [
          "Bouw een max-heap (O(n) heapify), trek herhaaldelijk het maximum naar het einde, herstel de heap.",
          "Altijd O(n log n), in-place, geen O(n²)-staart. Vaak iets trager dan getunede quick, niet stabiel.",
        ],
      },
      {
        titel: "Eindoverzicht",
        kern: ["Structuur kiest de O", "Sort-tabel", "Meet de hotspot"],
        tekst: [
          "Array: index O(1), zoeken/insert O(n). List: insert O(1), toegang O(n). Hash: gemiddeld O(1). BST: O(log n). Heap: max O(1), insert O(log n).",
          "Bubble/selection/insertion: O(n²) (bubble/insertion beste O(n)). Merge/heap: altijd O(n log n). Quick: gem. O(n log n), worst O(n²).",
          "Kies structuur naar de operatie die het vaakst gebeurt. Klein/nearly sorted → insertion; garantie + RAM → merge; in-place garantie → heap; praktijkgemiddelde → quick.",
        ],
      },
    ],
  },
  bigo: {
    titel: "Big-O notation",
    hoofdstukken: [
      {
        titel: "Waarom Big-O",
        kern: ["n groeit", "Tijdscomplexiteit", "Algoritme vs hardware"],
        tekst: [
          "Op vijf namen is lineair zoeken triviaal; op een miljoen namen telt hoe het aantal stappen meegroeit.",
          "Big-O is de taal voor die groei. Hardware wint een constante; een slechter groeipatroon haal je daar zelden mee in.",
        ],
      },
      {
        titel: "Wat meet Big-O",
        kern: ["Stappen als f(n)", "Geen wall-clock", "O(n)-voorbeeld"],
        tekst: [
          "Big-O meet geen seconden of RAM, maar het aantal stappen als functie van n.",
          "Een lus over de lijst is O(n). Twee machines kunnen dezelfde O-klasse hebben en toch verschillende kloktijden.",
        ],
      },
      {
        titel: "Intuïtie",
        kern: ["O(1)", "O(n)", "O(log n)"],
        tekst: [
          "O(1): pagina 150 openslaan of arr[i] — één sprong, n speelt geen rol.",
          "O(n): naam zoeken in een ongesorteerde stapel — tijd groeit evenredig met n.",
          "O(log n): steeds halveren. Een miljoen namen vraagt grofweg twintig stappen.",
        ],
      },
      {
        titel: "Complexiteiten",
        kern: ["O(1) t/m O(2ⁿ)", "n log n", "Kwadratisch vs exponentieel"],
        tekst: [
          "O(1) vlak. O(log n) binary search. O(n) scannen. O(n log n) merge/heap/gemiddelde quick.",
          "O(n²) dubbele lus — snel problematisch. O(2ⁿ) verdubbelt per extra input, bijna nooit voor grote n.",
          "Oordeel: O(1)/O(log n) uitstekend; O(n) goed; O(n log n) zeer goed; O(n²) klein n; O(2ⁿ) bijna nooit.",
        ],
      },
      {
        titel: "Constanten",
        kern: ["3n is O(n)", "Grote n", "1000n vs n²"],
        tekst: [
          "Big-O gooit constante factoren en lagere-orde termen weg. 5n, 10n en 100n zijn allemaal O(n).",
          "Bij kleine n kan 1000n groter zijn dan n²; bij grote n wint de kwadratische altijd als “slechter”.",
          "In engineering mag je constanten wél meten (cache, I/O); in de classificatie niet.",
        ],
      },
      {
        titel: "Beste, gemiddeld, slechtst",
        kern: ["Best O(1)", "Worst O(n)", "Gemiddeld blijft O(n)"],
        tekst: [
          "Linear search: best één stap als het element vooraan staat, worst O(n), gemiddeld n/2 → nog steeds O(n).",
          "Quicksort: gemiddeld O(n log n), worst O(n²). Zonder bijvoeglijk naamwoord bedoelen we meestal worst-case.",
        ],
      },
      {
        titel: "Ruimtecomplexiteit",
        kern: ["Space complexity", "O(1) extra", "O(n) extra"],
        tekst: [
          "Tijd is stappen; ruimte is extra geheugen als functie van n.",
          "Som in één variabele: O(1) extra. Nieuwe lijst van lengte n of n recursieframes: O(n).",
          "Merge sort is O(n log n) in tijd maar vraagt doorgaans O(n) hulpgeheugen. Heap sort is in-place.",
        ],
      },
      {
        titel: "Praktijk",
        kern: ["10 miljoen producten", "O(n²) onmogelijk", "Datastructuur kiest de O"],
        tekst: [
          "Bij 10 miljoen producten is naïeve O(n²) onrealistisch. Je hebt O(n log n) of beter nodig: index, hash, boom.",
          "De winst is vaak een andere datastructuur, niet een snellere for-lus. Meet daarna I/O en netwerk.",
        ],
      },
      {
        titel: "Valkuilen",
        kern: ["Geen stopwatch", "Geen O(100n)", "Worst case"],
        tekst: [
          "Big-O is geen exacte tijd. Constanten horen niet in de notatie (niet O(100n)).",
          "Vergeet de slechtste case niet: ongebalanceerde boom, naïeve quicksort op gesorteerde input.",
          "O(n) voelt snel tot n de gebruikerstijd voorbijschiet. Klasse is relatief, geen keurmerk.",
        ],
      },
      {
        titel: "Kernidee",
        kern: ["Schalen", "log n vs n vs n²", "Eerst klasse, dan constanten"],
        tekst: [
          "Big-O beschrijft hoe snel het slechter wordt als de data groeit — niet hoe snel het vandaag draait.",
          "Bij grote n telt het verschil tussen O(log n), O(n) en O(n²) meer dan taal of processor.",
          "Kies de groeiklasse bewust, daarna pas de constanten.",
        ],
      },
    ],
  },
};
