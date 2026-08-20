import {
  AlertTriangle,
  Trees,
  Building2,
  TowerControl,
  Wind,
  RadioTower,
  Mountain,
  ExternalLink,
  Route,
} from "lucide-react";


/* ==========================================================
   FLIGHT OBSTACLES CARD

   Firestore:
   operational
      └── FlightObstacles

   IMPORTANT:
   - Firestore remains the source of truth.
   - Icon selection is derived ONLY from Type.
   - Type may now contain additional location/context
     information.

   Examples:
     "Signal Loss"
     "Signal Loss - Chunk 3 (Block 34)"

   The additional information does NOT affect icon selection.
========================================================== */

export default function ObstaclesCard({
  obstacles = {},
}) {

  /* ========================================================
     NORMALIZE OBSTACLES

     Supports both:
       Firestore Map
       Array
  ======================================================== */

  const obstacleList = Array.isArray(obstacles)
    ? obstacles
    : Object.values(obstacles || {});


  /* ========================================================
     ICON DECISION

     IMPORTANT:
     Icon selection is based ONLY on the primary obstacle
     keyword contained in Firestore "Type".

     This supports values such as:

       Signal Loss
       Signal Loss - Chunk 3 (Block 34)

       Cell Tower
       Cell Tower - Chunk 2

       Wind Turbine
       Wind Turbine - Block 15

     Additional location information is ignored.
  ======================================================== */

  const getIcon = (item = {}) => {

    const type = String(item.Type || "")
      .toLowerCase()
      .trim();


    /* ======================================================
       SIGNAL LOSS
    ====================================================== */

    if (
      type === "signal" ||
      type === "signal loss" ||
      type.startsWith("signal loss -") ||
      type.startsWith("signal loss ")
    ) {
      return RadioTower;
    }


    /* ======================================================
       CELL TOWER
    ====================================================== */

    if (
      type === "cell" ||
      type === "cell tower" ||
      type.startsWith("cell tower -") ||
      type.startsWith("cell tower ")
    ) {
      return TowerControl;
    }


    /* ======================================================
       TERRAIN / SAND DUNE
    ====================================================== */

    if (
      type === "terrain" ||
      type === "sand dunes" ||
      type === "sand dune" ||
      type.startsWith("terrain -") ||
      type.startsWith("sand dune -") ||
      type.startsWith("sand dunes -")
    ) {
      return Mountain;
    }


    /* ======================================================
       ROAD
    ====================================================== */

    if (
      type === "road" ||
      type === "elevated road" ||
      type.startsWith("road -") ||
      type.startsWith("elevated road -")
    ) {
      return Route;
    }


    /* ======================================================
       TREES
    ====================================================== */

    if (
      type === "tree" ||
      type === "trees" ||
      type.startsWith("tree -") ||
      type.startsWith("trees -")
    ) {
      return Trees;
    }


    /* ======================================================
       BUILDING
    ====================================================== */

    if (
      type === "building" ||
      type.startsWith("building -")
    ) {
      return Building2;
    }


    /* ======================================================
       WIND
    ====================================================== */

    if (
      type === "wind" ||
      type === "wind turbine" ||
      type.startsWith("wind turbine -") ||
      type.startsWith("wind turbine ")
    ) {
      return Wind;
    }


    /* ======================================================
       TOWER
    ====================================================== */

    if (
      type === "tower" ||
      type.startsWith("tower -") ||
      type.startsWith("tower ")
    ) {
      return TowerControl;
    }


    /* ======================================================
       POWER LINE / TRANSMISSION
    ====================================================== */

    if (
      type === "power line" ||
      type === "transmission" ||
      type.startsWith("power line -") ||
      type.startsWith("transmission -")
    ) {
      return RadioTower;
    }


    /* ======================================================
       FALLBACK
    ====================================================== */

    return AlertTriangle;
  };


  /* ========================================================
     RENDER
  ======================================================== */

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

        <div className="parameter-table">

          {obstacleList.map((item, index) => {

            const Icon = getIcon(item);

            return (

              <div
                key={index}
                className="parameter-row"
              >

                {/* ==========================================
                    LEFT SIDE
                ========================================== */}

                <div className="parameter-left">

                  <div className="parameter-icon">

                    <Icon size={18} />

                  </div>


                  <div>

                    <small
                      style={{
                        display: "block",
                        color: "var(--text-secondary)",
                        fontSize: "11px",
                        marginBottom: "2px",
                      }}
                    >

                      {item.Type}

                    </small>


                    <strong>
                      {item.Name}
                    </strong>

                  </div>

                </div>


                {/* ==========================================
                    LOCATION / EXTERNAL LINK
                ========================================== */}

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dock-link"
                >

                  {item.title}

                  <ExternalLink
                    size={13}
                  />

                </a>

              </div>

            );

          })}

        </div>

      )}

    </section>

  );
}