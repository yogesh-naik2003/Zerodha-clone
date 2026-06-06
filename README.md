# Zerodha Clone

A full-stack Zerodha-style trading application built with React, Express, MongoDB, and JWT authentication.

The project is split into three apps:

- `frontend` - public landing website with signup and login.
- `dashboard` - authenticated trading dashboard with watchlist, orders, holdings, positions, funds, apps, profile menu, and charts.
- `backend` - Express API with MongoDB, JWT auth, protected dashboard routes, and order/portfolio persistence.

Live URLs:

- Frontend: `https://yogesh-naik2003.github.io/Zerodha-clone/`
- Login: `https://yogesh-naik2003.github.io/Zerodha-clone/#/login`
- Dashboard: `https://yogesh-naik2003.github.io/Zerodha-clone/dashboard/`
- Backend: `https://zerodha-clone-backend-y5ud.onrender.com`

## Features

- Zerodha-style landing pages for home, about, products, pricing, and support.
- Signup and login with hashed passwords.
- JWT authentication using secure cookies and bearer tokens.
- Protected dashboard API routes.
- User-specific orders, holdings, and positions.
- Buy/Sell order flow with backend validation.
- Buy orders create/update holdings and positions.
- Sell orders reduce holdings and positions.
- Orders page shows saved orders from MongoDB.
- Holdings page shows user holdings, calculated investment, current value, and P&L.
- Positions page shows user positions from MongoDB.
- Dashboard session handling for expired/invalid tokens.
- Loading, error, empty, and retry states.
- Chart.js holdings graph.
- Frontend, dashboard, and backend tests.

## Tech Stack

Frontend:

- React
- React Router
- Axios
- React Toastify
- React Testing Library

Dashboard:

- React
- React Router
- Axios
- Material UI icons
- Chart.js
- React Chart.js 2
- React Testing Library

Backend:

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- cookie-parser
- CORS
- dotenv
- Node test runner

## Project Structure

```text
Zerodha clone/
|-- backend/
|   |-- controllers/
|   |-- middlewares/
|   |-- model/
|   |-- routes/
|   |-- schemas/
|   |-- test/
|   |-- util/
|   |-- utils/
|   |-- .env.example
|   |-- index.js
|   `-- package.json
|-- dashboard/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- data/
|   |   |-- api.js
|   |   `-- index.js
|   |-- static/
|   |-- index.html
|   `-- package.json
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- landing_page/
|   |   |-- api.js
|   |   `-- index.js
|   `-- package.json
`-- README.md
```

## Local Ports

| App | Port | URL |
| --- | --- | --- |
| Frontend | `3000` | `http://localhost:3000` |
| Dashboard | `3001` | `http://localhost:3001` |
| Backend | `3002` | `http://localhost:3002` |

## Environment Variables

Create `backend/.env` from `backend/.env.example`:

```env
MONGO_URL=your_mongodb_connection_string
TOKEN_KEY=your_long_random_jwt_secret
FRONTEND_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:3001
PORT=3002
```

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:3002
REACT_APP_DASHBOARD_URL=http://localhost:3001
```

Create `dashboard/.env`:

```env
PORT=3001
REACT_APP_API_URL=http://localhost:3002
REACT_APP_LOGIN_URL=http://localhost:3000/login
```

Do not commit real `.env` files. They contain database credentials and JWT secrets.

Generate a strong local JWT secret:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Installation

Install dependencies separately:

```powershell
cd backend
npm install
```

```powershell
cd frontend
npm install
```

```powershell
cd dashboard
npm install
```

## Running Locally

Open three terminals.

Backend:

```powershell
cd backend
npm start
```

Frontend:

```powershell
cd frontend
npm start
```

Dashboard:

```powershell
cd dashboard
npm start
```

Local flow:

1. Open `http://localhost:3000/signup`.
2. Create an account or log in from `http://localhost:3000/login`.
3. After authentication, the app redirects to `http://localhost:3001`.

## Authentication Flow

1. Signup sends user details to `POST /signup`.
2. Backend hashes the password with `bcryptjs`.
3. Backend stores the user in MongoDB.
4. Backend creates a JWT token.
5. Token is returned in the response and also set as a cookie.
6. Frontend stores the token in `localStorage`.
7. Dashboard sends the token as `Authorization: Bearer <token>`.
8. Backend verifies the token before returning dashboard data.
9. If the token is missing, invalid, or expired, dashboard clears it and redirects to login.

## Backend API

Auth routes:

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/signup` | Create a user account |
| `POST` | `/login` | Log in and return a token |
| `POST` | `/logout` | Clear the auth cookie |
| `POST` | `/` | Verify the current token/session |
| `GET` | `/health` | Backend health check |

Protected dashboard routes:

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/allHoldings` | Get logged-in user's holdings |
| `GET` | `/allPositions` | Get logged-in user's positions |
| `GET` | `/allOrders` | Get logged-in user's orders |
| `POST` | `/newOrder` | Place a Buy/Sell order |

`/newOrder` validates:

- `name` is required.
- `qty` must be greater than `0`.
- `price` must be greater than `0`.
- `mode` must be `BUY` or `SELL`.

Buy behavior:

- Creates an order.
- Creates or updates the user's holding.
- Creates or updates the user's position.
- Recalculates average price.

Sell behavior:

- Requires enough quantity.
- Creates an order.
- Reduces holding quantity.
- Reduces position quantity.
- Deletes holding/position when quantity becomes `0`.

## Testing

Backend:

```powershell
cd backend
npm test
```

Dashboard:

```powershell
cd dashboard
$env:CI='true'; npm test -- --watchAll=false
```

Frontend:

```powershell
cd frontend
$env:CI='true'; npm test -- --watchAll=false
```

Current verified result:

- Backend: `5` tests passing.
- Dashboard: `3` tests passing.
- Frontend: `29` tests passing.

## Build Commands

Frontend:

```powershell
cd frontend
npm run build
```

Dashboard:

```powershell
cd dashboard
npm run build
```

Backend syntax check:

```powershell
node --check backend/index.js
```

## Deployment

Current deployment:

- Frontend and dashboard are served with GitHub Pages.
- Backend is served with Render.
- Database is hosted on MongoDB Atlas.

Render backend environment variables:

```env
MONGO_URL=your_mongodb_connection_string
TOKEN_KEY=your_long_random_jwt_secret
FRONTEND_URL=https://yogesh-naik2003.github.io
DASHBOARD_URL=https://yogesh-naik2003.github.io
```

GitHub Pages dashboard build uses:

```powershell
cd dashboard
$env:PUBLIC_URL='/Zerodha-clone/dashboard'
$env:REACT_APP_API_URL='https://zerodha-clone-backend-y5ud.onrender.com'
$env:REACT_APP_LOGIN_URL='https://yogesh-naik2003.github.io/Zerodha-clone/#/login'
npm run build
Copy-Item -Path build\* -Destination . -Recurse -Force
```

Frontend GitHub Pages build uses:

```powershell
cd frontend
$env:PUBLIC_URL='/Zerodha-clone'
$env:REACT_APP_API_URL='https://zerodha-clone-backend-y5ud.onrender.com'
$env:REACT_APP_DASHBOARD_URL='https://yogesh-naik2003.github.io/Zerodha-clone/dashboard/#/'
npm run build
```

## Common Issues

### Dashboard redirects to login

You are not logged in or the token expired. Log in again:

```text
http://localhost:3000/login
```

Production login:

```text
https://yogesh-naik2003.github.io/Zerodha-clone/#/login
```

### GitHub Pages route shows 404

Use hash routes in production:

```text
https://yogesh-naik2003.github.io/Zerodha-clone/#/login
```

Do not use:

```text
https://yogesh-naik2003.github.io/Zerodha-clone/login
```

### Positions are empty

Positions are user-specific. New positions are created when the logged-in user places a new Buy order from the dashboard watchlist.

Old orders created before the positions feature was added will not automatically create positions.

### Holdings are empty

Holdings are user-specific. Buy a stock from the dashboard watchlist to create or update holdings.

### `401` from dashboard API

The backend route is protected. Log in again so the dashboard has a valid token.

### `localhost refused to connect`

Start the correct service:

- `3000` - frontend
- `3001` - dashboard
- `3002` - backend

### MongoDB connection problems

Check:

- `backend/.env` exists.
- `MONGO_URL` is correct.
- MongoDB Atlas Network Access allows your IP.
- Database username and password are correct.
- Render has the same updated environment variables.

## Security Notes

- Never commit real `.env` files.
- Rotate MongoDB passwords if they are exposed.
- Rotate `TOKEN_KEY` if it is exposed.
- Store production secrets only in Render environment variables.
- Use long random JWT secrets.
- Protected routes require a valid JWT.
- Dashboard data is scoped by `userId`.

## Status

Verified after the latest update:

- Backend tests pass.
- Dashboard tests pass.
- Frontend tests pass.
- Dashboard production build passes.
- Frontend production build passes.
- Render backend health endpoint works.
- GitHub Pages dashboard serves the latest built bundle.
