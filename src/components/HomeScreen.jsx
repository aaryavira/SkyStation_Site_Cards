import { useState } from "react";
import { ChevronRight, MapPin } from "lucide-react";

import heroBanner from "../assets/hero-banner.png";
import StatusPill from "./StatusPill";

export default function HomeScreen({
  sites = [],
  onOpenSite,
}) {
  const [filter, setFilter] = useState("All");

  const filteredSites =
    filter === "All"
      ? sites
      : sites.filter(
          (site) => site.status === filter
        );

  return (
    <section className="page fade-in">

      <div className="hero-banner">

        <img
          src={heroBanner}
          alt="SkyStation"
        />

        <div>

          <p className="eyebrow">
            Dock Operations Console
          </p>

          <h1>
            Your Complete Site Intelligence.
          </h1>

          <p>
            Centralize site intelligence,
            operational workflows,
            stakeholders and SkyStation
            infrastructure deployed at glance.

            <br />
            <br />

            Access standardized Site Cards
            to enable
            <b> faster planning</b>,
            <b> efficient operations</b>,
            and
            <b> informed decision-making</b>.
          </p>

        </div>

      </div>

      <div className="page-heading">

        <div>

          <h1>Sites</h1>

          <p>

            {sites.length}

            {" "}sites under dock operations

          </p>

        </div>

        <div className="filter-row">

          {[
            "All",
            "Active",
            "Setup",
            "Offline",
          ].map((item) => (

            <button
              key={item}
              className={`filter ${
                filter === item
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setFilter(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      <div className="site-grid">

        {filteredSites.map((site) => (

          <button
            key={site.id}
            className="site-card"
            onClick={() =>
              onOpenSite(site.id)
            }
          >

            <div className="card-top">

              <div>

                <h2>

                  {site.name}

                </h2>

                <p>

                  <MapPin size={12} />

                  {site.location}

                </p>

              </div>

              <StatusPill
                status={site.status}
              />

            </div>

            <div className="quick-metrics">

              <span>

                <strong>

                  {site.blocks}

                </strong>

                BLOCKS

              </span>

              <span>

                <strong>

                  {site.wtgs}

                </strong>

                WTGs

              </span>

              <span>

                <strong>

                  {site.idts}

                </strong>

                ICRs

              </span>

            </div>

            <div className="card-footer">

              <strong>

                {site.capacityLabel}

              </strong>

              <span>

                Open Site Card

                <ChevronRight
                  size={14}
                />

              </span>

            </div>

          </button>

        ))}

      </div>

    </section>
  );
}