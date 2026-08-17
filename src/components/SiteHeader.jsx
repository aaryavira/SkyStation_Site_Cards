import {
  Calendar,
  ExternalLink,
  MapPin,
} from "lucide-react";

/* ==========================================================
   SITE HEADER
========================================================== */

export default function SiteHeader({ site }) {
  if (!site) return null;

  const header = site.header || {};

  const location = header.location || {};

  const internalTools =
    header.internalTools || {};

  const externalTool =
    header.externalTool || {};

  const flightHub =
    internalTools.flightHub || {};

  const internalSpectra =
    internalTools.spectra || {};

  const externalSpectra =
    externalTool.spectra || {};

  const status =
    header.status || "Active";

  /* ========================================================
     LAST UPDATED
  ======================================================== */

  const lastUpdated =
    header.lastUpdated
      ? new Date(
          header.lastUpdated.seconds
            ? header.lastUpdated.seconds * 1000
            : header.lastUpdated
        ).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "--";

  return (
    <section className="sc-header">

      {/* ====================================================
          LEFT
      ==================================================== */}

      <div className="sc-header-left">

        <span
          className={`status-pill ${status
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          <i />
          {status}
        </span>

        <h1>
          {header.siteName}
        </h1>

        <div className="header-location">

          <MapPin size={15} />

          <span>
            {location.name}
          </span>

          {location.googleMapsLink && (
            <a
              href={location.googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className="tool-link"
            >
              Open Map
              <ExternalLink size={13} />
            </a>
          )}

        </div>

      </div>


      {/* ====================================================
    RIGHT
    ORDER:
    1. Internal Tools
    2. External Tool
    3. Last Updated
==================================================== */}

<div className="sc-header-right">

  {/* ==================================================
      INTERNAL TOOLS
  ================================================== */}

  <div className="header-card header-card-internal">

    <small>INTERNAL TOOLS</small>

    <div className="header-card-content">

      {flightHub.url && (
        <a
          href={flightHub.url}
          target="_blank"
          rel="noreferrer"
          className="tool-link header-tool-link"
        >
          {flightHub.title}
          <ExternalLink size={15} />
        </a>
      )}
            <br></br>
            <br></br>
      {internalSpectra.url && (
        <a
          href={internalSpectra.url}
          target="_blank"
          rel="noreferrer"
          className="tool-link header-tool-link"
        >
          {internalSpectra.title}
          <ExternalLink size={15} />
        </a>
      )}

      {!flightHub.url && !internalSpectra.url && (
        <span className="header-tool-placeholder">
          --
        </span>
      )}

    </div>

  </div>


  {/* ==================================================
      EXTERNAL TOOL
  ================================================== */}

  <div className="header-card header-card-external">

    <small>EXTERNAL TOOL</small>

    <div className="header-card-content">

      {externalSpectra.url ? (
        <a
          href={externalSpectra.url}
          target="_blank"
          rel="noreferrer"
          className="tool-link header-tool-link"
        >
          {externalSpectra.title}
          <ExternalLink size={15} />
        </a>
      ) : (
        <span className="header-tool-placeholder">
          --
        </span>
      )}

    </div>

  </div>


  {/* ==================================================
      LAST UPDATED
  ================================================== */}

  <div className="header-card header-card-last-updated">

    <small>LAST UPDATED</small>

    <div className="last-updated-value">

      <Calendar
        size={15}
        strokeWidth={2}
      />

      <span>
        {lastUpdated}
      </span>

    </div>

  </div>

</div>

    </section>
  );
}