import { splashScreen, showApp, showFavourites } from "./navigation.js";
import { createNavbar } from "./components/navbar.js";
import { searchPokemon, filterByType } from "./filters.js";
import { renderCards, getAllPokemon, renderPokemonGrid } from "./render.js";

const pokemonGridContainer = document.getElementById("pokemon-grid");

// Initialize the application by showing the splash screen
splashScreen();

// Set up event listener for the "Start PokeSlap" button on the splash screen
document.getElementById('start-app').addEventListener('click', () => {
    showApp();
    document.getElementById('navbar').innerHTML = createNavbar();
    renderPokemonGrid(pokemonGridContainer, 501);

    document.getElementById('search-input').addEventListener('input', (e) => {
        const term = e.target.value;
        const filtered = searchPokemon(getAllPokemon(), term);
        renderCards(pokemonGridContainer, filtered);
    });

    let hoverTimeout;

    document.getElementById('pokemon-grid').addEventListener('mouseover', (e) => {
        const card = e.target.closest('.card-container');
        if (!card) return;
        if (card.dataset.hoverActive) return;

        card.dataset.hoverActive = true;
        card.dataset.timeout = setTimeout(() => {
            card.classList.add('flipped');
        }, 500);
    });

    document.getElementById('pokemon-grid').addEventListener('mouseout', (e) => {
        const card = e.target.closest('.card-container');
        if (!card) return;

        const related = e.relatedTarget;
        if (card.contains(related)) return;

        clearTimeout(card.dataset.timeout);
        delete card.dataset.hoverActive;
        card.classList.remove('flipped');
    });

    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            const filtered = filterByType(getAllPokemon(), type);
            renderCards(pokemonGridContainer, filtered);
        });
    });

    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});