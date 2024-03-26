import { openstreetmapGetPOIs } from 'https://tbo47.github.io/ez-opendata.js';

document.addEventListener("DOMContentLoaded", async function() {
    const food = await openstreetmapGetPOIs(
        "14.67,-17.46,14.71,-17.41",
        [
            ["amenity", "bar"],
            ["amenity", "biergarten"],
            ["amenity", "cafe"],
            ["amenity", "restaurant"],
            ["amenity", "fast_food"],
            ["amenity", "food_court"],
            ["amenity", "ice_cream"],
        ]
    );

    const myDiv = document.getElementById('my-div');

    console.log(food);

    food.forEach(poi => {
        const link = document.createElement('a');
        link.href = poi.osm_url;
        link.target = "_blank";
        link.textContent = poi.name;
        link.classList.add('poi-link');

        myDiv.appendChild(link);
    });
});
