# FitMonolyth Frontend

React + Vite frontend for the FitMonolyth Spring Boot backend.

## Setup

```bash
npm install
npm run dev
```

The dev server proxies `/api` requests to `http://localhost:8080` (your Spring Boot backend).

## Features

- **Auth** — Login & Register with JWT (stored in localStorage)
- **Dashboard** — Overview stats: total activities, calories, time + recent workouts
- **Activities** — Log workouts (type, duration, calories, start time) and view history
- **Insights** — View AI recommendations per user (suggestions, improvements, safety tips)

## API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/login` | Login |
| POST | `/api/users/register` | Register |
| GET | `/api/activities` | Get user activities (header: `X-User-ID`) |
| POST | `/api/activities` | Log new activity |
| GET | `/api/recommendation/user/:userId` | Get recommendations by user |

## Tech Stack

- React 18 + React Router 6
- Vite 5 (with proxy to backend)
- No CSS frameworks — pure CSS variables

## Notes

- JWT is sent as `Authorization: Bearer <token>` on all authenticated requests
- The `X-User-ID` header is used for activity fetching as per your backend
- Update `vite.config.js` if your backend runs on a different port
