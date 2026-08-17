/* ==========================================================
   FIRESTORE → UI MAPPER
   SkyStation Site Information Repository

   Production-safe mapper

   Firestore
   sites
     └── <Site>
          ├── header
          ├── operational
          │    ├── needToKnow
          │    ├── incidents
          │    ├── FlightObstacles
          │    ├── Flight Parameters
          │    └── Dock Health
          ├── map
          ├── stakeholders
          └── footer

   IMPORTANT:
   - Firestore controls DATA
   - Frontend controls UI / icons / formatting
   - Map data is kept completely independent
     from Need To Know / Incident Log
========================================================== */

export function mapSite(doc) {
  const data =
    doc && typeof doc === "object"
      ? doc
      : {};

  /* ==========================================================
     ROOT SECTIONS
  ========================================================== */

  const header =
    data.header && typeof data.header === "object"
      ? data.header
      : {};

  const operational =
    data.operational &&
    typeof data.operational === "object"
      ? data.operational
      : {};

  const map =
    data.map &&
    typeof data.map === "object"
      ? data.map
      : {};

  const footer =
    data.footer &&
    typeof data.footer === "object"
      ? data.footer
      : {};

  const stakeholders =
    data.stakeholders &&
    typeof data.stakeholders === "object"
      ? data.stakeholders
      : {};

  /* ==========================================================
     HEADER
  ========================================================== */

  const location =
    header.location &&
    typeof header.location === "object"
      ? header.location
      : {};

  const internalTools =
    header.InternalTools ||
    header.internalTools ||
    header["Internal Tools"] ||
    {};

  const externalTool =
    header.ExternalTool ||
    header.externalTool ||
    header["External Tool"] ||
    {};

  /* ==========================================================
     FOOTER / KEY METRICS
  ========================================================== */

  const metrics =
    footer.KeyMetrics ||
    footer.keyMetrics ||
    footer["Key Metrics"] ||
    {};

  const getMetric = (
    camelCaseKey,
    displayKey,
    fallbackKeys = []
  ) => {
    const possibleKeys = [
      camelCaseKey,
      displayKey,
      ...fallbackKeys,
    ];

    for (const key of possibleKeys) {
      const value = metrics[key];

      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        return value;
      }
    }

    return "--";
  };

  const totalCapacity = getMetric(
    "totalCapacity",
    "Total Capacity",
    ["Capacity", "capacity"]
  );

  const totalBlocks = getMetric(
    "totalBlocks",
    "Total Blocks",
    ["Blocks", "blocks"]
  );

  const totalWTGs = getMetric(
    "totalWTGs",
    "Total WTGs",
    [
      "WTGs",
      "Wtgs",
      "wtgs",
      "Total WTG",
    ]
  );

  const totalICRs = getMetric(
    "totalICRs",
    "Total ICRs",
    [
      "ICRs",
      "Icrs",
      "icrs",
      "Total ICR",
    ]
  );

  /* ==========================================================
     FLIGHT OBSTACLES
  ========================================================== */

  const rawFlightObstacles =
    operational.FlightObstacles ??
    operational.flightObstacles ??
    [];

  const flightObstacles =
    Array.isArray(rawFlightObstacles)
      ? rawFlightObstacles
      : (
          rawFlightObstacles &&
          typeof rawFlightObstacles === "object"
        )
        ? Object.values(rawFlightObstacles)
        : [];

  /* ==========================================================
     NEED TO KNOW
  ========================================================== */

  const rawNeedToKnow =
    operational.needToKnow ??
    operational.NeedToKnow ??
    operational["Need To Know"] ??
    [];

  const needToKnow =
    Array.isArray(rawNeedToKnow)
      ? rawNeedToKnow.filter(
          (item) =>
            item &&
            typeof item === "object"
        )
      : (
          rawNeedToKnow &&
          typeof rawNeedToKnow === "object"
        )
        ? Object.values(rawNeedToKnow).filter(
            (item) =>
              item &&
              typeof item === "object"
          )
        : [];

  /* ==========================================================
     INCIDENT LOG
  ========================================================== */

  const rawIncidents =
    operational.incidents ??
    operational.Incidents ??
    operational["Incident Log"] ??
    [];

  const incidents =
    Array.isArray(rawIncidents)
      ? rawIncidents.filter(
          (item) =>
            item &&
            typeof item === "object"
        )
      : (
          rawIncidents &&
          typeof rawIncidents === "object"
        )
        ? Object.values(rawIncidents).filter(
            (item) =>
              item &&
              typeof item === "object"
          )
        : [];

  /* ==========================================================
     MAP NORMALIZATION

     IMPORTANT:
     Do NOT mix this with operational data.

     Firestore screenshot shows:

     map
       ├── imageURL
       ├── imageFormat
       ├── resolution
       └── other map metadata
  ========================================================== */

  const mapImageURL =
    map.imageURL ||
    map.imageUrl ||
    map["Image URL"] ||
    map.image ||
    map.mapImageURL ||
    "";

  const mapKML =
    map.kml ||
    map.KML ||
    map.kmlDriveURL ||
    map["KML"] ||
    "";

  const mapLatitude =
    map.latitude ??
    map.Latitude ??
    map.defaultLatitude ??
    null;

  const mapLongitude =
    map.longitude ??
    map.Longitude ??
    map.defaultLongitude ??
    null;

  const mapZoom =
    map.zoom ??
    map.Zoom ??
    map.defaultZoom ??
    15;

  /* ==========================================================
     RETURN UI OBJECT
  ========================================================== */

  return {

    /* ========================================================
       DOCUMENT
    ======================================================== */

    id:
      data.id ||
      "",

    /* ========================================================
       BASIC SITE INFORMATION
    ======================================================== */

    name:
      header.siteName ||
      header["Site Name"] ||
      data.siteName ||
      "",

    location:
      location.name ||
      location["Name"] ||
      "",

    status:
      header.status ||
      header.Status ||
      "Active",

    /* ========================================================
       HOME SCREEN METRICS
    ======================================================== */

    capacityLabel:
      totalCapacity,

    blocks:
      totalBlocks,

    wtgs:
      totalWTGs,

    idts:
      totalICRs,

    /* ========================================================
       HEADER
    ======================================================== */

    header: {

      siteName:
        header.siteName ||
        header["Site Name"] ||
        "",

      siteCode:
        header.siteCode ||
        header["Site Code"] ||
        "",

      status:
        header.status ||
        header.Status ||
        "Active",

      lastUpdated:
        header["Last Updated"] ||
        header.lastUpdated ||
        null,

      location: {

        name:
          location.name ||
          location["Name"] ||
          "",

        latitude:
          location.latitude ??
          location.Latitude ??
          null,

        longitude:
          location.longitude ??
          location.Longitude ??
          null,

        googleMapsLink:
          location.googleMapsLink ||
          location["Google Maps Link"] ||
          "",
      },

      internalTools: {

        flightHub:
          internalTools.FlightHub ||
          internalTools.flightHub ||
          internalTools["Flight Hub"] ||
          {},

        spectra:
          internalTools.Spectra ||
          internalTools.spectra ||
          {},
      },

      externalTool: {

        spectra:
          externalTool.Spectra ||
          externalTool.spectra ||
          {},
      },
    },

    /* ========================================================
       OPERATIONAL
    ======================================================== */

    operational: {

      dockHealth:
        operational["Dock Health"] ||
        operational.dockHealth ||
        {},

      aircraft:
        operational["Dock Health"]?.Aircraft ||
        operational["Dock Health"]?.aircraft ||
        {},

      battery:
        operational["Dock Health"]?.Battery ||
        operational["Dock Health"]?.battery ||
        {},

      dock:
        operational["Dock Health"]?.Dock ||
        operational["Dock Health"]?.dock ||
        {},

      flightParameters:
        operational["Flight Parameters"] ||
        operational.flightParameters ||
        {},

      flightObstacles,

      needToKnow,

      incidents,

      infrastructure:
        operational.Infrastructure ||
        operational.infrastructure ||
        {},
    },

    map: {

  /* ------------------------------------------------------
     PRIMARY SITE MAP IMAGE

     Firestore:
     map.imageURL

     Example:
     https://raw.githubusercontent.com/...
  ------------------------------------------------------ */

  imageURL:
    map.imageURL ||
    map["Image URL"] ||
    "",


  /* ------------------------------------------------------
     IMAGE METADATA
  ------------------------------------------------------ */

  imageFormat:
    map.imageFormat ||
    map["Image Format"] ||
    "",

  resolution:
    map.resolution ||
    map["Resolution"] ||
    "",


  /* ------------------------------------------------------
     BACKWARD COMPATIBILITY
  ------------------------------------------------------ */

  image:
    map.image ||
    map.mapImageURL ||
    map["Map Image URL"] ||
    "",

  kml:
    map.kml ||
    map.kmlDriveURL ||
    map["KML"] ||
    "",


  /* ------------------------------------------------------
     MAP POSITION
  ------------------------------------------------------ */

  latitude:
    map.latitude ??
    map.defaultLatitude ??
    null,

  longitude:
    map.longitude ??
    map.defaultLongitude ??
    null,

  zoom:
    map.zoom ??
    map.defaultZoom ??
    15,
},

    /* ========================================================
       STAKEHOLDERS
    ======================================================== */

    stakeholders: {

      dayOperations:
        Array.isArray(
          stakeholders.dayOperations
        )
          ? stakeholders.dayOperations
          : [],

      nightOperations:
        Array.isArray(
          stakeholders.nightOperations
        )
          ? stakeholders.nightOperations
          : [],

      onFieldSupport:
        Array.isArray(
          stakeholders.onFieldSupport
        )
          ? stakeholders.onFieldSupport
          : [],
    },

    /* ========================================================
       FOOTER
    ======================================================== */

    footer: {

      keyMetrics: {

        totalCapacity,

        totalBlocks,

        totalWTGs,

        totalICRs,
      },

      activities:
        Array.isArray(
          footer.Activities ||
          footer.activities
        )
          ? (
              footer.Activities ||
              footer.activities
            )
          : [],
    },
  };
}