console.log("PokeSlap is running!");

let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');
let pokemonContainer = document.getElementById('pokemonContainer');

searchButton.addEventListener('click', () => {
    let query = searchInput.value.toLowerCase();    
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => {
            if (!response.ok) { 
                throw new Error('Pokemon not found');
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            pokemonContainer.innerHTML = `<p>${error.message}</p>`;
        });
});

function displayPokemon(pokemon) {
    pokemonContainer.innerHTML = `
    <div class="pokemon-card">
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Height:</strong> ${pokemon.height}</p>
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
        <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
    </div>
    `;
    
}
