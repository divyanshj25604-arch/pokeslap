/**
 * API module for fetching Pokémon data from PokéAPI.
 * Provides functions to retrieve Pokémon lists and details.
 */

const API_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetches a paginated list of Pokémon from PokéAPI.
 * @param {number} limit - Number of Pokémon to fetch
 * @param {number} offset - Starting position
 * @returns {Array} - Array of Pokémon with name and url
 */

export async function fetchPokemonList(limit = 30, offset = 0) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon list');
        }
        const data = await response.json();
        return data.results;
    }
    catch (error) {
        console.error('Error fetching Pokémon list:', error);
        return [];
    }
}

/**
 * Fetches detailed information about a specific Pokémon by name or ID.
 * @param {string|number} identifier - Pokémon name or ID
 * @returns {Object|null} - Pokémon details or null if not found
 */

export async function fetchPokemonDetails(identifier) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${identifier}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch details for Pokémon: ${identifier}`);
        }
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default,
            types: data.types.map(t => t.type.name),
            ability: data.abilities[0].ability.name,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
        };
    }
    catch (error) {
        console.error('Error fetching Pokémon details:', error);
        return null;
    }
}

/**
 * fetches pokemon species details by name or ID, used for fetching the description
 * @param {string|number} identifier - Pokémon name or ID
 * @returns {Object|null} - Pokémon species details or null if not found
 */

export async function fetchPokemonSpeciesDetails(identifier) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon-species/${identifier}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch species details for Pokémon: ${identifier}`);
        }
        const data = await response.json();
        const englishEntry = data.flavor_text_entries.find(entry => entry.language.name === 'en');
        return {
            description: englishEntry
                ? englishEntry.flavor_text.replace(/[\n\f\u000c]/g, ' ')
                : 'No description available.'
        };
    }
    catch (error) {
        console.error('Error fetching Pokémon species details:', error);
        return null;
    }
}