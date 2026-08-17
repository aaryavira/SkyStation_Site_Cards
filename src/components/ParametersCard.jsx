import {
  Monitor,
  PlaneTakeoff,
  PlaneLanding,
  Home,
  ShieldCheck,
} from "lucide-react";

export default function ParametersCard({ parameters = {} }) {
  const minAltitude = parameters["Min Flight Altitude"] || "--";

  const rows = [];

  /* --------------------------------------------------
     Minimum Flight Altitude
  -------------------------------------------------- */

  if (
    typeof minAltitude === "object" &&
    minAltitude !== null &&
    !Array.isArray(minAltitude)
  ) {
    Object.entries(minAltitude).forEach(([chunk, value]) => {
      rows.push({
        icon: PlaneLanding,
        label: "Minimum Flight Altitude",
        subLabel: chunk,
        value,
      });
    });
  } else {
    rows.push({
      icon: PlaneLanding,
      label: "Minimum Flight Altitude",
      value: minAltitude,
    });
  }

  /* --------------------------------------------------
     Remaining Parameters
  -------------------------------------------------- */

  rows.push(
    {
      icon: PlaneTakeoff,
      label: "Maximum Flight Altitude",
      value:
        parameters["Maximum Flight Altitude"] ||
        parameters["Max Flight Altitude"] ||
        "--",
    },
    {
      icon: ShieldCheck,
      label: "Safe Altitude",
      value: parameters["Safe Altitude"] || "--",
    },
    {
      icon: Home,
      label: "RTH Altitude",
      value: parameters["RTH Altitude"] || "--",
    }
  );

  return (
    <section className="detail-card">
      <div className="detail-card-header">
        <h3>
          <Monitor size={18} />
          <span>Flight Parameters</span>
        </h3>
      </div>

      <div className="parameter-table">
        {rows.map((row, index) => {
          const Icon = row.icon;

          return (
            <div
              key={`${row.label}-${row.subLabel || index}`}
              className="parameter-row"
            >
              <div className="parameter-left">
                <div
                  className="parameter-icon"
                  style={{
                    flexShrink: 0,
                    width: 44,
                    height: 44,
                  }}
                >
                  <Icon size={18} />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span>{row.label}</span>

                  {row.subLabel && (
                    <small
  style={{
    color: "#f15c26",
    fontWeight: 600,
    fontSize: "13px",
    marginTop: "2px",
  }}
>
  {row.subLabel}
</small>
                  )}
                </div>
              </div>

              <strong
  style={{
    whiteSpace: "nowrap",
  }}
>
  {row.value}
</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}