import { countriesTempelate } from "./templates.mjs";

document.getElementById('search-btn').addEventListener('click', () => {
  const countryFlex = document.querySelector('.country-flex');
  
  // Reset animation by removing the 'loaded' class
  countryFlex.classList.remove('loaded');
  
  // Optionally, hide the flex container before content load
  countryFlex.style.opacity = 0;
  
  // Fetch and display the data related to the searched country
  searchCountry();
});

const baseUrl = "https://restcountries.com/v3.1/";

async function getJson(url) {
  const options = {
    method: "GET",
  };
  let data = {};
  const response = await fetch(baseUrl + url, options);
  if (response.ok) {
    data = await response.json();
  } else {
    // Add a message that informs the user that no such country was found
    throw new Error("response not ok");
  }
  return data;
}

async function searchCountry() {
  let search = document.querySelector("#search").value;
  try {
    const results = await getJson(`name/${search}`);
    console.log(results);
    setContries(results);
  } catch (error) {
    console.error(error);
    alert('Country not found');
  }
}

function toggleNav() {
  const navLinks = document.querySelector('.nav-links');
  console.log('toggled')
  if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
  } else {
      navLinks.style.display = 'flex';
  }
}


function setContries(data) {
  let flexbox = document.querySelector(".country-flex");
  
  // Clear existing countries
  flexbox.innerHTML = '';
  
  let htmlToInsert = data.map(countriesTempelate);
  flexbox.innerHTML = htmlToInsert.join("");
  
  // Re-apply the 'loaded' class with a small timeout for smooth fade-in
  setTimeout(() => { 
    flexbox.classList.add("loaded");
    // Optionally, reset opacity to 1 after animation class is applied
    flexbox.style.opacity = 1;
  }, 10); // Adding a small timeout to ensure DOM is updated before animation starts
}

document.getElementById("search-btn").addEventListener("click", searchCountry);
document.querySelector('.toggle-btn').addEventListener('click', toggleNav);




/*
ITEMS TO IMPLEMENT/THINK ABOUT

Have the country results turn into a drop-down that then transitions to a region.
Make each country element a fake button that glows when hovered and then pulls up a seperate region page
    where the animals to be hunted in that region are stored. If there is time, add subregions

Do we make the regions a dropdown in the header menu and thus solve our region problem?

*/
