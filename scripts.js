document.addEventListener("DOMContentLoaded", () => {
  // Listaa työkalu lomakkeen käsittely
  const listaaTyokaluForm = document.getElementById("listaa-tyokalu-form");
  if (listaaTyokaluForm) {
    listaaTyokaluForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nimi = document.getElementById("nimi").value;
      const hinta = document.getElementById("hinta").value;
      const kuvaus = document.getElementById("kuvaus").value;
      const kuvaInput = document.getElementById("kuva");
      const kuvaFile = kuvaInput.files[0];

      if (kuvaFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const kuvaDataUrl = event.target.result;

          const uusiTyokalu = {
            nimi: nimi,
            hinta: hinta,
            kuva: kuvaDataUrl,
            kuvaus: kuvaus,
          };

          // Hae aiemmat työkalut localStoragesta ++ lisää uusi työkalu
          const tools = JSON.parse(localStorage.getItem("tools")) || [];
          tools.push(uusiTyokalu);
          localStorage.setItem("tools", JSON.stringify(tools));

          // Lomake tyhjennys + päivitä työkalu-listaus
          listaaTyokaluForm.reset();
          renderTools();
          alert("Työkalu on listattu!");
        };
        reader.readAsDataURL(kuvaFile);
      } else {
        alert("Valitse kuva työkalulle.");
      }
    });
  }

  // Yhteydenotto lomakkeen käsittely
  const yhteydenottoForm = document.getElementById("yhteydenotto-form");
  if (yhteydenottoForm) {
    yhteydenottoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // To-do: Lähetä lomaketiedot palvelimelle tai käsittele ne tässä
      alert("Viesti lähetetty! Kiitos yhteydenotosta.");
      yhteydenottoForm.reset(); // Lomakkeen tyhjennys lähettäessä
    });
  }

  // Täs funktio työkalujen listaamiseen localStoragesta
  function renderTools() {
    const toolsContainer = document.getElementById("tyokalu-listaus");
    if (toolsContainer) {
      const tools = JSON.parse(localStorage.getItem("tools")) || [];
      toolsContainer.innerHTML = ""; // Tyhjennä aiemmat työkalut
      tools.forEach((tool) => {
        const toolElement = document.createElement("div");
        toolElement.className = "tyokalu-item";
        toolElement.innerHTML = `
            <img src="${tool.kuva}" alt="${tool.nimi}">
            <h3>${tool.nimi}</h3>
            <p>Hinta: ${tool.hinta}€/päivä</p>
            <p>${tool.kuvaus}</p>
            <button class="ota-yhteytta">Ota yhteyttä</button>
            <button class="vuokraa">Vuokraa</button>
          `;
        toolsContainer.appendChild(toolElement);
      });
    }
  }

  // localStorage = tallennustila, tässä tapahtuu työkalujen haku jos ne on tallennettu
  renderTools();
});
