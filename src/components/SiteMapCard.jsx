import { useEffect, useMemo, useState } from "react";

import {
  Map,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";


/* ==========================================================
   SITE MAP CARD

   Data Source:
   site.map.imageURL

   Firestore:
   Site
     └── map
          └── imageURL

   Design Behaviour:
   - Outer border around complete Site Map card
   - 4px breathing space around image frame
   - Inner border around actual image
   - Dynamic image dimensions
   - No fixed aspect ratio
   - No image cropping
   - No image stretching
   - Supports GitHub RAW, CDN and public image URLs
========================================================== */

export default function SiteMapCard({ site }) {

  /* ========================================================
     STATE
  ======================================================== */

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);


  /* ========================================================
     MAP DATA
  ======================================================== */

  const mapData = useMemo(() => {
    return site?.map || {};
  }, [site]);


  /* ========================================================
     IMAGE URL

     siteMapper.js provides:
     site.map.imageURL
  ======================================================== */

  const imageURL = useMemo(() => {

    const url = mapData?.imageURL;

    if (
      typeof url !== "string" ||
      !url.trim()
    ) {
      return "";
    }

    return url.trim();

  }, [mapData]);


  /* ========================================================
     SITE NAME FOR ACCESSIBILITY
  ======================================================== */

  const siteName = useMemo(() => {

    return (
      site?.header?.siteName ||
      site?.name ||
      "Site"
    );

  }, [site]);


  /* ========================================================
     IMAGE STATE RESET

     Runs whenever Firestore provides a new image URL.
  ======================================================== */

  useEffect(() => {

    setError("");
    setImageLoaded(false);

    if (imageURL) {
      setLoading(true);
    } else {
      setLoading(false);
    }

  }, [imageURL]);


  /* ========================================================
     IMAGE LOAD SUCCESS
  ======================================================== */

  function handleImageLoad() {

    setImageLoaded(true);
    setLoading(false);
    setError("");

  }


  /* ========================================================
     IMAGE LOAD ERROR
  ======================================================== */

  function handleImageError() {

    setImageLoaded(false);
    setLoading(false);

    setError(
      "Unable to load Site Map."
    );

  }


  /* ========================================================
     RENDER
  ======================================================== */

  return (

    <section
      className="site-map-card"
      aria-label={`${siteName} Site Map`}
    >

      {/* ====================================================
          OUTER CARD HEADER
      ==================================================== */}

      <div className="site-map-card-header">

        <div className="site-map-card-title">

          <Map
            size={18}
            aria-hidden="true"
          />

          <span>
            Site Map
          </span>

        </div>

      </div>


      {/* ====================================================
          MAP CONTENT

          This creates the breathing space between:
          Outer card border
          and
          Inner image border
      ==================================================== */}

      <div className="site-map-card-content">

        {/* ==================================================
            INNER IMAGE FRAME

            The inner border belongs here.
        ================================================== */}

        <div
          className={[
            "site-map-image-frame",
            imageLoaded ? "is-loaded" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >

          {/* ================================================
              IMAGE
          ================================================= */}

          {imageURL && (

            <img
              src={imageURL}
              alt={`${siteName} Site Map`}
              className="site-map-image"
              loading="eager"
              decoding="async"
              draggable={false}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

          )}


          {/* ================================================
              LOADING STATE
          ================================================= */}

          {loading && !imageLoaded && (

            <div
              className="map-overlay"
              role="status"
              aria-live="polite"
            >

              <Loader2
                size={26}
                className="spin"
                aria-hidden="true"
              />

              <span>
                Loading Site Map...
              </span>

            </div>

          )}


          {/* ================================================
              ERROR STATE
          ================================================= */}

          {!loading && error && (

            <div
              className="map-overlay"
              role="alert"
            >

              <AlertCircle
                size={26}
                aria-hidden="true"
              />

              <span>
                {error}
              </span>

            </div>

          )}


          {/* ================================================
              NO IMAGE STATE
          ================================================= */}

          {!imageURL && !loading && (

            <div className="map-placeholder">

              <ImageIcon
                size={56}
                aria-hidden="true"
              />

              <h3>
                Site Map Not Available
              </h3>

              <p>
                Add a valid Site Map image URL
                in Firestore.
              </p>

            </div>

          )}

        </div>

      </div>

    </section>

  );

}