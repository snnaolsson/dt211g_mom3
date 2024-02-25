/*FRÅN GOOGLES DOKUMENTATION FÖR ATT ANVÄNDA GOOGLE MAPS*/
((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r, "places"].join(",")); //Inkluderar places
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyCw8QUFeTxxBE9BfRb2r71C8PctkwYuGVY",
  v: "weekly",
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});

//*HÄR BÖRJAR MIN KOD*/
let longitude;
let lattitude;
//Hämtar användarens longitud och lattitud för att märka ur var du är på kartan
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    lattitude = position.coords.latitude;
    longitude = position.coords.longitude;
  });
} else {
  //Om din webbläsare inte stödjer funktionen
  window.alert("Din webbläsare stödjer inte geolokalisering!");
  longitude = 37.422131;
  lattitude = -122.084801;
}
let map;

//funktion för att söka efter platser och sedan visa dessa med google maps
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps"); //importera karta
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker"); //importera markören

  //skapa karta
  map = new Map(document.getElementById("map"), {
    center: { lat: lattitude, lng: longitude },
    zoom: 8,
    mapId: "MOM5_MAP",
  });

  const input = document.getElementById("location-input"); //Hämtar inputfältet från gränssnittet
  const searchBox = new google.maps.places.SearchBox(input); //Skapar en searchbox och kopplar den till inputfältet ovan - sökrutan kommer att visa förslag och användaren kan använda ett av dessa för att göra sin sökning

  //array
  const markers = [];

  //Lägger till en händelselyssnare till searchbox
  searchBox.addListener("places_changed", () => {
    //När den triggas så hämtas en array av platser som matchar användarens sökning
    const places = searchBox.getPlaces();

    //Om använadaren inte använder någon plats så avbryts funktionen
    if (places.length == 0) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    //loopar igenom arrayen och för varje plats så kontrolleras att platsen har en definierad geografisk form och en location. Om inte så skrivs ett felmeddelande ut till konsollen
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Platsen innehåller ingen geometri");
        return;
      }
      //skapar en ny markör för varje location och skickar till arrayen markers
      const marker = new AdvancedMarkerElement({
        map: map,
        position: place.geometry.location,
      });
      markers.push(marker);

      //kontrollerar om platsen har en viewport om den inte har det så läggs dess positionsgeometri till bounds-objektet så att det innehåller den geografiska positionen för platsen
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds); //Justrerar automatiskt kartans plats
  });
}

initMap(); //Kör funktionen
