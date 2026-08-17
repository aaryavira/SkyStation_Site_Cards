import {
  Cpu,
  BatteryCharging,
  Box,
  ExternalLink,
  Satellite,
} from "lucide-react";

export default function HealthCard({

  dockHealth = {},

}) {

  const aircraft = dockHealth.Aircraft || {};

  const battery = dockHealth.Battery || {};

  const dock = dockHealth.Dock || {};

  const skyStation = dock["SkyStation Platform"] || {};

  return (

    <section className="detail-card">

      <div className="detail-card-header">

        <h3>

          <Cpu size={18} />

          <span>Dock Health</span>

        </h3>

      </div>

      <div className="parameter-table">

        {/* Aircraft */}

        <div className="parameter-row">

          <div className="parameter-left">

            <div className="parameter-icon">

              <Cpu size={18} />

            </div>

            <span>Aircraft</span>

          </div>

          <strong>

            {aircraft.aircraftModel || "--"}

          </strong>

        </div>

       {/* Battery Cycles */}

        <div className="parameter-row">

          <div className="parameter-left">

            <div className="parameter-icon">

              <BatteryCharging size={18} />

            </div>

            <span>Battery Cycles</span>

          </div>

          <strong>

            {battery.batteryCycles || "--"}

          </strong>

        </div>

        {/* Dock Version */}

        <div className="parameter-row">

          <div className="parameter-left">

            <div className="parameter-icon">

              <Box size={18} />

            </div>

            <span>Dock Version</span>

          </div>

          <strong>

            {dock.dockVersion || "--"}

          </strong>

        </div>

        {/* SkyStation Code */}

        <div className="parameter-row">

          <div className="parameter-left">

            <div className="parameter-icon">

              <Satellite size={18} />

            </div>

            <span>SkyStation Code</span>

          </div>

          {skyStation.url ? (

            <a
              href={skyStation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="dock-link"
              title={skyStation.title || "Open SkyStation"}
            >

              {dock.skyStationCode}

              <ExternalLink
                size={13}
                style={{
                  marginLeft: 6,
                }}
              />

            </a>

          ) : (

            <strong>

              {dock.skyStationCode || "--"}

            </strong>

          )}

        </div>

      </div>

    </section>

  );

}