const KEY = 'favouritePokemon';

export function getFavourites() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveFavourites(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
}

export function toggleFavourite(pokemon) {
    const favourites = getFavourites();

    const exists = favourites.find(p => p.id === pokemon.id);

    let updated;

    if (exists) {
        updated = favourites.filter(p => p.id !== pokemon.id);
    } else {
        updated = [...favourites, pokemon];
    }

    saveFavourites(updated);
    return updated;
}

export function isFavourite(id) {
    return getFavourites().some(p => p.id === id);
}