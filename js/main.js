import { splashScreen, showApp, showFavourites } from "./navigation.js";
import { searchPokemon, filterByType, sortPokemonByAttribute } from "./filters.js";
import { renderCards, getAllPokemon, renderPokemonGrid } from "./render.js";
import { toggleFavourite, getFavourites } from "./storage.js";
import { currentSearchTermFav, currentTypeFilterFav, currentSortKeyFav, applyFiltersFav, renderFavouritesPage } from "./favourites.js";

function initNavbarEvents() {
    const navbar = document.getElementById('navbar');

    navbar.addEventListener('click', (e) => {
        const logo = e.target.closest('#logo');
        if (logo) {
            showApp();
            applyFilters();
            return;
        }

        const favoritesBtn = e.target.closest('#favorites-btn');
        if (favoritesBtn) {
            showFavourites();
            renderFavouritesPage();
            return;
        }

        const darkModeBtn = e.target.closest('#dark-mode-toggle');
        if (darkModeBtn) {
            document.body.classList.toggle('dark-mode');
        }
    });
}

function initFavoritesControls() {
    const searchInputFav = document.getElementById('search-input-fav');
    const sortSelectFav = document.getElementById('sort-select-fav');
    const sortOrderFav = document.getElementById('sort-order-fav');
    const typeFiltersFav = document.getElementById('type-filters-fav');
    const favoritesGrid = document.getElementById('favorites-grid');

    if (!searchInputFav || !sortSelectFav || !sortOrderFav || !typeFiltersFav || !favoritesGrid) return;

    searchInputFav.addEventListener('input', (e) => {
        currentSearchTermFav = e.target.value.trim();
        applyFiltersFav();
    });

    sortSelectFav.addEventListener('change', (e) => {
        currentSortKeyFav = e.target.value;
        applyFiltersFav();
    });

    sortOrderFav.addEventListener('change', applyFiltersFav);

    typeFiltersFav.addEventListener('click', (e) => {
        if (!e.target.classList.contains('type-btn')) return;
        document.querySelectorAll('#type-filters-fav .type-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentTypeFilterFav = e.target.dataset.type;
        applyFiltersFav();
    });

    favoritesGrid.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.card-container');
        if (!card) return;
        if (card.dataset.hoverActive) return;

        card.dataset.hoverActive = true;
        card.dataset.timeout = setTimeout(() => {
            card.classList.add('flipped');
        }, 500);
    });

    favoritesGrid.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.card-container');
        if (!card) return;

        const related = e.relatedTarget;
        if (card.contains(related)) return;

        clearTimeout(card.dataset.timeout);
        delete card.dataset.hoverActive;
        card.classList.remove('flipped');
    });
}

document.getElementById('pokemon-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('.fav-btn');
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const pokemon = getAllPokemon().find(p => p.id === id);

    toggleFavourite(pokemon);

    applyFilters();
});

document.getElementById('favorites').addEventListener('click', (e) => {
    const btn = e.target.closest('.fav-btn');
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const pokemon = getAllPokemon().find(p => p.id === id);

    toggleFavourite(pokemon);

    renderFavouritesPage();
});

let currentOffset = 0;
let limit = 300;

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
    result = sortPokemonByAttribute(result, currentSortKey, document.getElementById('sort-order').value);
    renderCards(pokemonGridContainer, result);
}

// Initialize the application by showing the splash screen
splashScreen();

// Set up event listener for the "Start PokeSlap" button on the splash screen
document.getElementById('start-app').addEventListener('click', () => {
    showApp();
    renderPokemonGrid(pokemonGridContainer, limit, currentOffset);

    document.getElementById('load-more-btn').addEventListener('click', async () => {
        currentOffset += limit;
        limit = 200;

        await renderPokemonGrid(pokemonGridContainer, limit, currentOffset);

        applyFilters();
    });

    initNavbarEvents();
    initFavoritesControls();

    document.getElementById('search-input').addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.trim();
        applyFilters();
    });

    document.getElementById('sort-order').addEventListener('change', () => {
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