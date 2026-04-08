import { renderCards } from "./render.js";
import { getFavourites } from "./storage.js";
import { searchPokemon, filterByType, sortPokemonByAttribute } from "./filters.js";

export let currentSearchTermFav = '';
export let currentTypeFilterFav = 'all';
export let currentSortKeyFav = 'id';

export function applyFiltersFav() {
    let result = getFavourites();

    if (currentSearchTermFav) {
        result = searchPokemon(result, currentSearchTermFav);
    }

    result = filterByType(result, currentTypeFilterFav);
    result = sortPokemonByAttribute(result, currentSortKeyFav, document.getElementById('sort-order-fav').value);

    const container = document.getElementById('favorites-grid');
    if (result.length === 0) {
        container.innerHTML = '<p>No favourites match the current filters.</p>';
    } else {
        renderCards(container, result);
    }
}

export function renderFavouritesPage() {
    applyFiltersFav();
}

document.querySelectorAll('#type-filters-fav .type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentTypeFilterFav = btn.dataset.type;

        document.querySelectorAll('#type-filters-fav .type-btn')
            .forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        applyFiltersFav();
    });
});