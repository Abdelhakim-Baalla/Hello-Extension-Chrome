console.log("This is a popup!");

document.addEventListener("DOMContentLoaded", function () {
  // Utilisation du conteneur pour le contenu dynamique
  const popupContent =
    document.getElementById("popup-content") || document.body;

  // Création d'un conteneur pour les boutons
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "8px";
  container.style.margin = "10px 0";
  popupContent.appendChild(container);

  // Liste de couleurs prédéfinies (plus de choix)
  const couleurs = [
    { nom: "Bleu", code: "#2196f3" },
    { nom: "Vert", code: "#4caf50" },
    { nom: "Rouge", code: "#f44336" },
    { nom: "Violet", code: "#9c27b0" },
    { nom: "Orange", code: "#ff9800" },
    { nom: "Rose", code: "#e91e63" },
    { nom: "Jaune", code: "#ffeb3b" },
    { nom: "Cyan", code: "#00bcd4" },
    { nom: "Gris", code: "#607d8b" },
    { nom: "Aléatoire", code: null },
  ];

  couleurs.forEach((couleur) => {
    const btn = document.createElement("button");
    btn.textContent = couleur.nom;
    btn.style.background = couleur.code || "#eee";
    btn.style.color = couleur.code && couleur.nom !== "Jaune" ? "#fff" : "#333";
    btn.addEventListener("click", function () {
      if (couleur.code) {
        document.body.style.backgroundColor = couleur.code;
      } else {
        // Couleur aléatoire
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.backgroundColor = color;
      }
    });
    container.appendChild(btn);
  });

  // Sélecteur de thème clair/sombre/pro
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
        "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)";
      document.body.style.color = "#fff";
    } else {
      document.body.style.background = "";
      document.body.style.color = "";
    }
  });
  themeContainer.appendChild(label);
  themeContainer.appendChild(select);
  popupContent.appendChild(themeContainer);

  // Affichage de l'heure actuelle
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
});
