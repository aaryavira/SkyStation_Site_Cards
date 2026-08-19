# SkyStation Site Card

A Site intelligence resource library that consolidates site specific information such as critical flight, site, obstacle, dock, incident and stakeholder at glance. It enables Operators to take data-driven decisions before every mission for **Skylark Drones' SkyStation operations**.

The objective is simple:

> **Help an operator make safer, faster, and data-driven flight decisions before every mission.**

---

## 1. Why SkyStation Site Card Exists

Drone operations at renewable-energy sites are dependent highly on site-specific information.

Each deployment may have different:

* Flight parameters
* Block boundaries
* WTG locations
* Terrain conditions
* Signal-loss zones
* Flight obstacles
* No-Fly / Geo Zones
* Dock and aircraft conditions
* Operational activities
* Emergency contacts
* Historical incidents

A **new or existing operator** should not have to search through multiple documents, messages, maps, or systems to understand the operating environment.

**SkyStation Site Card brings this information together into one structured site reference.**

The information hierarchy is intentionally designed around the operator's decision-making process:

### 1. Can I Fly?

* Flight Parameters
* Need to Know
* Flight Obstacles
* Incident Information

### 2. Where Do I Fly?

* Site Map
* Block Boundaries
* WTG Locations
* Geo Zones
* No-Fly Zones
* Site-specific terrain and obstacles

### 3. What Infrastructure Am I Using?

* Dock Health
* Aircraft
* Battery
* Dock status

This allows the operator to understand the critical operating environment within approximately **20–30 seconds before a mission**.

---

## 2. Operational Objective

SkyStation Site Card is designed to support safer UAV operations by providing structured information that helps operators:

* Understand the site before flight
* Identify known hazards and obstacles
* Review site-specific flight parameters
* Recognize recurring operational issues
* Understand current site activities
* Review serious historical incidents
* Quickly locate site stakeholders and emergency contacts
* Reduce dependency on scattered operational information

---

## 3. Supported Site Information

Each Site Card can contain the following categories of information.

### Site Overview

* Total Capacity
* Total Blocks
* Total ICRs
* Total WTGs
* Site status
* Site specific operational information

### Flight Parameters

Parameters that define the site's operational flight envelope, such as:

* Flight altitude
* RTH altitude
* Other site-specific restrictions

### Need to Know

Critical information that an operator should understand before planning or executing a mission.

* Recurring operational constraints
* Terrain considerations
* Access limitations
* Signal behaviour
* Site specific procedures
* Other important operational information

### Flight Obstacles

Known physical or operational hazards, including:

* Cell towers
* Transmission lines
* Buildings
* Trees
* Roads
* Terrain / sand dunes
* Signal-loss areas
* Other site-specific obstacles

Obstacle information can include:

* Type
* Name
* Location
* Altitude / AGL
* Google Maps reference
* Additional operational context

### Dock Health

Operational condition of the SkyStation infrastructure, including:

* SkyStation status
* Aircraft status
* Battery information
* Battery cycle information
* Maintenance / health information

### Activities on Site

Current or recurring UAV activities performed at the site.

Examples:

* WTG inspection
* Solar inspection
* Construction monitoring
* Mapping
* Surveillance
* Other approved UAV operations

### Incident Log

Records of serious or operationally significant incidents.

Information may include:

* Date and time
* Incident details
* Location
* Action taken
* Flight/log file
* Additional references

Incident information is intended to improve operator awareness and prevent recurrence.

### Site Stakeholders

Operational and emergency contacts, including:

* Day Operator
* Night Operator
* Emergency Client Contact

---

## 5. Application Architecture

The application follows a frontend + backend + Firestore architecture.

```text
                         ┌──────────────────────┐
                         │      Firestore       │
                         │                      │
                         │ Site Information     │
                         │ Operational Data     │
                         │ Footer Data         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Data / Mapper      │
                         │                      │
                         │ Firestore → UI Model │
                         └──────────┬───────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────┐
│                    React Application                    │
│                                                         │
│  SiteHeader                                             │
│  Site Details                                           │
│  Flight Parameters                                      │
│  Need to Know                                           │
│  Flight Obstacles                                       │
│  Site Map                                               │
│  Dock Health                                             │
│  Activities                                              │
│  Incident Log                                            │
│  Site Stakeholders                                       │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
                  ┌───────────────────┐
                  │ PDF Generation    │
                  │                   │
                  │ Node / Puppeteer  │
                  └───────────────────┘
```

---

## 6. Technology Stack

### Frontend

* React 18
* Vite
* JSX
* CSS
* Lucide React

### Backend / Services

* Node.js
* Express
* CORS
* Puppeteer

### Database

* Firebase Firestore
* Firebase Authentication

### GIS / Mapping

* Leaflet ecosystem
* Leaflet Omnivore
* Site-specific maps and GIS-derived information

### PDF

The application supports PDF generation through the backend service using browser rendering.

---

## 7. Repository Structure

```text
SkyStation_Site_Cards/
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
├── server/
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── styles.css
├── vite.config.js
├── App.jsx
└── README.md
```

> The exact folder structure may evolve as the application is developed. Component responsibilities should remain separated between data handling, UI presentation, mapping, and backend services.

---

## 8. Getting Started

### Prerequisites

Install:

* Node.js
* npm
* Git

Verify:

```bash
node --version
npm --version
git --version
```

---

## 9. Clone the Repository

```bash
git clone https://github.com/aaryavira/SkyStation_Site_Cards.git
```

Move into the project:

```bash
cd SkyStation_Site_Cards
```

---

## 10. Install Dependencies

```bash
npm install
```

---

## 11. Environment Configuration

Create a local environment file based on the provided example:

```bash
copy .env.example .env
```

For macOS/Linux:

```bash
cp .env.example .env
```

Populate the required Firebase configuration values in `.env`.

### Important

Never commit:

```text
.env
```

or Firebase service-account credentials to GitHub.

Use:

```text
.env.example
```

for documenting required environment variables without exposing secrets.

---

## 12. Firebase Configuration

The application uses Firebase for authentication and Firestore-based site information.

The general data flow is:

```text
Firestore
    ↓
Site Data
    ↓
Mapper / Service Layer
    ↓
React Components
    ↓
SkyStation Site Card
```

Site-specific operational information should be stored in a structured and consistent Firestore schema.

Example conceptual structure:

```text
sites
└── <site>
    ├── header
    ├── operational
    │   ├── flightParameters
    │   ├── needToKnow
    │   ├── flightObstacles
    │   ├── dockHealth
    │   └── incidents
    │
    ├── map
    │
    ├── stakeholders
    │
    └── footer
        ├── keyMetrics
        └── activities
```

The exact schema should remain synchronized with the application's mapper layer.

---

## 13. Run the Development Application

Start the Vite development server:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

---

## 14. Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---
