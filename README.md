# PokéSlap

A clean, responsive Pokédex web app built with vanilla JavaScript and the PokéAPI.  
No frameworks. No loops for data operations. Just ES6+, Fetch API, and Array HOFs.

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
| `GET /pokemon/{name}` | Fetch individual Pokémon details |
| `GET /type/{name}` | Fetch Pokémon by type |

---

## Planned Features

### Core (Required)
- [ ] Fetch and display Pokémon cards (name, image, type, base stats)
- [ ] Search by Pokémon name — with debouncing
- [ ] Filter by type (fire, water, grass, etc.)
- [ ] Sort by name (A–Z, Z–A) or base stat (HP, Attack)
- [ ] Loading states during API calls
- [ ] Responsive layout (mobile, tablet, desktop)

### Bonus
- [ ] Favorites — save/remove with localStorage persistence
- [ ] Dark mode / Light mode toggle — preference saved in localStorage
- [ ] Pagination or infinite scroll for large data sets

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom, no frameworks) |
| Logic | JavaScript ES6+ |
| Data | Fetch API + PokéAPI |
| Storage | localStorage (favorites, theme) |
| Hosting | GitHub Pages _(after Milestone 4)_ |

---

## Project Structure

```
pokeslap/
│
├── index.html          # App entry point
├── style.css           # Global styles and responsive layout
│
└── js/
    ├── api.js          # All fetch calls and API logic
    ├── render.js       # DOM manipulation and card rendering
    ├── filters.js      # Search, filter, sort using HOFs
    ├── storage.js      # localStorage: favorites and theme
    └── main.js         # App init and event bindings
```

---

## Setup and Running Locally

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/pokeslap.git
   cd pokeslap
   ```

2. Open `index.html` in your browser directly  
   _(No build step or server required)_

   Or use VS Code Live Server for a better dev experience.

---

## Constraints

- No `for` or `while` loops for search, filter, or sort operations
- No external JS libraries (jQuery, Lodash, etc.)
- No backend — fully frontend
- All data operations via Array HOFs only

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

> README will be updated at each milestone as features are completed.
