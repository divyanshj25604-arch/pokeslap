import { renderPokemonGrid } from "./render.js";
import { splashScreen, showApp, showFavourites } from "./navigation.js";
import { createNavbar } from "./components/navbar.js";

const pokemonGridContainer = document.getElementById("pokemon-grid");

// Initialize the application by showing the splash screen
splashScreen();

// Set up event listener for the "Start PokeSlap" button on the splash screen
document.getElementById('start-app').addEventListener('click', () => {
    showApp();
    document.getElementById('navbar').innerHTML = createNavbar();

    renderPokemonGrid(pokemonGridContainer);

    // Now these elements exist in DOM
    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});

