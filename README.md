# Educational Blog Platform (MERN)

An Educational Blog Platform built using MongoDB, Express, React, and Node.js.

## Local setup

1) Backend env

- Copy [backend/.env.example](backend/.env.example) to `backend/.env`
- Set at least: `MONGO_URI`, `JWT_SECRET`

2) Install dependencies

- From repo root: `npm run install:all`

3) Run

- Backend: `npm --prefix backend start`
- Frontend (dev): `npm --prefix frontend start`

Frontend dev server calls `http://localhost:5000` by default.

## Deployment options

### Option A: Single-service deploy on Render (recommended)

This repo is configured so the Express backend serves the React build in production.

- Render Web Service settings:
	- Build Command: `npm run build`
	- Start Command: `npm start`
- Environment variables (Render):
	- `MONGO_URI` (MongoDB Atlas connection string)
	- `JWT_SECRET`
	- `CORS_ORIGIN` (set to your Render URL, or `*` while testing)
	- `NODE_ENV=production`

### Option B: Split deploy (Frontend on Vercel/Netlify + Backend on Render)

- Backend (Render): deploy the `backend` folder
	- Build: `npm install`
	- Start: `npm start`
	- Env: `MONGO_URI`, `JWT_SECRET`, `CORS_ORIGIN=https://<your-frontend-domain>`

- Frontend (Vercel/Netlify): deploy the `frontend` folder
	- Set env: `REACT_APP_API_URL=https://<your-backend-domain>/api`
