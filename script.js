const myDiv = document.getElementById('my-div');

// Function to get POIs from OpenStreetMap
async function openstreetmapGetPOIs(coords, types) {
  // Simulated API call, replace with actual API call
  return new Promise(resolve => {
    setTimeout(() => {
      const pois = [
        { name: "POI 1", osm_url: "https://www.openstreetmap.org/1" },
        { name: "POI 2", osm_url: "https://www.openstreetmap.org/2" },
        { name: "POI 3", osm_url: "https://www.openstreetmap.org/3" }
      ];
      resolve(pois);
    }, 1000);
  });
}

// Function to fetch and display POIs based on user's location
async function fetchAndDisplayPOIs() {
  try {
    // Get user's current position
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;

    // Create dynamic coordinates square
    const topLeft = (latitude - 0.1).toFixed(2) + ',' + (longitude - 0.1).toFixed(2);
    const bottomRight = (latitude + 0.1).toFixed(2) + ',' + (longitude + 0.1).toFixed(2);
    
    // Fetch POIs
    const food = await openstreetmapGetPOIs(`${topLeft},${bottomRight}`, [
      ["amenity", "bar"],
      ["amenity", "biergarten"],
      ["amenity", "cafe"],
      ["amenity", "restaurant"],
      ["amenity", "fast_food"],
      ["amenity", "food_court"],
      ["amenity", "ice_cream"]
    ]);

    // Display POIs
    displayPOIs(food);
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching and displaying POIs:", error);
    myDiv.innerHTML = "Error fetching POIs. Please try again later.";
  }
}

// Function to get current position using geolocation API
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Function to display POIs in the DOM
function displayPOIs(pois) {
  myDiv.innerHTML = '';
  pois.forEach(poi => {
    myDiv.innerHTML += `<a href="${poi.osm_url}" target="_blank">${poi.name}</a>`;
  });
}

// Fetch and display POIs on page load
fetchAndDisplayPOIs();
