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

/**
 * Sorts Pokémon array by a given key.
 * @param {Array} pokemonList - Array of Pokémon objects
 * @param {string} key - Sort key: 'id', 'name', 'hp', 'attack', 'defense'
 * @returns {Array} - Sorted array
 */
export function sortPokemon(pokemonList, key) {
    return [...pokemonList].sort((a, b) => {
        if (key === 'name') return a.name.localeCompare(b.name);
        return a[key] - b[key];
    });
}