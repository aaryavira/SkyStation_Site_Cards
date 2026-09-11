import {
  AlertTriangle,
  Trees,
  Building2,
  TowerControl,
  Wind,
  RadioTower,
  Mountain,
  Cable,
  Route,
  ExternalLink,
} from "lucide-react";


/* ==========================================================
   FLIGHT OBSTACLES CARD

   DATA SOURCE:
   Firestore

      Site
       └── operational
            └── FlightObstacles [map / array]

   Expected Firestore object:

   {
     Name: "Cable corridor near end of Block 19 for 10m",
     Type: "Cable Corridor",
     url: "https://maps.app.goo.gl/..."
   }

   IMPORTANT:
   - Firestore controls DATA.
   - Frontend controls ICONS / UI / formatting.
   - Icons are resolved ONLY from Firestore "Type".
   - Name is NEVER used for icon selection.
   - Row position/index NEVER determines the icon.
   - Unknown types safely use AlertTriangle.
========================================================== */


/* ==========================================================
   NORMALIZE OBSTACLE TYPE

   Handles:
   - Uppercase / lowercase differences
   - Leading / trailing spaces
   - Multiple spaces

   Example:

   " Cable Corridor "
          ↓
   "cable corridor"
========================================================== */

function normalizeObstacleType(value) {

  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

}


/* ==========================================================
   OBSTACLE TYPE → ICON MAPPING

   PRIMARY ICON SOURCE:
   Firestore "Type"

   IMPORTANT:
   Existing mappings are preserved to avoid affecting
   previously configured Site Cards such as:

   Adani Green Baiya - Site Card

   Only the explicitly required new mapping has been added:

   "Cable Corridor" → Cable
========================================================== */

const OBSTACLE_TYPE_ICONS = Object.freeze({

  /* --------------------------------------------------------
     CABLE / POWER INFRASTRUCTURE
  -------------------------------------------------------- */

  "cable corridor":
    Cable,

  "cable":
    Cable,

  "power line":
    RadioTower,

  "transmission":
    RadioTower,


  /* --------------------------------------------------------
     SIGNAL
  -------------------------------------------------------- */

  "signal loss":
    RadioTower,

  "signal":
    RadioTower,


  /* --------------------------------------------------------
     CELL TOWER
  -------------------------------------------------------- */

  "cell tower":
    TowerControl,

  "cell":
    TowerControl,


  /* --------------------------------------------------------
     TERRAIN
  -------------------------------------------------------- */

  "terrain":
    Mountain,

  "sand dunes":
    Mountain,

  "sand dune":
    Mountain,


  /* --------------------------------------------------------
     ROAD
  -------------------------------------------------------- */

  "road":
    Route,

  "elevated road":
    Route,


  /* --------------------------------------------------------
     VEGETATION
  -------------------------------------------------------- */

  "tree":
    Trees,

  "trees":
    Trees,


  /* --------------------------------------------------------
     BUILDING
  -------------------------------------------------------- */

  "building":
    Building2,


  /* --------------------------------------------------------
     WIND
  -------------------------------------------------------- */

  "wind":
    Wind,

  "wind turbine":
    Wind,


  /* --------------------------------------------------------
     TOWER
  -------------------------------------------------------- */

  "tower":
    TowerControl,

});


/* ==========================================================
   GET OBSTACLE ICON

   PRIORITY:

   1. Firestore Type
   2. Safe generic AlertTriangle

   IMPORTANT:
   - Name is NOT checked.
   - Index is NOT checked.
   - No site-specific logic is used.

   Therefore the same component works across every
   Site Card in the system.
========================================================== */

function getObstacleIcon(item) {

  if (
    !item ||
    typeof item !== "object"
  ) {

    return AlertTriangle;

  }


  const normalizedType =
    normalizeObstacleType(item.Type);


  if (
    normalizedType &&
    Object.prototype.hasOwnProperty.call(
      OBSTACLE_TYPE_ICONS,
      normalizedType
    )
  ) {

    return OBSTACLE_TYPE_ICONS[
      normalizedType
    ];

  }


  /* --------------------------------------------------------
     SAFE DEFAULT

     Any new Firestore Type that has not yet been mapped
     will still render correctly without breaking the card.
  -------------------------------------------------------- */

  return AlertTriangle;

}


/* ==========================================================
   SAFE TEXT FORMATTER

   Prevents accidental rendering of:
   - objects
   - arrays
   - null
   - undefined
========================================================== */

function formatText(value) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return "--";

  }


  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {

    return String(value);

  }


  return "--";

}


/* ==========================================================
   FLIGHT OBSTACLES CARD
========================================================== */

export default function ObstaclesCard({

  obstacles = {},

}) {


  /* ========================================================
     NORMALIZE FIRESTORE DATA

     Supports both:

     1. Firestore Map
     2. Array

     This keeps compatibility with existing Site Cards.
  ======================================================== */

  const obstacleList =

    Array.isArray(obstacles)

      ? obstacles

      : Object.values(
          obstacles || {}
        );


  return (

    <section className="detail-card">


      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="detail-card-header">

        <h3
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >

          <AlertTriangle
            size={18}
            color="var(--accent)"
          />

          Flight Obstacles

        </h3>

      </div>


      {/* ====================================================
          EMPTY STATE
      ==================================================== */}

      {obstacleList.length === 0 ? (

        <p className="empty-copy">

          No Flight Obstacles Available

        </p>

      ) : (


        /* ==================================================
           OBSTACLE LIST
        ================================================== */

        <div className="parameter-table">

          {obstacleList.map(
            (item, index) => {


              /* --------------------------------------------
                 DYNAMIC ICON

                 Icon is resolved ONLY from:

                 Firestore → Type
              -------------------------------------------- */

              const Icon =
                getObstacleIcon(item);


              /* --------------------------------------------
                 STABLE KEY

                 Prefer Firestore Name + Type.

                 Index is only used as a final fallback
                 for React rendering and NEVER for icon
                 selection.
              -------------------------------------------- */

              const obstacleKey =

                `${formatText(item?.Type)}-${formatText(
                  item?.Name
                )}-${index}`;


              return (

                <div
                  key={obstacleKey}
                  className="parameter-row"
                >


                  {/* ======================================
                      LEFT SECTION
                  ====================================== */}

                  <div className="parameter-left">


                    {/* ====================================
                        DYNAMIC ICON
                    ==================================== */}

                    <div className="parameter-icon">

                      <Icon
                        size={18}
                        aria-hidden="true"
                      />

                    </div>


                    {/* ====================================
                        TYPE + NAME
                    ==================================== */}

                    <div>

                      <small
                        style={{
                          display: "block",
                          color:
                            "var(--text-secondary)",
                          fontSize: "11px",
                          marginBottom: "2px",
                        }}
                      >

                        {formatText(
                          item?.Type
                        )}

                      </small>


                      <strong>

                        {formatText(
                          item?.Name
                        )}

                      </strong>

                    </div>

                  </div>


                  {/* ======================================
                      GOOGLE MAP / EXTERNAL LINK
                  ====================================== */}

                  {item?.url ? (

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dock-link"
                    >
                      {item?.title || ""}
                      <ExternalLink size={13} />
                    </a>

                  ) : (

                    <span
                      className="dock-link"
                      aria-hidden="true"
                    >

                      <ExternalLink
                        size={13}
                      />

                    </span>

                  )}

                </div>

              );

            }
          )}

        </div>

      )}

    </section>

  );

}