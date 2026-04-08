import { createNavbar } from "./components/navbar.js";

/**
 * This file contains functions to navigate between different views of the application.
 * Each function manipulates the DOM to show or hide specific sections based on the user's interaction.
 * The functions include:
 * - splashScreen: Displays the splash screen and hides the main content and navigation bar.
 * - showApp: Displays the main application view and hides the splash screen and favorites.
 * - showFavourites: Displays the favorites view and hides the splash screen and main content.
 */

export function splashScreen() {
    document.getElementById('splash').classList.remove('hidden');
    document.getElementById('favorites').classList.add('hidden');
    document.getElementById('navbar').classList.add('hidden');
    document.getElementById('main').classList.add('hidden');
}

export function showApp() {
    document.getElementById('splash').classList.add('hidden');
    document.getElementById('favorites').classList.add('hidden');
    document.getElementById('navbar').classList.remove('hidden');
    document.getElementById('main').classList.remove('hidden');
    document.getElementById('navbar').innerHTML = createNavbar(false);
}

export function showFavourites() {
    document.getElementById('splash').classList.add('hidden');
    document.getElementById('favorites').classList.remove('hidden');
    document.getElementById('navbar').classList.remove('hidden');
    document.getElementById('main').classList.add('hidden');
    document.getElementById('navbar').innerHTML = createNavbar(true);
}