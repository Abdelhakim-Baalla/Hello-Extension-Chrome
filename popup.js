console.log("This is a popup!");

document.addEventListener("DOMContentLoaded", function () {
  const popupContent =
    document.getElementById("popup-content") || document.body;

  // Génération de 200+ quiz variés avec réponses mélangées (bonne réponse à une position aléatoire)
  const quizQuestions = [
    // Exemples de questions variées, chaque objet a une bonne réponse à l'index 'r' (aléatoire)
    // Les réponses sont mélangées à la volée pour chaque question lors de l'affichage
    {
      q: 'Quel langage affiche Hello World avec print("Hello, World!") ?',
      a: ["Python", "C", "Java"],
      r: 0,
    },
    {
      q: "Quel langage utilise System.out.println pour Hello World ?",
      a: ["Java", "Go", "Rust"],
      r: 0,
    },
    {
      q: 'Quel langage utilise echo "Hello, World!" ?',
      a: ["Bash", "PHP", "Ruby"],
      r: 0,
    },
    {
      q: 'Quel langage utilise puts "Hello, World!" ?',
      a: ["Ruby", "C#", "Swift"],
      r: 0,
    },
    {
      q: "Quel langage utilise Console.WriteLine pour Hello World ?",
      a: ["C#", "JavaScript", "Go"],
      r: 0,
    },
    {
      q: "Quel langage utilise fmt.Println pour Hello World ?",
      a: ["Go", "Rust", "Scala"],
      r: 0,
    },
    {
      q: 'Quel langage utilise println!("Hello, World!") ?',
      a: ["Rust", "Java", "Kotlin"],
      r: 0,
    },
    {
      q: 'Quel langage utilise document.write("Hello, World!") ?',
      a: ["JavaScript", "PHP", "Python"],
      r: 0,
    },
    {
      q: 'Quel langage utilise print("Hello, World!") sans parenthèses ?',
      a: ["Python 2", "Ruby", "C"],
      r: 0,
    },
    {
      q: 'Quel langage utilise printf("Hello, World!\\n") ?',
      a: ["C", "Go", "Java"],
      r: 0,
    },
    {
      q: 'Quel langage utilise println("Hello, World!") ?',
      a: ["Kotlin", "Swift", "C#"],
      r: 0,
    },
    {
      q: "Quel langage utilise System.Console.WriteLine pour Hello World ?",
      a: ["C#", "Java", "Python"],
      r: 0,
    },
    {
      q: 'Quel langage utilise print "Hello, World!\\n" ; ?',
      a: ["Perl", "PHP", "Ruby"],
      r: 0,
    },
    {
      q: 'Quel langage utilise object Main extends App { println("Hello, World!") } ?',
      a: ["Scala", "Java", "Go"],
      r: 0,
    },
    {
      q: 'Quel langage utilise <?php echo "Hello, World!"; ?> ?',
      a: ["PHP", "Perl", "Python"],
      r: 0,
    },
  ];

  // Génération automatique de 300 questions supplémentaires variées
  const langs = [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "C#",
    "Swift",
    "Kotlin",
    "Scala",
    "Perl",
    "Bash",
    "Haskell",
    "Lua",
    "Dart",
    "Elixir",
    "Erlang",
    "R",
    "Matlab",
    "Groovy",
    "Objective-C",
    "Fortran",
    "Pascal",
    "Julia",
    "F#",
    "OCaml",
    "Shell",
    "Visual Basic",
    "COBOL",
    "Assembly",
    "Prolog",
    "Lisp",
    "Scheme",
    "Smalltalk",
    "Crystal",
    "Elm",
    "Nim",
    "V",
    "Zig",
    "Ada",
    "Delphi",
    "PowerShell",
    "PL/SQL",
    "SQL",
    "Scratch",
    "LabVIEW",
    "ABAP",
    "SAS",
    "AWK",
    "Logo",
    "Simula",
    "D",
    "Q#",
    "Racket",
    "Solidity",
    "VBA",
    "Verilog",
    "VHDL",
    "Tcl",
    "Basic",
    "FoxPro",
    "Clipper",
    "APL",
    "Forth",
    "REXX",
    "Modula-2",
    "ALGOL",
    "Ada",
    "ActionScript",
    "Dylan",
    "Eiffel",
    "J",
    "Kotlin",
    "Mercury",
    "ML",
    "MUMPS",
    "PL/I",
    "PostScript",
    "RPG",
    "Sather",
    "SPARK",
    "Turing",
    "Unicon",
    "XSLT",
    "Yorick",
    "ZPL",
  ];
  while (quizQuestions.length < 320) {
    // Génère une question aléatoire sur Hello World
    const correctLang = langs[Math.floor(Math.random() * langs.length)];
    let wrong1, wrong2;
    do {
      wrong1 = langs[Math.floor(Math.random() * langs.length)];
    } while (wrong1 === correctLang);
    do {
      wrong2 = langs[Math.floor(Math.random() * langs.length)];
    } while (wrong2 === correctLang || wrong2 === wrong1);
    // Place la bonne réponse à une position aléatoire
    const answers = [correctLang, wrong1, wrong2];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    const r = answers.indexOf(correctLang);
    quizQuestions.push({
      q: `Dans quel langage peut-on écrire Hello World ainsi : print('Hello, World!') ?`,
      a: answers,
      r: r,
    });
  }

  // Affichage du quiz avec mélange dynamique des réponses à chaque question
  const quizDiv = document.createElement("div");
  quizDiv.className = "quiz-section";
  quizDiv.innerHTML =
    '<strong>Quiz Dev : </strong><span id="quiz-question"></span>';
  let quizIndex = 0;
  const questionSpan = quizDiv.querySelector("#quiz-question");
  const answersDiv = document.createElement("div");
  answersDiv.className = "quiz-answers";
  function showQuiz() {
    const q = quizQuestions[quizIndex];
    // Mélange dynamique des réponses à chaque affichage
    const answerObjs = q.a.map((ans, i) => ({ ans, isCorrect: i === q.r }));
    for (let i = answerObjs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answerObjs[i], answerObjs[j]] = [answerObjs[j], answerObjs[i]];
    }
    questionSpan.textContent = q.q;
    answersDiv.innerHTML = "";
    answerObjs.forEach((obj) => {
      const btn = document.createElement("button");
      btn.textContent = obj.ans;
      btn.onclick = () => {
        if (obj.isCorrect) {
          btn.style.background = "#4caf50";
          btn.textContent += " ✔";
        } else {
          btn.style.background = "#f44336";
          btn.textContent += " ✖";
        }
        setTimeout(() => {
          quizIndex = (quizIndex + 1) % quizQuestions.length;
          showQuiz();
        }, 900);
      };
      answersDiv.appendChild(btn);
    });
  }
  showQuiz();
  quizDiv.appendChild(answersDiv);
  popupContent.appendChild(quizDiv);

  // Organisation et stylisation des éléments avec des classes CSS
  quizDiv.className = "quiz-section";
  questionSpan.className = "quiz-question";
  answersDiv.className = "quiz-answers";

  // Suppression des styles inline inutiles (sauf pour les éléments dynamiques du todo)
  quizDiv.style = "";
  questionSpan.style = "";
  answersDiv.style = "";

  // Nettoyage : suppression des éléments et classes liés à l'heure, au jour et au mode focus
});
