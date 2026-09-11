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
  Map,
  Route,
} from "lucide-react";

/* ==========================================================
   NEED TO KNOW CARD

   DATA SOURCE:
   Firestore
      Site
       └── operational
            └── needToKnow [array]

   RESPONSIBILITY:

   Firestore
   └── Controls operational DATA

   Frontend
   ├── Controls ICONS
   ├── Controls UI
   └── Controls formatting

   ICON RESOLUTION:
   - Primary source = semantic TITLE
   - Matching is NOT dependent on row/index
   - Matching tolerates capitalization and spacing
   - Matching supports title variations/extensions
   - Legacy ID fallback is used ONLY when title is missing
   - Unknown titles safely fall back to Info

   This makes the component reusable across
   multiple Site Cards / Firestore documents.
========================================================== */


/* ==========================================================
   SEMANTIC TITLE ICON RULES

   IMPORTANT:
   Do NOT use exact Firestore IDs for primary icon
   determination.

   The operational meaning of the TITLE determines
   the icon.

   Rules are evaluated from top to bottom.
========================================================== */

const NEED_TO_KNOW_ICON_RULES = Object.freeze([

  /* --------------------------------------------------------
     SKYSTATION / SITE LOCATION
  -------------------------------------------------------- */

  {
    match: (title) =>
      title === "skystation location" ||
      title === "skystation 4 location" ||
      title === "skystation-4 location" ||
      title.includes("skystation location"),
    icon: Map,
  },


  /* --------------------------------------------------------
     ALTERNATE LANDING
  -------------------------------------------------------- */

  {
    match: (title) =>
      title.includes("alternate landing point"),
    icon: PlaneLanding,
  },


  /* --------------------------------------------------------
     RELAY / COMMUNICATION
  -------------------------------------------------------- */

  {
    match: (title) =>
      title.includes("relay station"),
    icon: RadioTower,
  },


  /* --------------------------------------------------------
     CELL TOWER
  -------------------------------------------------------- */

  {
    match: (title) =>
      title.includes("cell tower"),
    icon: TowerControl,
  },


  /* --------------------------------------------------------
     ROAD / ACCESS
  -------------------------------------------------------- */

  {
    match: (title) =>
      title.includes("active road") ||
      title === "road" ||
      title.includes("road near skystation") ||
      title.includes("elevated road"),
    icon: Route,
  },


  /* --------------------------------------------------------
     HUMAN / CIVILIAN / VILLAGE
  -------------------------------------------------------- */

  {
    match: (title) =>
      title.includes("dense civilian area") ||
      title.includes("dense village area") ||
      title.includes("village area") ||
      title.includes("village community area") ||
      title.includes("community area"),
    icon: House,
  },


  /* --------------------------------------------------------
     TERRAIN
  -------------------------------------------------------- */

  {
    match: (title) =>
      title.includes("terrain elevation") ||
      title.includes("terrain variation") ||
      title.includes("sand dune") ||
      title.includes("sand dunes"),
    icon: Mountain,
  },


  /* --------------------------------------------------------
     SIGNAL
  -------------------------------------------------------- */

  {
    match: (title) =>
      title.includes("signal loss") ||
      title.includes("recurring signal loss"),
    icon: RadioTower,
  },


  /* --------------------------------------------------------
     EXTENDED FLIGHT DISTANCE
  -------------------------------------------------------- */

  {
    match: (title) =>
      title.includes("extended flight distance"),
    icon: PlaneTakeoff,
  },


  /* --------------------------------------------------------
     NIGHT OPERATIONS
  -------------------------------------------------------- */

  {
    match: (title) =>
      title.includes("night inspection") ||
      title.includes("recommended night inspection"),
    icon: Moon,
  },


  /* --------------------------------------------------------
     EXTREME END

     Route represents the operational path /
     route concept and is intentionally used for
     the "Dotted Line / Map" requirement.
  -------------------------------------------------------- */

  {
    match: (title) =>
      title.includes("extreme end"),
    icon: Route,
  },

]);


/* ==========================================================
   LEGACY FIRESTORE ID ICON MAPPING

   IMPORTANT:

   IDs are NOT used when a valid title exists.

   They are retained only for backward compatibility
   with older Firestore records where title may be
   missing.

   Existing legacy mapping is preserved.
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

   Converts variations such as:

   " SkyStation Location "
   "SKYSTATION LOCATION"
   "SkyStation   Location"

   into:

   "skystation location"

   Also normalizes hyphens and underscores so semantic
   matching remains reliable across Firestore records.
========================================================== */

function normalizeTitle(value) {

  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

}


/* ==========================================================
   GET NEED TO KNOW ICON

   PRIORITY:

   1. Semantic title rule
   2. Legacy Firestore ID ONLY when title is missing
   3. Generic Info

   IMPORTANT:
   Row position/index NEVER determines the icon.
========================================================== */

function getNeedToKnowIcon(item) {

  if (
    !item ||
    typeof item !== "object"
  ) {

    return Info;

  }


  /* ========================================================
     1. SEMANTIC TITLE RESOLUTION
  ======================================================== */

  const normalizedTitle =
    normalizeTitle(item.title);


  if (normalizedTitle) {

    const matchingRule =
      NEED_TO_KNOW_ICON_RULES.find(
        (rule) =>
          rule.match(normalizedTitle)
      );


    if (matchingRule) {

      return matchingRule.icon;

    }

  }


  /* ========================================================
     2. LEGACY FIRESTORE ID FALLBACK

     ONLY used when title is missing.

     This prevents an unknown/new title from accidentally
     receiving an incorrect icon merely because its ID
     happens to be "0", "1", "2", etc.
  ======================================================== */

  if (!normalizedTitle) {

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

  }


  /* ========================================================
     3. SAFE DEFAULT
  ======================================================== */

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

                 Icon is derived from the Firestore TITLE.

                 NEVER from:
                 - row index
                 - array position
                 - Firestore ID when title exists
              -------------------------------------------- */

              const Icon =
                getNeedToKnowIcon(item);


              /* --------------------------------------------
                 STABLE KEY

                 Prefer Firestore ID.

                 If unavailable, use title + index as
                 a rendering fallback.
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
                        TITLE + LOCATION
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