/**
 * Creates an HTML card for a given Pokémon.
 * @param {Object} pokemon - An object representing a Pokémon with properties like id, name, image, etc.
 * @returns {string|null} - HTML string for the Pokémon card or null if details couldn't be fetched
 */


export async function createPokemonCard(pokemon, speciesDetails) {
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
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <p>Type: ${pokemon.types.join(', ')}</p>
            <p>Abilities: ${pokemon.ability}</p>
            <div class="stat-bar">
                <span>Attack</span>
                <div class="bar">
                    <div class="bar-fill" style="width: ${(pokemon.attack / 255) * 100}%"></div>
                </div>
                <span>Defense</span>
                <div class="bar">
                    <div class="bar-fill" style="width: ${(pokemon.defense / 255) * 100}%"></div>
                </div>
                <span>Speed</span>
                <div class="bar">
                    <div class="bar-fill" style="width: ${(pokemon.speed / 255) * 100}%"></div>
                </div>
            </div>
        </div>
        <div class="card-back">
            <h3>Details</h3>
            <p>${speciesDetails}</p>
        </div>
    </div>
</div>`;    
}