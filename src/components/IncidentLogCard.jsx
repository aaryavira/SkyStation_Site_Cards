import {
  ExternalLink,
  FileText,
  Siren,
} from "lucide-react";

/* ==========================================================
   INCIDENT LOG CARD

   Data Source:
   Firestore
   Site
     └── <Site>
         └── operational
             └── incidents [array]

   Expected incident object:
   {
     id: "1",
     dateTime: Firestore Timestamp,
     location: "Near block 51",
     incidentDetails: "...",
     actionTaken: "...",
     logFileLink: "https://..."
   }

   IMPORTANT:
   - Firestore controls DATA.
   - Frontend controls UI / icons / formatting.
   - Firestore Timestamp is converted before rendering.
========================================================== */


/* ==========================================================
   DATE & TIME FORMATTER

   Supports:
   1. Firebase Timestamp
   2. Firestore REST timestamp object
   3. JavaScript Date
   4. String / number fallback
========================================================== */

function formatDateTime(value) {

  if (!value) {
    return "--";
  }


  /* --------------------------------------------------------
     Firebase Timestamp
  -------------------------------------------------------- */

  if (
    typeof value === "object" &&
    typeof value.toDate === "function"
  ) {

    const date = value.toDate();

    if (Number.isNaN(date.getTime())) {
      return "--";
    }

    return date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }
    );
  }


  /* --------------------------------------------------------
     Firestore Timestamp serialized as:

     {
       seconds,
       nanoseconds
     }
  -------------------------------------------------------- */

  if (
    typeof value === "object" &&
    typeof value.seconds === "number"
  ) {

    const date = new Date(
      value.seconds * 1000
    );

    if (Number.isNaN(date.getTime())) {
      return "--";
    }

    return date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }
    );
  }


  /* --------------------------------------------------------
     JavaScript Date
  -------------------------------------------------------- */

  if (value instanceof Date) {

    if (Number.isNaN(value.getTime())) {
      return "--";
    }

    return value.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }
    );
  }


  /* --------------------------------------------------------
     String / Number fallback
  -------------------------------------------------------- */

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {

    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {

      return date.toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }
      );

    }

    return String(value);
  }


  return "--";
}


/* ==========================================================
   SAFE TEXT FORMATTER

   Prevents accidental rendering of objects.
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
   INCIDENT LOG CARD
========================================================== */

export default function IncidentLogCard({
  incidents = [],
}) {


  /* ========================================================
     SAFE INCIDENT ARRAY

     Protects UI if Firestore temporarily returns:
     undefined / null / invalid data.
  ======================================================== */

  const items = Array.isArray(incidents)
    ? incidents.filter(
        (incident) =>
          incident &&
          typeof incident === "object"
      )
    : [];


  return (

    <section
      className="detail-card incident-log-card"
    >


      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="detail-card-header">

        <h3>

          <Siren
            size={18}
            aria-hidden="true"
          />

          <span>
            Incident Log
          </span>

        </h3>

      </div>


      {/* ====================================================
          EMPTY STATE
      ==================================================== */}

      {items.length === 0 ? (

        <div className="incident-log-empty">

          <FileText
            size={18}
            aria-hidden="true"
          />

          <span>
            No incidents recorded
          </span>

        </div>

      ) : (

        /* ==================================================
           TABLE
        ================================================== */

        <div className="incident-table-wrapper">

          <table className="incident-table">


            {/* ==============================================
                TABLE HEADER
            ============================================== */}

            <thead>

              <tr>

                <th>
                  Date &amp; Time
                </th>

                <th>
                  Location
                </th>

                <th>
                  Incident Details
                </th>

                <th>
                  Action Taken
                </th>

                <th>
                  Log File
                </th>

              </tr>

            </thead>


            {/* ==============================================
                TABLE BODY
            ============================================== */}

            <tbody>

              {items.map(
                (incident, index) => {

                  const incidentId =
                    incident.id !==
                      undefined &&
                    incident.id !== null &&
                    incident.id !== ""
                      ? String(incident.id)
                      : `incident-${index}`;


                  return (

                    <tr
                      key={incidentId}
                    >


                      {/* ==================================
                          DATE & TIME
                      ================================== */}

                      <td className="incident-date-cell">

                        {formatDateTime(
                          incident.dateTime
                        )}

                      </td>


                      {/* ==================================
                          LOCATION
                      ================================== */}

                      <td className="incident-location-cell">

                        {formatText(
                          incident.location
                        )}

                      </td>


                      {/* ==================================
                          INCIDENT DETAILS
                      ================================== */}

                      <td
                        className={
                          "incident-details-cell"
                        }
                      >

                        {formatText(
                          incident.incidentDetails
                        )}

                      </td>


                      {/* ==================================
                          ACTION TAKEN
                      ================================== */}

                      <td
                        className={
                          "incident-action-cell"
                        }
                      >

                        {formatText(
                          incident.actionTaken
                        )}

                      </td>


                      {/* ==================================
                          LOG FILE
                      ================================== */}

                      <td className="incident-log-file-cell">

                        {incident.logFileLink ? (

                          <a
                            href={
                              incident.logFileLink
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="incident-log-link"
                            title="Open incident log"
                          >

                            <span>
                              Open Log
                            </span>

                            <ExternalLink
                              size={13}
                              aria-hidden="true"
                            />

                          </a>

                        ) : (

                          <span
                            className={
                              "incident-no-log"
                            }
                          >
                            --
                          </span>

                        )}

                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        </div>

      )}

    </section>

  );
}