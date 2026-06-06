# Zerodha Clone

A MERN-style Zerodha clone with three separate parts:

- `frontend` - public landing website with login and signup pages.
- `dashboard` - authenticated trading dashboard with watchlist, holdings, positions, orders, funds, apps, buy action window, and charts.
- `backend` - Express API with MongoDB models, holdings/positions/order APIs, and JWT cookie authentication.

This project is intended for learning full-stack React, Express, MongoDB, routing, API calls, authentication, and basic testing.

## Features

- Zerodha-style landing pages: home, about, products, pricing, support, signup, and login.
- JWT-based signup/login authentication.
- Cookie-based dashboard protection.
- Dashboard profile menu with logged-in user details and logout.
- Holdings and positions loaded from the backend.
- Demo holdings fallback when the database has no holdings yet.
- Buy order flow that saves orders through the backend.
- Chart.js holdings graph.
- Frontend component tests with React Testing Library.

## Tech Stack

### Frontend

- React
- React Router
- Axios
- React Toastify
- React Testing Library

### Dashboard

- React
- React Router
- Axios
- React Cookie
- Material UI icons
- Chart.js
- React Chart.js 2

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- cookie-parser
- CORS
- dotenv

## Project Structure

```text
Zerodha clone/
|-- backend/
|   |-- controllers/
|   |-- middlewares/
|   |-- model/
|   |-- routes/
|   |-- schemas/
|   |-- util/
|   |-- .env
|   |-- index.js
|   `-- package.json
|-- dashboard/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- data/
|   |   |-- api.js
|   |   `-- index.js
|   |-- .env
|   `-- package.json
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- landing_page/
|   |   |-- api.js
|   |   |-- index.css
|   |   `-- index.js
|   `-- package.json
`-- README.md
```

## Required Ports

Run each app on its own port:

| App | Port | URL |
| --- | --- | --- |
| Frontend | `3000` | `http://localhost:3000` |
| Dashboard | `3001` | `http://localhost:3001` |
| Backend | `3002` | `http://localhost:3002` |

The dashboard redirects unauthenticated users to:

```text
http://localhost:3000/login
```

## Environment Variables

Create `backend/.env`:

```env
MONGO_URL=your_mongodb_connection_string
TOKEN_KEY=your_jwt_secret_key
```

Create `dashboard/.env`:

```env
PORT=3001
REACT_APP_API_URL=http://localhost:3002
REACT_APP_LOGIN_URL=http://localhost:3000/login
```

Optional `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:3002
REACT_APP_DASHBOARD_URL=http://localhost:3001
```

Do not commit `.env` files. They can contain database credentials and JWT secrets.

## Installation

Install dependencies separately in all three folders.

### Backend

```powershell
cd backend
npm install
```

### Frontend

```powershell
cd frontend
npm install
```

### Dashboard

```powershell
cd dashboard
npm install
```

## Running the Project

Open three separate terminals.

### Terminal 1: Backend

```powershell
cd backend
npm start
```

Backend runs at:

```text
http://localhost:3002
```

### Terminal 2: Frontend

```powershell
cd frontend
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

### Terminal 3: Dashboard

```powershell
cd dashboard
npm start
```

Dashboard runs at:

```text
http://localhost:3001
```

## Authentication Flow

1. User opens `http://localhost:3000/signup`.
2. Signup form sends user details to `POST /signup`.
3. Backend hashes the password using `bcryptjs`.
4. Backend stores the user in MongoDB.
5. Backend creates a JWT token.
6. Token is stored in a browser cookie.
7. User is redirected to `http://localhost:3001`.
8. Dashboard checks the cookie with `POST /`.
9. If the token is valid, the dashboard opens.
10. If the token is missing or invalid, the user is redirected to login.

## Backend API Routes

### Auth Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/signup` | Create user account |
| `POST` | `/login` | Login user |
| `POST` | `/logout` | Clear auth cookie |
| `POST` | `/` | Verify JWT cookie |

### Dashboard Data Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/allHoldings` | Get holdings |
| `GET` | `/allPositions` | Get positions |
| `POST` | `/newOrder` | Save new buy order |

## Testing

Run frontend tests:

```powershell
cd frontend
$env:CI='true'; npm test -- --watchAll=false
```

Current test coverage includes:

- Navbar
- Footer
- Home page sections
- About page sections
- Pricing page sections
- Product page sections
- Support page sections
- Signup form
- Login form
- Hero component

Expected result:

```text
Test Suites: 2 passed
Tests: 27 passed
```

## Build Commands

### Frontend Build

```powershell
cd frontend
npm run build
```

### Dashboard Build

```powershell
cd dashboard
npm run build
```

### Backend Syntax Check

```powershell
cd backend
node --check index.js
```

## Common Issues

### `Something is already running on port 3000`

The frontend uses port `3000`. The dashboard must use port `3001`.

Make sure `dashboard/.env` contains:

```env
PORT=3001
```

### Dashboard redirects to login

This is expected if you are not logged in. Open:

```text
http://localhost:3000/login
```

Login first, then the app redirects to:

```text
http://localhost:3001
```

### `localhost refused to connect`

The app for that port is not running. Start the correct terminal:

- `3000` - frontend
- `3001` - dashboard
- `3002` - backend

### Holdings are empty

If MongoDB has no holdings saved, the dashboard displays demo holdings as fallback.

The backend route may still return:

```json
[]
```

That means the API is working, but the database collection is empty.

### MongoDB connection problems

Check:

- `backend/.env` exists.
- `MONGO_URL` is correct.
- Your MongoDB Atlas network access allows your IP.
- The database username/password are correct.

## Security Notes

- Never commit `backend/.env`.
- Rotate exposed MongoDB passwords immediately.
- Use a strong random `TOKEN_KEY`.
- In production, JWT cookies should be `httpOnly: true`, `secure: true`, and configured with proper same-site settings.

## Useful URLs

After starting all services:

```text
Frontend:  http://localhost:3000
Signup:    http://localhost:3000/signup
Login:     http://localhost:3000/login
Dashboard: http://localhost:3001
Backend:   http://localhost:3002
```

## Status

The project currently builds successfully:

- Frontend build passes.
- Dashboard build passes.
- Backend syntax check passes.
- Frontend tests pass.
