console.log("This is a popup!");

document.addEventListener("DOMContentLoaded", function () {
  const popupContent =
    document.getElementById("popup-content") || document.body;

  // Ajout de plus de questions pour le quiz développeur
  const quizQuestions = [
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
    questionSpan.textContent = q.q;
    answersDiv.innerHTML = "";
    q.a.forEach((ans, i) => {
      const btn = document.createElement("button");
      btn.textContent = ans;
      btn.onclick = () => {
        if (i === q.r) {
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
