import {
  Box,
  PlaneLanding,
  RadioTower,
  TowerControl,
  House,
  Mountain,
  Moon,
  PlaneTakeoff,
  Info,
} from "lucide-react";


/* ==========================================================
   NEED TO KNOW CARD

   DATA SOURCE:
   Firestore
      Site
       └── operational
            └── needToKnow [array]

   Expected Firestore object:

   {
     id: "0",
     title: "SkyStation-4 Location",
     location: "SkyStation V3",
     description: "..."
   }

   IMPORTANT:
   - Firestore controls DATA.
   - Frontend controls ICONS / UI / formatting.
   - Icons are resolved semantically from the title.
   - Firestore ID is used only as a legacy fallback.
   - Row position/index NEVER determines the icon.
========================================================== */


/* ==========================================================
   SEMANTIC TITLE ICON MAPPING

   PRIMARY ICON SOURCE

   The title determines the operational meaning.

   This allows the same component to work across
   multiple sites without depending on row order.
========================================================== */

const NEED_TO_KNOW_TITLE_ICONS = Object.freeze({

  /* --------------------------------------------------------
     INFRASTRUCTURE
  -------------------------------------------------------- */

  "SkyStation-4 Location":
    Box,

  "Alternate Landing Point":
    PlaneLanding,

  "Relay Station":
    RadioTower,

  "Cell Tower":
    TowerControl,


  /* --------------------------------------------------------
     HUMAN / VILLAGE
  -------------------------------------------------------- */

  "Dense Village Area":
    House,

  "Village Area":
    House,

  "Village & Community Area":
    House,


  /* --------------------------------------------------------
     TERRAIN
  -------------------------------------------------------- */

  "Terrain Elevation Variation":
    Mountain,


  /* --------------------------------------------------------
     SIGNAL
  -------------------------------------------------------- */

  "Recurring Signal Loss":
    RadioTower,


  /* --------------------------------------------------------
     FLIGHT RANGE
  -------------------------------------------------------- */

  "Extended Flight Distance":
    PlaneTakeoff,

  "Extended Flight Distance Chunk 1":
    PlaneTakeoff,


  /* --------------------------------------------------------
     NIGHT OPERATIONS
  -------------------------------------------------------- */

  "Night Inspection":
    Moon,

  "Night Inspection Recommended":
    Moon,

  "Recommended Night Inspection":
    Moon,

  "Recommended Night Inspection Blocks 12, 13 & 14":
    Moon,

});


/* ==========================================================
   LEGACY FIRESTORE ID ICON MAPPING

   Used ONLY when:
   - title is missing
   - title is unknown

   Existing zero-based IDs are preserved.

   0 → House
   1 → Mountain
   2 → RadioTower
   3 → PlaneTakeoff
   4 → Moon
========================================================== */

const NEED_TO_KNOW_ID_ICONS = Object.freeze({

  "0": House,
  "1": Mountain,
  "2": RadioTower,
  "3": PlaneTakeoff,
  "4": Moon,

});


/* ==========================================================
   NORMALIZE TITLE

   Makes semantic matching more reliable.

   Example:

   " Dense Village Area "
        ↓
   "dense village area"
========================================================== */

function normalizeTitle(value) {

  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

}


/* ==========================================================
   NORMALIZED TITLE ICON MAP

   Prevents capitalization / spacing issues.
========================================================== */

const NORMALIZED_TITLE_ICONS =
  Object.freeze(

    Object.entries(
      NEED_TO_KNOW_TITLE_ICONS
    ).reduce(
      (map, [title, icon]) => {

        map[
          normalizeTitle(title)
        ] = icon;

        return map;

      },
      {}
    )

  );


/* ==========================================================
   GET NEED TO KNOW ICON

   PRIORITY:

   1. Semantic title
   2. Legacy Firestore ID
   3. Generic Info

   IMPORTANT:
   Row index is NEVER used.
========================================================== */

function getNeedToKnowIcon(item) {

  if (
    !item ||
    typeof item !== "object"
  ) {

    return Info;

  }


  /* --------------------------------------------------------
     1. TITLE-BASED RESOLUTION
  -------------------------------------------------------- */

  const normalizedTitle =
    normalizeTitle(item.title);


  if (
    normalizedTitle &&
    Object.prototype.hasOwnProperty.call(
      NORMALIZED_TITLE_ICONS,
      normalizedTitle
    )
  ) {

    return NORMALIZED_TITLE_ICONS[
      normalizedTitle
    ];

  }


  /* --------------------------------------------------------
     2. LEGACY FIRESTORE ID FALLBACK
  -------------------------------------------------------- */

  const id =
    item.id !== undefined &&
    item.id !== null
      ? String(item.id).trim()
      : "";


  if (
    Object.prototype.hasOwnProperty.call(
      NEED_TO_KNOW_ID_ICONS,
      id
    )
  ) {

    return NEED_TO_KNOW_ID_ICONS[id];

  }


  /* --------------------------------------------------------
     3. SAFE DEFAULT
  -------------------------------------------------------- */

  return Info;

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
   NEED TO KNOW CARD
========================================================== */

export default function NeedToKnowCard({

  needToKnow = [],

}) {


  /* ========================================================
     SAFE ARRAY

     Protects UI from malformed Firestore data.
  ======================================================== */

  const items =
    Array.isArray(needToKnow)

      ? needToKnow.filter(
          (item) =>
            item &&
            typeof item === "object"
        )

      : [];


  return (

    <section
      className="detail-card need-to-know-card"
    >


      {/* ====================================================
          HEADER
      ==================================================== */}

      <div
        className="detail-card-header"
      >

        <h3>

          <Info
            size={18}
            aria-hidden="true"
          />

          <span>
            Need to Know
          </span>

        </h3>

      </div>


      {/* ====================================================
          EMPTY STATE
      ==================================================== */}

      {items.length === 0 ? (

        <div
          className="need-to-know-empty"
        >

          <Info
            size={18}
            aria-hidden="true"
          />

          <span>
            No additional information
          </span>

        </div>

      ) : (


        /* ==================================================
           LIST
        ================================================== */

        <div
          className="need-to-know-list"
        >

          {items.map(
            (item, index) => {


              /* --------------------------------------------
                 SEMANTIC ICON RESOLUTION

                 IMPORTANT:
                 NEVER use index here.
              -------------------------------------------- */

              const Icon =
                getNeedToKnowIcon(item);


              /* --------------------------------------------
                 STABLE KEY

                 Prefer Firestore ID.

                 If ID is unavailable, construct a stable
                 fallback from title + index.
              -------------------------------------------- */

              const itemId =
                item.id !== undefined &&
                item.id !== null &&
                item.id !== ""

                  ? String(item.id)

                  : `need-to-know-${normalizeTitle(
                      item.title
                    )}-${index}`;


              return (

                <div
                  className="need-to-know-row"
                  key={itemId}
                >


                  {/* ========================================
                      LEFT SECTION
                  ======================================== */}

                  <div
                    className="need-to-know-left"
                  >


                    {/* ======================================
                        ICON
                    ====================================== */}

                    <div
                      className="need-to-know-icon"
                    >

                      <Icon
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                      />

                    </div>


                    {/* ======================================
                        TITLE + SUB TITLE
                    ====================================== */}

                    <div
                      className="need-to-know-meta"
                    >

                      <div
                        className="need-to-know-title"
                        title={formatText(
                          item.title
                        )}
                      >

                        {formatText(
                          item.title
                        )}

                      </div>


                      <div
                        className="need-to-know-location"
                        title={formatText(
                          item.location
                        )}
                      >

                        {formatText(
                          item.location
                        )}

                      </div>

                    </div>

                  </div>


                  {/* ========================================
                      DESCRIPTION
                  ======================================== */}

                  <div
                    className="need-to-know-description"
                  >

                    {formatText(
                      item.description
                    )}

                  </div>


                </div>

              );

            }
          )}

        </div>

      )}

    </section>

  );

}