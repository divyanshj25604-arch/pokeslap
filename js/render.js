import { fetchPokemonList, fetchPokemonDetails, fetchPokemonSpeciesDetails } from "./api.js";
import { createPokemonCard } from "./components/card.js";

let allPokemon = [];

/**
 * Renders a grid of Pokémon cards in the specified container.
 * @param {HTMLElement} container - The DOM element where the Pokémon cards will be rendered.
 * @param {number} limit - The number of Pokémon to fetch and display (default is 30).
 * @param {number} offset - The starting index for fetching Pokémon (default is 0).
 */


export async function renderPokemonGrid(container, limit = 30, offset = 0) {
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden'); // show
    try {
        const pokemonList = await fetchPokemonList(limit, offset);
        const pokemonDetailsPromises = pokemonList.map(pokemon => fetchPokemonDetails(pokemon.name));
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);


        const pokemonSpeciesDetailsPromises = pokemonDetails.map(pokemon => fetchPokemonSpeciesDetails(pokemon.id));
        const pokemonSpeciesDetails = await Promise.all(pokemonSpeciesDetailsPromises);

        const newPokemon = pokemonDetails.map((_, index) => ({
            ...pokemonDetails[index],
            description: pokemonSpeciesDetails[index]?.description
        }));

        allPokemon = [...allPokemon, ...newPokemon];
        renderCards(container, newPokemon, true);

        // renderCards(container, allPokemon.slice(offset, offset + limit), offset !== 0);
        // console.log(pokemonSpeciesDetails[index].description);
        // console.log(pokemonData);
        loading.classList.add('hidden'); // hide loading after done
        document.getElementById('load-more-btn').classList.remove('hidden');
    } catch (error) {
        // after cards are rendered:
        loading.classList.add('hidden'); // hide
        console.error('Error rendering Pokémon grid:', error);
        container.innerHTML = '<p class="error">Failed to load Pokémon data. Please try again later.</p>';
    }
}

/**
 * Renders a list of Pokémon cards into a container.
 * @param {HTMLElement} container - The DOM element to render cards into.
 * @param {Array} list - Array of Pokémon data objects.
 */
export function renderCards(container, list, append = false) {
    if (!append) container.innerHTML = '';

    list.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        container.insertAdjacentHTML('beforeend', card);
    });
}

/**
 * Returns the full list of fetched Pokémon.
 * @returns {Array} - All fetched Pokémon data.
 */
export function getAllPokemon() {
    return allPokemon;
}