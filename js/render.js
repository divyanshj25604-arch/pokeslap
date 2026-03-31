import { fetchPokemonList, fetchPokemonDetails, fetchPokemonSpeciesDetails } from "./api.js";
import { createPokemonCard } from "./components/card.js";

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

        pokemonDetails.forEach((_, index) => {
            const pokemonData = {
                ...pokemonDetails[index],
                description: pokemonSpeciesDetails[index]?.description
            };
            const card = createPokemonCard(pokemonData);
            container.insertAdjacentHTML('beforeend', card);
        });
        loading.classList.add('hidden'); // hide loading after done
    } catch (error) {
        // after cards are rendered:
        loading.classList.add('hidden'); // hide
        console.error('Error rendering Pokémon grid:', error);
        container.innerHTML = '<p class="error">Failed to load Pokémon data. Please try again later.</p>';
    }
}