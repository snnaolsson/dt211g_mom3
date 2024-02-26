//Från leaflets dokumentation - det kartan visar från början är från deras exempel i dokumentationen
var map = L.map("open-map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let searchbox = document.getElementById("open-input"); // Hämta referensen till sökrutan från DOM
let markerLayer = L.layerGroup().addTo(map); // Skapa en lagergrupp för markörer och lägg till den på kartan
document.getElementById("searchBtn").addEventListener("click", getCoordinates); // Lägg till en händelselyssnare på sökknappen för att köra funktionen
async function getCoordinates() {
  try {
    // Hämta adressen från sökrutan
    const address = searchbox.value;
    // Gör ett fetch-anrop till Nominatim API för att få platsinformation
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
      )}&format=json`
    );

    const data = await response.json();
    markerLayer.clearLayers(); //Rensa markörerna mellan varje sökning

    // Om det finns resultat från API:et
    if (data.length > 0) {
      // Loopa igenom varje plats i resultaten
      data.forEach((place) => {
        // Hämta latitud, longitud och platsens namn från platsobjektet genom att använda "destructuring" för att extrahera tre egenskaper från objektet place på en och samma gång
        const { lat, lon, display_name } = place;
        L.marker([lat, lon]).addTo(markerLayer).bindPopup(display_name); // Skapa en markör för platsen och lägg till den på markörlagret, med en popup med platsens namn
      });

      // Centrera kartan till den första platsen i resultate
      map.setView([data[0].lat, data[0].lon], 10);
    } else {
      console.log("Inga resultat hittades för den angivna adressen.");
    }
  } catch (error) {
    console.log("Något gick fel");
  }
}
