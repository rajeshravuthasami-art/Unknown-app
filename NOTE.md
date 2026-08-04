# Full-Stack Starter (Website + Mobile App + Backend + Database)

One backend and one database, shared by both a website and a mobile app.

```
fullstack-starter/
├── backend/       → Node.js + Express API (connects to PostgreSQL)
├── website/       → React website (talks to backend via API)
├── mobile-app/    → React Native (Expo) app (talks to same backend/API)
└── database/      → schema.sql to set up your PostgreSQL table
```

## How the pieces connect

```
Website (React)  ─┐
                   ├──►  Backend API (Node/Express)  ──►  PostgreSQL Database
Mobile App (RN)  ─┘
```

Both the website and the app call the SAME backend API. The backend is the only
thing that talks directly to the database. This is standard practice — never
let a website or app connect straight to a database.

## Setup order

### 1. Database
- Install PostgreSQL (or use a free hosted one like Supabase/Neon/Railway)
- Create a database, then run:
  ```
  psql -U postgres -d myapp_db -f database/schema.sql
  ```

### 2. Backend
```
cd backend
npm install
cp .env.example .env      # then fill in your real DB credentials
npm run dev
```
Runs on `http://localhost:5000`. Test it by visiting that URL in a browser —
you should see `{"message":"API is running"}`.

### 3. Website
```
cd website
npm install
npm start
```
Opens at `http://localhost:3000`. It calls the backend automatically.

### 4. Mobile App
```
cd mobile-app
npm install
npm start
```
This opens Expo. Scan the QR code with the **Expo Go** app on your phone.
⚠️ Before running, open `App.js` and replace `YOUR_LOCAL_IP` with your
computer's actual local IP (find it with `ipconfig` on Windows or
`ifconfig`/`ipconfig getifaddr en0` on Mac) — phones can't reach "localhost"
on your computer.

## Deploying it for real (making it public)

| Part | Where to deploy |
|---|---|
| Backend | Railway, Render, or AWS |
| Database | Same host's managed PostgreSQL, or Supabase/Neon |
| Website | Vercel or Netlify |
| Mobile App | `eas build` (Expo) → submit to App Store / Play Store |

Once deployed, update `API_URL` in `website/src/App.js` and
`mobile-app/App.js` to point to your live backend URL instead of localhost.

## Avoiding errors
- Never commit your real `.env` file (it has passwords) — only `.env.example`
- Test the backend alone first (with a tool like Postman) before connecting
  the frontend, so you know errors aren't coming from the API
- Keep frontend and backend in separate terminals while developing — you need
  both running at once
