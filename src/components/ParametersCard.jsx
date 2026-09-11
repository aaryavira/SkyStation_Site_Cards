import {
  Monitor,
  PlaneTakeoff,
  PlaneLanding,
  Home,
  ShieldCheck,
  Warehouse,
} from "lucide-react";


/* ==========================================================
   PARAMETER CONFIGURATION

   Firestore controls:
   - id
   - subtitle
   - value

   Frontend controls:
   - title
   - icon
========================================================== */

const PARAMETER_CONFIG = {

  minimumFlightAltitude: {
    title: "Minimum Flight Altitude",
    icon: PlaneLanding,
  },

  maximumFlightAltitude: {
    title: "Maximum Flight Altitude",
    icon: PlaneTakeoff,
  },

  safeAltitude: {
    title: "Safe Altitude",
    icon: ShieldCheck,
  },

  rthAltitude: {
    title: "RTH Altitude",
    icon: Home,
  },

};


/* ==========================================================
   CREATE PARAMETER ROW
========================================================== */

function createParameterRow(
  type,
  parameter
) {

  if (
    !parameter ||
    typeof parameter !== "object"
  ) {
    return null;
  }


  const config =
    PARAMETER_CONFIG[type];


  if (!config) {
    return null;
  }


  /*
   * Default icon comes from parameter configuration.
   *
   * Existing special-case support:
   * stockyard → Warehouse
   */
  const Icon =
    parameter.id === "stockyard"
      ? Warehouse
      : config.icon;


  return {

    id:
      parameter.id ||
      type,

    title:
      config.title,

    subtitle:
      parameter.subtitle ||
      "",

    value:
      parameter.value ||
      "--",

    icon:
      Icon,
  };
}


/* ==========================================================
   BUILD PARAMETER ROWS
==========================================================

   Supports:

   SINGLE PARAMETER

   {
     id,
     subtitle,
     value
   }


   MULTIPLE PARAMETERS

   [
     {
       id,
       subtitle,
       value
     },

     {
       id,
       subtitle,
       value
     }
   ]

========================================================== */

function buildRows(
  operations = {},
  parameterTypes = []
) {

  const rows = [];


  parameterTypes.forEach(
    (type) => {

      const parameter =
        operations?.[type];


      /*
       * Parameter does not exist.
       */
      if (
        !parameter
      ) {
        return;
      }


      /* ----------------------------------------------------
         ARRAY PARAMETER
      ---------------------------------------------------- */

      if (
        Array.isArray(parameter)
      ) {

        parameter.forEach(
          (item) => {

            const row =
              createParameterRow(
                type,
                item
              );


            if (row) {
              rows.push(row);
            }

          }
        );


        return;
      }


      /* ----------------------------------------------------
         SINGLE PARAMETER
      ---------------------------------------------------- */

      const row =
        createParameterRow(
          type,
          parameter
        );


      if (row) {
        rows.push(row);
      }

    }
  );


  return rows;
}


/* ==========================================================
   PARAMETER ROW
========================================================== */

function ParameterRow({
  row,
}) {

  const Icon =
    row.icon;


  return (
    <div className="parameter-row">

      {/* ====================================================
          LEFT SIDE
      ==================================================== */}

      <div className="parameter-left">

        {/* ICON */}

        <div
          className="parameter-icon"
          aria-hidden="true"
        >
          <Icon
            size={18}
            strokeWidth={2}
          />
        </div>


        {/* TITLE + SUBTITLE */}

        <div className="parameter-info">

          <span className="parameter-title">
            {row.title}
          </span>


          {row.subtitle && (
            <span className="parameter-subtitle">
              {row.subtitle}
            </span>
          )}

        </div>

      </div>


      {/* ====================================================
          VALUE
      ==================================================== */}

      <strong className="parameter-value">
        {row.value}
      </strong>

    </div>
  );
}


/* ==========================================================
   OPERATIONS SECTION
========================================================== */

function OperationsSection({
  title,
  rows,
}) {

  /*
   * Don't render empty operation sections.
   */

  if (
    !Array.isArray(rows) ||
    rows.length === 0
  ) {
    return null;
  }


  return (
    <div className="parameter-operation-section">

      {/* ==================================================
          SECTION HEADER
      ================================================== */}

      <div className="parameter-section-title">
        {title}
      </div>


      {/* ==================================================
          PARAMETER TABLE
      ================================================== */}

      <div className="parameter-table">

        {rows.map(
          (row) => (
            <ParameterRow
              key={row.id}
              row={row}
            />
          )
        )}

      </div>

    </div>
  );
}


/* ==========================================================
   MAIN PARAMETERS CARD
========================================================== */

export default function ParametersCard({
  parameters = {},
}) {


  /* ========================================================
     DAY OPERATIONS
  ======================================================== */

  const dayOperations =
    parameters?.dayOperations ||
    {};


  const dayRows =
    buildRows(
      dayOperations,
      [
        "minimumFlightAltitude",
        "maximumFlightAltitude",
        "safeAltitude",
        "rthAltitude",
      ]
    );


  /* ========================================================
     NIGHT OPERATIONS
  ======================================================== */

  const nightOperations =
    parameters?.nightOperations ||
    {};


  const nightRows =
    buildRows(
      nightOperations,
      [
        "minimumFlightAltitude",
        "maximumFlightAltitude",
        "safeAltitude",
        "rthAltitude",
      ]
    );


  /* ========================================================
     CARD
  ======================================================== */

  return (
    <section className="detail-card">

      {/* ==================================================
          CARD HEADER
      ================================================== */}

      <div className="detail-card-header">

        <h3>

          <Monitor
            size={18}
            strokeWidth={2}
          />

          <span>
            Flight Parameters
          </span>

        </h3>

      </div>


      {/* ==================================================
          DAY OPERATIONS
      ================================================== */}

      <OperationsSection
        title="Day Operations"
        rows={dayRows}
      />


      {/* ==================================================
          NIGHT OPERATIONS
      ================================================== */}

      <OperationsSection
        title="Night Operations"
        rows={nightRows}
      />

    </section>
  );
}