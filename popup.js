console.log("This is a popup!");

document.addEventListener("DOMContentLoaded", function () {
  // Utilisation du conteneur pour le contenu dynamique
  const popupContent =
    document.getElementById("popup-content") || document.body;

  // Suppression du choix de couleurs, on garde uniquement le sélecteur de thème

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

  // Fonctionnalité créative 1 : Citation inspirante aléatoire
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

  // Fonctionnalité créative 2 : Compteur de clics sur le logo
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

  // Fonctionnalité créative 3 : Affichage du jour de la semaine
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
});
