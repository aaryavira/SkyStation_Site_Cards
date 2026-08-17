import {
  AlertTriangle,
  Route,
  Trees,
  Building2,
  TowerControl,
  Wind,
  RadioTower,
  ExternalLink,
} from "lucide-react";

export default function ObstaclesCard({ obstacles = {} }) {
  // Supports both Firestore Map and Array
  const obstacleList = Array.isArray(obstacles)
    ? obstacles
    : Object.values(obstacles || {});

  const getIcon = (item = {}) => {
  const text = `${item.title || ""} ${item.Name || ""} ${item.Type || ""}`
    .toLowerCase()
    .trim();

  if (text.includes("signal")) {
    return RadioTower;
  }

  if (text.includes("cell")) {
    return TowerControl;
  }

  if (text.includes("road")) {
    return Route;
  }

  if (text.includes("tree")) {
    return Trees;
  }

  if (text.includes("building")) {
    return Building2;
  }

  if (text.includes("wind")) {
    return Wind;
  }

  if (text.includes("tower")) {
    return TowerControl;
  }

  if (
    text.includes("power line") ||
    text.includes("transmission")
  ) {
    return RadioTower;
  }

  return AlertTriangle;
};
  return (
    <section className="detail-card">
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

                    <strong>{item.Name}</strong>
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dock-link"
                >
                  {item.title}
                  <ExternalLink size={13} />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}