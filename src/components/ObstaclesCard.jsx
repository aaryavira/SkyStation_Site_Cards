import {
  AlertTriangle,
  Trees,
  Building2,
  TowerControl,
  Wind,
  RadioTower,
  Mountain,
  ExternalLink,
} from "lucide-react";

export default function ObstaclesCard({ obstacles = {} }) {
  // Supports both Firestore Map and Array
  const obstacleList = Array.isArray(obstacles)
    ? obstacles
    : Object.values(obstacles || {});

  /*
   * Icon decision is based ONLY on Firestore "Type".
   * Do not use title or Name for icon selection.
   */
  const getIcon = (item = {}) => {
    const type = String(item.Type || "")
      .toLowerCase()
      .trim();

    switch (type) {
      case "signal loss":
      case "signal":
        return RadioTower;

      case "cell tower":
      case "cell":
        return TowerControl;

      case "terrain":
      case "sand dunes":
      case "sand dune":
        return Mountain;

      case "road":
      case "elevated road":
        return Route;

      case "tree":
      case "trees":
        return Trees;

      case "building":
        return Building2;

      case "wind":
      case "wind turbine":
        return Wind;

      case "tower":
        return TowerControl;

      case "power line":
      case "transmission":
        return RadioTower;

      default:
        return AlertTriangle;
    }
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