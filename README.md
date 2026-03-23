# PokéSlap

A dark, dramatic Pokédex web app built with vanilla JavaScript and PokéAPI.  
No frameworks. No loops for data operations. Pure ES6+, Fetch API, and Array HOFs.

---

## Purpose

PokéSlap lets users browse, search, filter, and sort Pokémon using live data from PokéAPI.  
Built as part of a JavaScript + API integration project to demonstrate:

- Real-time API consumption using `fetch`
- Data manipulation using Array HOFs (`map`, `filter`, `sort`, `find`, `reduce`)
- Responsive UI with search, filtering, sorting, and persistent favorites

---

## Live Demo

> _Link will be added after deployment (Milestone 4)_

---

## API Used

**PokéAPI** — Free, public, no authentication required.  
Documentation: https://pokeapi.co/docs/v2

| Endpoint | Purpose |
|---|---|
| `GET /pokemon?limit=150` | Fetch Pokémon list |
| `GET /pokemon/{name}` | Fetch individual Pokémon details (stats, type, ability, image) |
| `GET /pokemon-species/{name}` | Fetch Pokédex flavor text description |
| `GET /type/{name}` | Fetch Pokémon by type |

---

## App Flow

```
Splash Screen
    ↓ (click Start)
Main App — centered search hero + background Pokémon cards (low opacity)
    ↓ (user searches or scrolls)
Main App — search collapses into fixed top navbar, card grid appears
    ↓ (click Favorites in navbar)
Favorites View — same page, renders saved Pokémon from localStorage
    ↓ (click Back)
Main App grid
```

---

## UI Design

**Theme:** Dark and dramatic — black/deep gray base, red accents (`#CC0000`), sharp white typography.

### Splash Screen
- Full screen dark background
- App title and short description
- Single glowing START button
- Subtle Pokéball graphic in background using pure CSS

### Main App — Landing State
- Background grid of real Pokémon cards at low opacity
- Cards scale up on hover
- Centered glassmorphism search panel on top (frosted glass effect using `backdrop-filter: blur()`)
- Filter pills below search bar (All, Fire, Water, Grass, etc.)

### Main App — Active State (after search/scroll)
- Fixed top navbar appears with: Logo, Favorites link, Dark mode toggle
- Search bar, sort, and filter pills sit just below navbar
- Full card grid renders below

### Navbar Contents
- PokéSlap logo
- Favorites link (switches to favorites view)
- Dark mode / light mode toggle

---

## Pokémon Card Design

### Front Face
```
┌─────────────────────────────┐
│ Pikachu          HP: 35     │
│ #025                 [img]  │
│ Type: Electric              │
│ Ability: Static             │
│                             │
│ ▓▓▓░░░░░░  Attack           │
│ ▓▓▓▓▓░░░░  Defense          │
│ ▓▓▓▓▓▓▓░░  Speed            │
└─────────────────────────────┘
```

- Name and HP locked at top
- Pokémon image on right
- Type and Ability as text below name
- 3 progress bars at bottom (Attack, Defense, Speed)
- Bars form an inverted pyramid shape (progressively wider top to bottom)

### Back Face (on click)
```
┌─────────────────────────────┐
│                             │
│  "When it is angered, it    │
│   immediately discharges    │
│   the energy stored in      │
│   the pouches in its        │
│   cheeks..."                │
│                             │
│         — Pokédex Entry     │
└─────────────────────────────┘
```

- Pokédex flavor text description
- Sourced from `/pokemon-species/{name}` endpoint
- Card flip implemented using pure CSS `transform: rotateY(180deg)`

---

## Features

### Core (Required)
- [ ] Fetch and display Pokémon cards with name, image, type, ability, and stats
- [ ] Search by Pokémon name with debouncing
- [ ] Filter by type using filter pills
- [ ] Sort by name (A-Z, Z-A) or base stat (Attack, Defense, Speed)
- [ ] Loading states during API calls
- [ ] Responsive layout (mobile, tablet, desktop)

### Bonus
- [ ] Card flip on click — shows Pokédex description on back
- [ ] Favorites — save/remove with localStorage persistence
- [ ] Dark mode / Light mode toggle — preference saved in localStorage
- [ ] Debouncing on search input
- [ ] Pagination or infinite scroll

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom, no frameworks) |
| Logic | JavaScript ES6+ |
| Data | Fetch API + PokéAPI |
| Storage | localStorage (favorites, theme) |
| Hosting | GitHub Pages (after Milestone 4) |

---

## Project Structure

```
pokeslap/
│
├── index.html          # Single entry point — all views live here
├── style.css           # Global styles, layout, responsive
├── README.md           # Project documentation
│
└── js/
    ├── api.js          # All fetch calls to PokéAPI
    ├── render.js       # DOM rendering — cards, grid, favorites view
    ├── filters.js      # Search, filter, sort using HOFs only
    ├── storage.js      # localStorage — favorites and theme
    ├── navigation.js   # View switching — splash, main app, favorites
    └── main.js         # App init and all event listeners
```

### File Responsibilities

| File | Single Responsibility |
|---|---|
| `api.js` | Talks to PokéAPI. Nothing else |
| `render.js` | Builds and updates DOM. Nothing else |
| `filters.js` | Searches, filters, sorts data arrays. No DOM, no fetch |
| `storage.js` | Reads and writes localStorage. Nothing else |
| `navigation.js` | Switches between splash, main app, and favorites views |
| `main.js` | Starts the app and binds all event listeners |

---

## Setup and Running Locally

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/pokeslap.git
   cd pokeslap
   ```

2. Open `index.html` directly in your browser  
   _(No build step or server required)_

   Or use VS Code Live Server for a better dev experience.

---

## Constraints

- No `for` or `while` loops for search, filter, or sort operations
- No external JS libraries (jQuery, Lodash, etc.)
- No JSX, no React, no build tools
- No backend — fully frontend
- All data operations via Array HOFs only
- Every function must have a comment block describing its purpose

---

## Milestones

| Milestone | Description | Deadline |
|---|---|---|
| 1 | Project setup, API selection, GitHub repo, README | 23rd March |
| 2 | API integration, dynamic rendering, responsive UI | 1st April |
| 3 | Search, filter, sort, favorites, dark mode | 8th April |
| 4 | Refactor, deploy, final documentation | 10th April |

---

## Author

**Divyansh Jha**  
Course: _BTech CS&AI_  
Institution: _Newton School Of Technology_

---

> README is updated at each milestone as features are completed.
