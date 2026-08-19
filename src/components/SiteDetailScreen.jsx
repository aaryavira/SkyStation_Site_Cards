import { useMemo } from "react";

import SiteHeader from "./SiteHeader";
import ParametersCard from "./ParametersCard";
import NeedToKnowCard from "./NeedToKnowCard";
import ObstaclesCard from "./ObstaclesCard";
import IncidentLogCard from "./IncidentLogCard";
import HealthCard from "./HealthCard";
import SiteMapCard from "./SiteMapCard";
import StakeholderCard from "./StakeholderCard";

import {
  ChevronLeft,
  Download,
} from "lucide-react";


/* ==========================================================
   SITE DETAIL SCREEN
========================================================== */

export default function SiteDetailScreen({
  site,
  onBack,
}) {

  /* ==========================================================
     FOOTER DATA
  ========================================================== */

  const metrics = useMemo(() => {
    return (
      site?.footer?.keyMetrics ||
      {}
    );
  }, [site]);


  const activities = useMemo(() => {
    return Array.isArray(
      site?.footer?.activities
    )
      ? site.footer.activities
      : [];
  }, [site]);


  /* ==========================================================
     NEED TO KNOW DATA

     Firestore:
     Site
       └── operational
            └── needToKnow

     Mapper:
     site.operational.needToKnow
  ========================================================== */

  const needToKnow = useMemo(() => {
    return Array.isArray(
      site?.operational?.needToKnow
    )
      ? site.operational.needToKnow
      : [];
  }, [site]);


  /* ==========================================================
     INCIDENT LOG DATA

     Firestore:
     Site
       └── operational
            └── incidents

     Mapper:
     site.operational.incidents

     IMPORTANT:
     Firestore connection is NOT changed.
  ========================================================== */

  const incidents = useMemo(() => {
    return Array.isArray(
      site?.operational?.incidents
    )
      ? site.operational.incidents
      : [];
  }, [site]);


  /* ==========================================================
     PDF DOWNLOAD
  ========================================================== */

  async function downloadPDF() {

    try {

      const response = await fetch(
        "http://localhost:5000/generate-pdf",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            url: window.location.href,

            fileName:
              `${site.name || "Site"}-Card.pdf`,
          }),
        }
      );


      if (!response.ok) {
        throw new Error(
          "PDF generation failed"
        );
      }


      const blob =
        await response.blob();


      const url =
        window.URL.createObjectURL(
          blob
        );


      const link =
        document.createElement("a");


      link.href = url;

      link.download =
        `${site.name || "Site"}-Card.pdf`;


      document.body.appendChild(
        link
      );


      link.click();


      document.body.removeChild(
        link
      );


      window.URL.revokeObjectURL(
        url
      );

    }

    catch (error) {

      console.error(
        "PDF generation error:",
        error
      );

      alert(
        "Unable to generate PDF"
      );
    }
  }


  /* ==========================================================
     NO SITE
  ========================================================== */

  if (!site) {

    return (
      <section className="page">

        <p>
          Site not found.
        </p>

      </section>
    );
  }


  /* ==========================================================
     UI
  ========================================================== */

  return (

    <section className="page fade-in">


      {/* ======================================================
          TOOLBAR
      ====================================================== */}

      <div className="detail-toolbar">

        <button
          className="back-link"
          onClick={onBack}
          type="button"
        >

          <ChevronLeft
            size={16}
          />

          Back to Sites

        </button>


        <button
          className="download-btn"
          onClick={downloadPDF}
          type="button"
        >

          <Download
            size={16}
          />

          Download PDF

        </button>

      </div>


      {/* ======================================================
          HEADER
      ====================================================== */}

      <SiteHeader
        site={site}
      />


      {/* ======================================================
          SITE DETAILS AT A GLANCE
      ====================================================== */}

      <section
        className="sc-section intelligence-card"
      >

        <div className="section-title">

          <h2>
            Site Details at a Glance
          </h2>

        </div>


        <div className="metrics-grid">

          <div className="metric-card">

            <span>
              Total Capacity
            </span>

            <strong>
              {
                metrics.totalCapacity ||
                "--"
              }
            </strong>

          </div>


          <div className="metric-card">

            <span>
              Total Blocks
            </span>

            <strong>
              {
                metrics.totalBlocks ||
                "--"
              }
            </strong>

          </div>


          <div className="metric-card">

            <span>
              Total ICRs
            </span>

            <strong>
              {
                metrics.totalICRs ||
                "--"
              }
            </strong>

          </div>

        </div>

      </section>


      <br />


      {/* ======================================================
          MAIN OPERATIONAL LAYOUT

          LEFT:
          Site Map

          RIGHT:
          Pilot Operations

          IMPORTANT:
          Incident Log is intentionally NOT inside this
          layout anymore.
      ====================================================== */}

      <div className="mission-layout">


        {/* ====================================================
            LEFT COLUMN : SITE MAP
        ==================================================== */}

        <div className="map-column">

          <SiteMapCard
            site={site}
          />

        </div>


        {/* ====================================================
            RIGHT COLUMN : OPERATIONS
        ==================================================== */}

        <div className="operations-column">


          {/* ==================================================
              FLIGHT PARAMETERS
          ================================================== */}

          <div className="body-card">

            <ParametersCard
              parameters={
                site?.operational
                  ?.flightParameters
              }
            />

          </div>


          {/* ==================================================
              NEED TO KNOW
          ================================================== */}

          <div className="body-card">

            <NeedToKnowCard
              needToKnow={
                needToKnow
              }
            />

          </div>


          {/* ==================================================
              FLIGHT OBSTACLES
          ================================================== */}

          <div className="body-card">

            <ObstaclesCard
              obstacles={
                site?.operational
                  ?.flightObstacles
              }
            />

          </div>


          {/* ==================================================
              DOCK HEALTH
          ================================================== */}

          <div className="body-card">

            <HealthCard
              dockHealth={
                site?.operational
                  ?.dockHealth
              }
            />

          </div>


        </div>

      </div>


      {/* ======================================================
          ACTIVITIES ON SITE
      ====================================================== */}

      <section
        className="sc-section intelligence-card"
      >

        <div className="section-title">

          <h2>
            Activities on Site
          </h2>

        </div>


        <div className="activities-grid">

          {activities.length > 0 ? (

            activities.map(
              (activity, index) => (

                <span
                  key={index}
                  className="activity-chip"
                >

                  {activity}

                </span>

              )
            )

          ) : (

            <span
              className="activity-chip"
            >

              No Activities Available

            </span>

          )}

        </div>

      </section>

          <br></br>
      {/* ======================================================
          INCIDENT LOG

          NEW POSITION:
          Below:
            1. Site Map
            2. Dock Health / Operations
            3. Activities on Site

          IMPORTANT:
          Data source and component remain unchanged.
      ====================================================== */}

      <div className="body-card">

        <IncidentLogCard
          incidents={
            incidents
          }
        />

      </div>


      {/* ======================================================
          SITE STAKEHOLDERS
      ====================================================== */}

      <br />

      <StakeholderCard
        stakeholders={
          site?.stakeholders
        }
      />


    </section>
  );
}