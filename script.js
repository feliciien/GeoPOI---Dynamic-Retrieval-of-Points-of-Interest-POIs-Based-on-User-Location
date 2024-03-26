// Importer la fonction openstreetmapGetPOIs du module externe
import { openstreetmapGetPOIs } from 'https://tbo47.github.io/ez-opendata.js';

// Fonction pour récupérer les POIs en fonction de la position actuelle de l'utilisateur
async function fetchPOIsNearCurrentLocation() {
  try {
    // Récupération de la position actuelle de l'utilisateur
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    // Extraction des coordonnées de la position
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Définition des valeurs pour créer le carré de coordonnées GPS autour de la position actuelle
    const delta = 0.1; // La valeur à ajouter ou soustraire à la latitude/longitude pour créer le carré

    // Calcul des coordonnées du carré de coordonnées GPS
    const bbox = `${latitude - delta},${longitude - delta},${latitude + delta},${longitude + delta}`;

    // Définition des types de POIs à rechercher (même liste que précédemment)
    const poiTypes = [
      ["amenity", "bar"],
      ["amenity", "biergarten"],
      ["amenity", "cafe"],
      ["amenity", "restaurant"],
      ["amenity", "fast_food"],
      ["amenity", "food_court"],
      ["amenity", "ice_cream"],
    ];

    // Appel de la fonction openstreetmapGetPOIs avec les coordonnées de la zone géographique et les types de POIs
    const pois = await openstreetmapGetPOIs(bbox, poiTypes);

    // Affichage des POIs récupérés
    const myDiv = document.getElementById('my-div');
    pois.forEach(poi => {
      myDiv.innerHTML += `<a href="${poi.osm_url}" target="_blank">${poi.name}</a><br>`;
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la position :', error);
  }
}

// Appel de la fonction pour récupérer les POIs en fonction de la position actuelle de l'utilisateur
fetchPOIsNearCurrentLocation();
