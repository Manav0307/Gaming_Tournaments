# Gaming Tournaments — ARENA.BAU

A neo-brutalist competitive gaming tournament platform frontend.

## Project Structure

```
tournament-app/
├── frontend/
│   ├── index.html          # Landing page
│   ├── signup.html         # Account creation
│   ├── registration.html   # Player registration
│   ├── tournament.html     # Tournament dashboard & leaderboard
│   ├── src/input.css       # Tailwind source + custom styles
│   ├── public/output.css   # Compiled CSS (generated)
│   ├── js/
│   │   ├── api.js          # Shared API utilities & index interactions
│   │   ├── signup.js       # Signup page interactions
│   │   ├── registration.js # Registration form & side nav
│   │   ├── score.js        # Score submission form
│   │   └── leaderboard.js  # Tournament micro-interactions
│   ├── assets/             # Static assets
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)

### Setup

```bash
cd tournament-app/frontend
npm install
npm run build:css
```

### Development

Watch for CSS changes during development:

```bash
npm run watch:css
```

### Viewing Pages

Open any HTML file directly in a browser, or serve the `frontend` folder with a local server:

```bash
npx serve .
```

Then visit:
- `http://localhost:3000/index.html`
- `http://localhost:3000/signup.html`
- `http://localhost:3000/registration.html`
- `http://localhost:3000/tournament.html`

## Tech Stack

- **HTML5** — Page structure
- **Tailwind CSS v3** — Utility-first styling with custom Bauhaus theme
- **Vanilla JavaScript** — Page-specific interactions (no framework)

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page with hero, stats, and newsletter CTA |
| `signup.html` | Create account form with benefits sidebar |
| `registration.html` | Player profile registration with mobile side nav |
| `tournament.html` | Live tournament dashboard with leaderboard and score submission |
