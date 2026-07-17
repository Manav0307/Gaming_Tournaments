# Gaming Tournaments — ARENA.BAU

A neo-brutalist competitive gaming tournament platform. This project has evolved from a static frontend mockup into a fully functional, data-driven full-stack web application powered by Node.js, Express, MongoDB, and Server-Side Rendering (SSR).

## Full Stack Architecture

- **Frontend Core**: HTML5 and Vanilla JavaScript.
- **Styling**: Tailwind CSS v3 with a custom high-contrast Bauhaus theme.
- **Backend Core**: Node.js and Express server.
- **Database**: MongoDB (via Mongoose schemas) managing Users, Players, Tournaments, Registrations, and Scores.
- **Server-Side Rendering (SSR)**: EJS templating engine utilized for dynamic route generation.

## Project Structure

```
tournament-app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route handlers implementing business logic
│   │   ├── middlewares/      # Error handling & Validation (Joi)
│   │   ├── models/           # Mongoose schemas (model.js)
│   │   ├── routes/           # Express API endpoints
│   │   ├── services/         # Database interaction logic
│   │   ├── utils/            # Shared utilities (API Responses/Errors)
│   │   └── app.js            # Express app configuration & EJS view engine setup
│   ├── .env                  # Environment configurations
│   ├── server.js             # Application entry point
│   └── Uploading_data.js     # Mock database seeding script
├── frontend/
│   ├── index.html          # Landing page (Dynamically fetches live stats)
│   ├── signup.html         # User account creation logic
│   ├── registration.html   # Central player registration form
│   ├── tournament.ejs      # Server-side rendered Tournament Dashboard
│   ├── src/input.css       # Tailwind source
│   ├── public/output.css   # Compiled CSS
│   ├── js/
│   │   ├── api.js          # Shared API config (connected to localhost:5000)
│   │   ├── signup.js       # Validates and submits account data
│   │   ├── registration.js # Populates dropdowns & registers players
│   │   ├── score.js        # Score submission handling
│   │   └── quick-register.js # Deep-page quick registration system
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Features Implemented

- **Dynamic Homepage Statistics**: Live counts of registered players and active tournaments fed via API.
- **Tournament Selection Hub**: The main landing page dropdown is fully connected to the database.
- **Authentication**: `signup.html` connects to backend routes to create and secure user credentials cleanly.
- **SSR Tournament Dashboards**: `tournament.ejs` dynamically renders specific tournament data and metrics based on `URL` parameters using EJS logic (`/view/tournament/:id`).
- **Live Leaderboards**: The tournament page queries a random sample of players directly from MongoDB to populate a mock competitive leaderboard.
- **Quick Registration System**: Players can register via the global registration page OR enter their name directly on an active tournament dashboard.
- **Score Submissions**: Built-in score pipeline matching players to tournaments using dynamic queries.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- Local or Cloud [MongoDB](https://www.mongodb.com/) instance

### Step 1: Environment Setup
Inside the `backend/` directory, ensure you have a `.env` file that defines your MongoDB connection and Server Port:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/gaming_tournaments 
```

### Step 2: Install Dependencies
```bash
# Install frontend tailwind dependencies
cd frontend
npm install

# Install backend dependencies (express, mongoose, ejs, joi, cors, etc.)
cd ../backend
npm install
```

### Step 3: Run the Application
Start the Node.js backend server:
```bash
cd backend
npm start
```
*The server will launch on `http://localhost:5000`.*

### Step 4: Access the Platform
Navigate into the frontend application by launching `frontend/index.html` via Live Server or simply pointing your browser to your static file. Note that navigating dynamically into tournaments will trigger the backend SSR engine and natively switch you to `localhost:5000/view/tournament/[id]`.

## Theme Disclaimer
Form Follows Function. Victory Follows The Form.
