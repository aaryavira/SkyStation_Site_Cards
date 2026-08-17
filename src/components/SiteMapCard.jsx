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

   Firestore
   Site
     └── map
          └── imageURL

   IMPORTANT:
   - Firestore controls the image URL.
   - Supports direct image URLs such as:
     GitHub RAW
     CDN
     Google Drive thumbnail
     Other public image URLs
   - No URL conversion is performed.
========================================================== */

export default function SiteMapCard({ site }) {

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

     SiteMapper.js provides:
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
     IMAGE STATE RESET
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

    <section className="panel">


      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="panel-header">

        <div className="panel-title">

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
          MAP CONTAINER
      ==================================================== */}

      <div className="site-map-container">


        {/* ==================================================
            IMAGE
        ================================================== */}

        {imageURL && (

          <img

            src={imageURL}

            alt={
              site?.name
                ? `${site.name} Site Map`
                : "Site Map"
            }

            className="site-map-image"

            loading="eager"

            draggable={false}

            onLoad={
              handleImageLoad
            }

            onError={
              handleImageError
            }

          />

        )}


        {/* ==================================================
            LOADING STATE

            Only displayed while the actual image
            is being loaded.
        ================================================== */}

        {loading && !imageLoaded && (

          <div className="map-overlay">

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


        {/* ==================================================
            ERROR STATE
        ================================================== */}

        {!loading && error && (

          <div className="map-overlay">

            <AlertCircle
              size={26}
              aria-hidden="true"
            />

            <span>
              {error}
            </span>

          </div>

        )}


        {/* ==================================================
            NO IMAGE STATE
        ================================================== */}

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
              Upload site map image
              URL in Firestore.
            </p>

          </div>

        )}

      </div>

    </section>

  );

}