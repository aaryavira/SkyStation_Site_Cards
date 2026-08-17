# Skylark Dock Ops

A Vite + React Dock Operations application with Firebase Authentication and Firestore support.

## Run it

1. Open this folder in your editor.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your Firebase Web App configuration values.
4. Run `npm run dev`.

Without Firebase credentials, the app opens a safe local demo workspace with the supplied sample sites. With credentials configured, Google Workspace sign-in is enabled and sites are read from the Firestore `sites` collection; if that collection is empty, the same sample data remains available.

## Firebase setup

In the Firebase console, create a Web app, enable **Google** in Authentication > Sign-in method, create a Firestore database, then add your local Vite URL (normally `http://localhost:5173`) under Authentication > Settings > Authorized domains if required.

The expected Firestore document shape is the same as the objects in `src/data/demoSites.js`. Create one document per site in the `sites` collection. The `id` field is supplied automatically from each Firestore document ID.

## Project structure

- `src/App.jsx` — application shell, authentication flow, and screens
- `src/lib/firebase.js` — Firebase initialization from environment variables
- `src/services/siteService.js` — Firestore site loading with demo fallback
- `src/data/demoSites.js` — demo data and expected Firestore data shape
- `src/assets/` — supplied Skylark brand artwork
