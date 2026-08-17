# Skylark SkyStation Operation Site Card

A web / document based SkyStation Operations platform developed for managing and monitoring **SkyStation operations** across wind, solar, and renewable energy sites.

The application provides a centralized interface for site information, dock health, flight parameters, operational status, infrastructure, flight obstacles, and other critical information required by Drone Pilots and Dock Operations teams.

---

## 🚀 Tech Stack

- **Frontend:** React + Vite
- **Backend / Services:** Node.js
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **Hosting / Repository:** GitHub
- **UI:** HTML, CSS, JavaScript / JSX
- **UAV Ecosystem:** DJI Dock / SkyStation

---

## 📌 Key Features

### Site Management
- Centralized site information
- Site-wise operational overview
- Site status and key operational metrics
- Site-specific infrastructure information

### Dock Operations
- Dock operational status
- Aircraft and battery information
- Dock health monitoring
- Flight parameters
- Flight obstacles and operational restrictions

### GIS & Site Intelligence
- Site maps
- Block boundaries
- WTG locations
- No-Fly Zones
- Geo Zones
- Operational obstacles
- Site-specific flight information

### Firebase Integration
- Firebase Authentication
- Firestore-based site data
- Dynamic site information
- Real-time database integration
- Structured site-wise data management

---

## 🏗️ Project Structure

```text
skylark-dock-ops/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── lib/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
