import {
  House,
  Mountain,
  RadioTower,
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
     id: "1",
     location: "Near Block 10",
     title: "Village Area",
     description: "..."
   }

   IMPORTANT:
   - Firestore controls DATA.
   - Frontend controls ICONS / UI / formatting.
   - This component does NOT modify Site Map or parent layout.
========================================================== */


/* ==========================================================
   ICON MAPPING

   Icons are intentionally controlled by frontend.

   ID-based mapping is used as the primary mapping so that
   changing a title in Firestore does not accidentally change
   the visual meaning of an existing operational item.
========================================================== */

const NEED_TO_KNOW_ICONS = {
  "1": House,
  "2": Mountain,
  "3": RadioTower,
  "4": PlaneTakeoff,
};


/* ==========================================================
   TITLE FALLBACK MAPPING

   Used if an item does not have a valid ID.
========================================================== */

const NEED_TO_KNOW_TITLE_ICONS = {
  "Village Area": House,
  "Village & Community Area": House,

  "Terrain Elevation Variation": Mountain,

  "Recurring Signal Loss": RadioTower,

  "Extended Flight Distance": PlaneTakeoff,
};


/* ==========================================================
   GET ICON

   Priority:
   1. ID
   2. Title
   3. Generic Info icon
========================================================== */

function getNeedToKnowIcon(item) {

  if (!item || typeof item !== "object") {
    return Info;
  }

  const id =
    item.id !== undefined &&
    item.id !== null
      ? String(item.id)
      : "";

  if (NEED_TO_KNOW_ICONS[id]) {
    return NEED_TO_KNOW_ICONS[id];
  }

  const title =
    typeof item.title === "string"
      ? item.title.trim()
      : "";

  return (
    NEED_TO_KNOW_TITLE_ICONS[title] ||
    Info
  );
}


/* ==========================================================
   SAFE TEXT FORMATTER
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

     Prevents UI failure if Firestore temporarily returns
     undefined, null, or malformed data.
  ======================================================== */

  const items = Array.isArray(needToKnow)
    ? needToKnow.filter(
        (item) =>
          item &&
          typeof item === "object"
      )
    : [];


  return (
    <section className="detail-card need-to-know-card">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="detail-card-header">

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

        <div className="need-to-know-empty">

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

        <div className="need-to-know-list">

          {items.map(
            (item, index) => {

              const Icon =
                getNeedToKnowIcon(item);

              const itemId =
                item.id !== undefined &&
                item.id !== null &&
                item.id !== ""
                  ? String(item.id)
                  : `need-to-know-${index}`;


              return (
                <div
                  className="need-to-know-row"
                  key={itemId}
                >

                  {/* ========================================
                      LEFT SECTION
                  ======================================== */}

                  <div className="need-to-know-left">

                    <div className="need-to-know-icon">

                      <Icon
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                      />

                    </div>


                    <div className="need-to-know-meta">

                      <div className="need-to-know-title">

                        {formatText(
                          item.title
                        )}

                      </div>


                      <div className="need-to-know-location">

                        {formatText(
                          item.location
                        )}

                      </div>

                    </div>

                  </div>


                  {/* ========================================
                      DESCRIPTION
                  ======================================== */}

                  <div className="need-to-know-description">

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