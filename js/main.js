import { splashScreen, showApp, showFavourites } from "./navigation.js";
import { createNavbar } from "./components/navbar.js";
import { searchPokemon, filterByType, sortPokemon } from "./filters.js";
import { renderCards, getAllPokemon, renderPokemonGrid } from "./render.js";

const pokemonGridContainer = document.getElementById("pokemon-grid");
let currentSearchTerm = '';
let currentTypeFilter = 'all';
let currentSortKey = 'id';

function applyFilters() {
    let result = getAllPokemon();

    if (currentSearchTerm) {
        result = searchPokemon(result, currentSearchTerm);
    }

    result = filterByType(result, currentTypeFilter);
    result = sortPokemon(result, currentSortKey);
    renderCards(pokemonGridContainer, result);
}

// Initialize the application by showing the splash screen
splashScreen();

// Set up event listener for the "Start PokeSlap" button on the splash screen
document.getElementById('start-app').addEventListener('click', () => {
    showApp();
    document.getElementById('navbar').innerHTML = createNavbar();
    renderPokemonGrid(pokemonGridContainer, 501);

    document.getElementById('search-input').addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.trim();
        applyFilters();
    });

    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', (e) => {
        currentSortKey = e.target.value;
        applyFilters();
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
            currentTypeFilter = btn.dataset.type;
            document.querySelectorAll('.type-btn').forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        });
    });

    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});