/**
 * Searches for Pokémon in the list based on a search term.
 * @param {Array} pokemonList - The list of Pokémon objects.
 * @param {string} term - The search term.
 * @returns {Array} - The filtered list of Pokémon.
 */

export function searchPokemon(pokemonList, term) {
    return pokemonList.filter(pokemon => 
        pokemon.name.toLowerCase().includes(term.toLowerCase()) ||
        pokemon.id.toString() === term
    );
}

export function filterByType(pokemonList, type) {
    if (type === 'all') return pokemonList;
    return pokemonList.filter(pokemon => pokemon.types.includes(type));
}