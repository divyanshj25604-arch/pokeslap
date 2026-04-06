/**
 * Creates an HTML card for a given Pokémon.
 * @param {Object} pokemon - An object representing a Pokémon with properties like id, name, image, etc.
 * @returns {string|null} - HTML string for the Pokémon card or null if details couldn't be fetched
 */

const TYPE_COLORS = {
    fire: '#FF6B4A',
    water: '#4A90D9',
    grass: '#4CAF50',
    electric: '#FFD700',
    psychic: '#FF6BA0',
    normal: '#A8A878',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    dragon: '#7038F8',
    ice: '#98D8D8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    flying: '#A890F0',
};

export function createPokemonCard(pokemon) {
    return `<div class="card-container">
    <div class="card-inner">
        <div class="card-front">
            <div class="card-header">
                <div>
                    <h2>${pokemon.name}</h2>
                    <span class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</span>
                </div>
                <span class="pokemon-hp">HP: ${pokemon.hp}</span>
            </div>
            <div class="card-img-wrapper">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>

            <div class="type-badges">
                ${pokemon.types.map(type => `
                    <span class="type-badge" style="background-color: ${TYPE_COLORS[type]}22; color: ${TYPE_COLORS[type] || '#777'}; border: 1px solid ${TYPE_COLORS[type]};">
                        ${type}
                    </span>
                `).join('')}
            </div>
            <p class="pokemon-ability">Ability: ${pokemon.ability}</p> 
            <div class="stat-bar">
                <div class="stat-row">
                    <span class="stat-label">Attack</span>
                    <div class="bar">
                        <div class="bar-fill" style="width: ${(pokemon.attack / 255) * 100}%"></div>
                    </div>
                    <span class="stat-value">${pokemon.attack}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Defense</span>
                    <div class="bar">
                        <div class="bar-fill" style="width: ${(pokemon.defense / 255) * 100}%"></div>
                    </div>
                    <span class="stat-value">${pokemon.defense}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Speed</span>
                    <div class="bar">
                        <div class="bar-fill" style="width: ${(pokemon.speed / 255) * 100}%"></div>
                    </div>
                    <span class="stat-value">${pokemon.speed}</span>
                </div>
            </div>
                      
        </div>
        <div class="card-back">
            <h3>Details</h3>
            <p>&quot;${pokemon.description}&quot;</p>
        </div>
    </div>
</div>`;
}