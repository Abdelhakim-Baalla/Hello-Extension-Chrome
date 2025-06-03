console.log("This is a popup!");

document.addEventListener("DOMContentLoaded", function () {
  const popupContent =
    document.getElementById("popup-content") || document.body;

  const themeContainer = document.createElement("div");
  themeContainer.style.margin = "15px 0 0 0";
  themeContainer.style.display = "flex";
  themeContainer.style.alignItems = "center";
  themeContainer.style.gap = "8px";
  const label = document.createElement("label");
  label.textContent = "Thème : ";
  const select = document.createElement("select");
  [
    { nom: "Clair", value: "light" },
    { nom: "Sombre", value: "dark" },
    { nom: "Pro (bleu)", value: "pro" },
  ].forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.nom;
    select.appendChild(option);
  });
  select.addEventListener("change", function () {
    document.body.classList.remove("theme-dark", "theme-pro");
    if (select.value === "dark") {
      document.body.classList.add("theme-dark");
    } else if (select.value === "pro") {
      document.body.classList.add("theme-pro");
      document.body.style.background =
        "linear-gradient(135deg,rgb(44, 153, 242) 0%, #21cbf3 100%)";
      document.body.style.color = "#fff";
    } else {
      document.body.style.background = "";
      document.body.style.color = "";
    }
  });
  themeContainer.appendChild(label);
  themeContainer.appendChild(select);
  popupContent.appendChild(themeContainer);

  const heure = document.createElement("div");
  heure.id = "heure-actuelle";
  heure.style.marginTop = "18px";
  heure.style.fontWeight = "bold";
  heure.style.fontSize = "1.1em";
  heure.style.textAlign = "center";
  popupContent.appendChild(heure);

  function updateHeure() {
    const now = new Date();
    heure.textContent = "Heure actuelle : " + now.toLocaleTimeString();
  }
  updateHeure();
  setInterval(updateHeure, 1000);

  const citations = [
    "Le succès n'est pas la clé du bonheur. Le bonheur est la clé du succès.",
    "N'abandonne jamais, car c'est peut-être le moment où le vent va tourner.",
    "La meilleure façon de prédire l'avenir est de le créer.",
    "Chaque jour est une nouvelle chance de réussir.",
    "Crois en toi et tout deviendra possible.",
  ];
  const citationDiv = document.createElement("div");
  citationDiv.style.marginTop = "18px";
  citationDiv.style.fontStyle = "italic";
  citationDiv.style.textAlign = "center";
  citationDiv.style.opacity = "0.85";
  function afficherCitation() {
    const idx = Math.floor(Math.random() * citations.length);
    citationDiv.textContent = "💡 " + citations[idx];
  }
  afficherCitation();
  popupContent.appendChild(citationDiv);

  const logo = document.querySelector("h1 img");
  let clickCount = 0;
  if (logo) {
    logo.style.cursor = "pointer";
    logo.title = "Cliquez-moi !";
    logo.addEventListener("click", function () {
      clickCount++;
      logo.style.transform = `scale(${1 + clickCount * 0.05}) rotate(${
        clickCount * 10
      }deg)`;
      setTimeout(() => {
        logo.style.transform = "";
      }, 400);
      if (clickCount % 3 === 0) {
        afficherCitation();
      }
    });
  }

  const jours = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const jourDiv = document.createElement("div");
  jourDiv.style.marginTop = "8px";
  jourDiv.style.textAlign = "center";
  jourDiv.style.fontSize = "0.95em";
  jourDiv.style.color = "#2196f3";
  const now = new Date();
  jourDiv.textContent = `Aujourd'hui : ${jours[now.getDay()]}`;
  popupContent.appendChild(jourDiv);

  const focusBtn = document.createElement("button");
  focusBtn.textContent = "Mode Focus";
  focusBtn.style.margin = "16px auto 0 auto";
  focusBtn.style.display = "block";
  let focusMode = false;
  focusBtn.addEventListener("click", function () {
    focusMode = !focusMode;
    if (focusMode) {
      citationDiv.style.display = "none";
      jourDiv.style.display = "none";
      focusBtn.textContent = "Quitter le mode Focus";
    } else {
      citationDiv.style.display = "";
      jourDiv.style.display = "";
      focusBtn.textContent = "Mode Focus";
    }
  });
  popupContent.appendChild(focusBtn);

  const meteoDiv = document.createElement("div");
  meteoDiv.style.marginTop = "14px";
  meteoDiv.style.textAlign = "center";
  meteoDiv.style.fontSize = "0.95em";
  meteoDiv.textContent = "Chargement météo...";
  popupContent.appendChild(meteoDiv);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        )
          .then((r) => r.json())
          .then((data) => {
            if (data.current_weather) {
              meteoDiv.textContent = `🌡️ ${
                data.current_weather.temperature
              }°C, ${
                data.current_weather.weathercode < 3 ? "Ensoleillé" : "Nuageux"
              }`;
            } else {
              meteoDiv.textContent = "Météo indisponible";
            }
          })
          .catch(() => (meteoDiv.textContent = "Erreur météo"));
      },
      () => (meteoDiv.textContent = "Météo non autorisée")
    );
  } else {
    meteoDiv.textContent = "Météo non supportée";
  }

  const todoDiv = document.createElement("div");
  todoDiv.style.marginTop = "18px";
  todoDiv.style.textAlign = "center";
  todoDiv.innerHTML =
    '<input type="text" id="todo-input" placeholder="Ajouter une tâche..." style="padding:4px 8px;border-radius:6px;border:1px solid #2196f3;"> <button id="add-todo" style="padding:4px 10px;border-radius:6px;background:#2196f3;color:#fff;border:none;">Ajouter</button><ul id="todo-list" style="list-style:none;padding:0;margin:8px 0 0 0;text-align:left;"></ul>';
  popupContent.appendChild(todoDiv);
  const todoInput = todoDiv.querySelector("#todo-input");
  const addTodoBtn = todoDiv.querySelector("#add-todo");
  const todoList = todoDiv.querySelector("#todo-list");
  addTodoBtn.addEventListener("click", function () {
    if (todoInput.value.trim()) {
      const li = document.createElement("li");
      li.textContent = todoInput.value;
      li.style.background = "#e3f0ff";
      li.style.margin = "2px 0";
      li.style.padding = "3px 8px";
      li.style.borderRadius = "5px";
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      const del = document.createElement("span");
      del.textContent = "✖";
      del.style.cursor = "pointer";
      del.style.marginLeft = "8px";
      del.style.color = "#f44336";
      del.addEventListener("click", () => li.remove());
      li.appendChild(del);
      todoList.appendChild(li);
      todoInput.value = "";
    }
  });
  todoInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addTodoBtn.click();
  });

  const jokeDiv = document.createElement("div");
  jokeDiv.style.marginTop = "18px";
  jokeDiv.style.textAlign = "center";
  jokeDiv.style.fontSize = "0.95em";
  jokeDiv.textContent = "Blague du jour...";
  popupContent.appendChild(jokeDiv);
  fetch(
    "https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
  )
    .then((r) => r.json())
    .then((data) => {
      if (data.joke) jokeDiv.textContent = "😂 " + data.joke;
      else jokeDiv.textContent = "Pas de blague aujourd'hui.";
    })
    .catch(() => (jokeDiv.textContent = "Erreur blague."));

  // Organisation et stylisation des éléments avec des classes CSS
  themeContainer.className = "theme-row";
  heure.className = "heure";
  citationDiv.className = "citation";
  jourDiv.className = "jour";
  focusBtn.className = "focus-btn";
  meteoDiv.className = "meteo";
  todoDiv.className = "todo-section";
  jokeDiv.className = "joke";

  // Suppression des styles inline inutiles (sauf pour les éléments dynamiques du todo)
  heure.style = "";
  citationDiv.style = "";
  jourDiv.style = "";
  focusBtn.style = "";
  meteoDiv.style = "";
  todoDiv.style = "";
  jokeDiv.style = "";

  // Pour les éléments dynamiques du todo, on garde le style pour la suppression
  todoList.className = "todo-list";
  todoInput.className = "todo-input";
  addTodoBtn.className = "add-todo-btn";
  todoInput.style.padding = "4px 8px";
  todoInput.style.borderRadius = "6px";
  todoInput.style.border = "1px solid #2196f3";
  addTodoBtn.style.padding = "4px 10px";
  addTodoBtn.style.borderRadius = "6px";
  addTodoBtn.style.background = "#2196f3";
  addTodoBtn.style.color = "#fff";
  addTodoBtn.style.border = "none";
});
