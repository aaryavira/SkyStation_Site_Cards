/* ==========================================================
   FIRESTORE → UI MAPPER
   SkyStation Site Information Repository

   Production-ready
   Firestore = DATA
   Mapper    = NORMALIZATION
   React     = UI / ICONS / PRESENTATION
========================================================== */


/* ==========================================================
   GENERIC HELPERS
========================================================== */

function isObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (isObject(value)) {
    return Object.values(value);
  }

  return [];
}

/*
 * Makes Firestore keys tolerant to:
 *   nightOperations
 *   Night Operations
 *   night operations
 *   Night_Operations
 *   nightOperations
 *   accidental spaces
 */
function normalizeKey(key) {
  return String(key)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

function getNormalizedField(object, possibleKeys) {
  if (!isObject(object)) {
    return undefined;
  }

  const wantedKeys = possibleKeys.map(normalizeKey);

  for (const [actualKey, value] of Object.entries(object)) {
    if (wantedKeys.includes(normalizeKey(actualKey))) {
      return value;
    }
  }

  return undefined;
}

function getField(object, possibleKeys, fallback = undefined) {
  const value = getNormalizedField(
    object,
    possibleKeys
  );

  return value !== undefined
    ? value
    : fallback;
}


/* ==========================================================
   FLIGHT PARAMETER NORMALIZATION
========================================================== */

function mapParameter(parameter, fallbackId = "") {
  if (!isObject(parameter)) {
    return null;
  }

  return {
    id:
      parameter.id ||
      fallbackId ||
      "",

    subtitle:
      parameter.subtitle ||
      "",

    value:
      parameter.value ||
      "--",
  };
}

function mapParameterArray(value) {
  return toArray(value)
    .filter(isObject)
    .map((item, index) =>
      mapParameter(
        item,
        `parameter-${index}`
      )
    )
    .filter(Boolean);
}


/* ==========================================================
   DAY OPERATIONS
========================================================== */

function mapDayOperations(rawDay) {
  const day =
    isObject(rawDay)
      ? rawDay
      : {};

  const minimumFlightAltitude =
    getField(
      day,
      [
        "minimumFlightAltitude",
        "Minimum Flight Altitude",
      ],
      []
    );

  const maximumFlightAltitude =
    getField(
      day,
      [
        "maximumFlightAltitude",
        "Maximum Flight Altitude",
      ]
    );

  const safeAltitude =
    getField(
      day,
      [
        "safeAltitude",
        "Safe Altitude",
      ]
    );

  const rthAltitude =
    getField(
      day,
      [
        "rthAltitude",
        "RTH Altitude",
      ]
    );

  return {
    minimumFlightAltitude:
      mapParameterArray(
        minimumFlightAltitude
      ),

    maximumFlightAltitude:
      mapParameter(
        maximumFlightAltitude,
        "maximumFlightAltitude"
      ),

    safeAltitude:
      mapParameter(
        safeAltitude,
        "safeAltitude"
      ),

    rthAltitude:
      mapParameter(
        rthAltitude,
        "rthAltitude"
      ),
  };
}


/* ==========================================================
   NIGHT OPERATIONS
========================================================== */

function mapNightOperations(rawNight) {
  const night =
    isObject(rawNight)
      ? rawNight
      : {};

  const minimumFlightAltitude =
    getField(
      night,
      [
        "minimumFlightAltitude",
        "Minimum Flight Altitude",
      ],
      []
    );

  return {
    minimumFlightAltitude:
      mapParameterArray(
        minimumFlightAltitude
      ),
  };
}


/* ==========================================================
   FLIGHT PARAMETERS

   Handles:

   flightParameters
   Flight Parameters

   dayOperations
   Day Operations

   nightOperations
   Night Operations
========================================================== */

function mapFlightParameters(rawParameters) {
  const source =
    isObject(rawParameters)
      ? rawParameters
      : {};

  const rawDay =
    getField(
      source,
      [
        "dayOperations",
        "Day Operations",
      ],
      {}
    );

  const rawNight =
    getField(
      source,
      [
        "nightOperations",
        "Night Operations",
      ],
      {}
    );

  const result = {
    dayOperations:
      mapDayOperations(rawDay),

    nightOperations:
      mapNightOperations(rawNight),
  };

  /*
   * TEMPORARY VERIFICATION LOG
   *
   * This will tell us exactly what the mapper receives.
   * Keep it for now.
   */
  console.log(
    "[siteMapper] Flight Parameters:",
    result
  );

  console.log(
    "[siteMapper] Night Operations:",
    result.nightOperations
  );

  return result;
}


/* ==========================================================
   MAIN SITE MAPPER
========================================================== */

export function mapSite(doc) {
  const data =
    isObject(doc)
      ? doc
      : {};

  /* ========================================================
     ROOT SECTIONS
  ======================================================== */

  const header =
    isObject(data.header)
      ? data.header
      : {};

  const operational =
    isObject(data.operational)
      ? data.operational
      : {};

  const map =
    isObject(data.map)
      ? data.map
      : {};

  const stakeholders =
    isObject(data.stakeholders)
      ? data.stakeholders
      : {};

  const footer =
    isObject(data.footer)
      ? data.footer
      : {};


  /* ========================================================
     HEADER
  ======================================================== */

  const location =
    isObject(header.location)
      ? header.location
      : {};

  const internalTools =
    getField(
      header,
      [
        "InternalTools",
        "Internal Tools",
        "internalTools",
      ],
      {}
    );

  const externalTool =
    getField(
      header,
      [
        "ExternalTool",
        "External Tool",
        "externalTool",
      ],
      {}
    );


  /* ========================================================
     FOOTER / KEY METRICS
  ======================================================== */

  const metrics =
    getField(
      footer,
      [
        "KeyMetrics",
        "Key Metrics",
        "keyMetrics",
      ],
      {}
    );

  const getMetric = (
    keys,
    fallback = "--"
  ) => {
    return getField(
      metrics,
      keys,
      fallback
    );
  };

  const totalCapacity =
    getMetric([
      "totalCapacity",
      "Total Capacity",
      "Capacity",
      "capacity",
    ]);

  const totalBlocks =
    getMetric([
      "totalBlocks",
      "Total Blocks",
      "Blocks",
      "blocks",
    ]);

  const totalWTGs =
    getMetric([
      "totalWTGs",
      "Total WTGs",
      "WTGs",
      "Wtgs",
      "wtgs",
      "Total WTG",
    ]);

  const totalICRs =
    getMetric([
      "totalICRs",
      "Total ICRs",
      "ICRs",
      "Icrs",
      "icrs",
      "Total ICR",
    ]);


  /* ========================================================
     FLIGHT OBSTACLES
  ======================================================== */

  const rawFlightObstacles =
    getField(
      operational,
      [
        "FlightObstacles",
        "Flight Obstacles",
        "flightObstacles",
      ],
      []
    );

  const flightObstacles =
    toArray(
      rawFlightObstacles
    ).filter(isObject);


  /* ========================================================
     NEED TO KNOW
  ======================================================== */

  const rawNeedToKnow =
    getField(
      operational,
      [
        "needToKnow",
        "NeedToKnow",
        "Need To Know",
      ],
      []
    );

  const needToKnow =
    toArray(
      rawNeedToKnow
    ).filter(isObject);


  /* ========================================================
     INCIDENTS
  ======================================================== */

  const rawIncidents =
    getField(
      operational,
      [
        "incidents",
        "Incidents",
        "Incident Log",
      ],
      []
    );

  const incidents =
    toArray(
      rawIncidents
    ).filter(isObject);


  /* ========================================================
     FLIGHT PARAMETERS

     Supports both:

     operational.flightParameters

     operational["Flight Parameters"]
  ======================================================== */

  const rawFlightParameters =
    getField(
      operational,
      [
        "flightParameters",
        "Flight Parameters",
      ],
      {}
    );

  const flightParameters =
    mapFlightParameters(
      rawFlightParameters
    );


  /* ========================================================
     MAP
  ======================================================== */

  const mapImageURL =
    getField(
      map,
      [
        "imageURL",
        "imageUrl",
        "Image URL",
        "image",
        "mapImageURL",
        "Map Image URL",
      ],
      ""
    );

  const mapKML =
    getField(
      map,
      [
        "kml",
        "KML",
        "kmlDriveURL",
        "KML URL",
      ],
      ""
    );

  const mapLatitude =
    getField(
      map,
      [
        "latitude",
        "Latitude",
        "defaultLatitude",
      ],
      null
    );

  const mapLongitude =
    getField(
      map,
      [
        "longitude",
        "Longitude",
        "defaultLongitude",
      ],
      null
    );

  const mapZoom =
    getField(
      map,
      [
        "zoom",
        "Zoom",
        "defaultZoom",
      ],
      15
    );


  /* ========================================================
     RETURN UI OBJECT
  ======================================================== */

  return {

    /* ======================================================
       DOCUMENT
    ====================================================== */

    id:
      data.id ||
      "",


    /* ======================================================
       BASIC SITE INFORMATION
    ====================================================== */

    name:
      getField(
        header,
        [
          "siteName",
          "Site Name",
        ],
        data.siteName || ""
      ),

    location:
      getField(
        location,
        [
          "name",
          "Name",
        ],
        ""
      ),

    status:
      getField(
        header,
        [
          "status",
          "Status",
        ],
        "Active"
      ),


    /* ======================================================
       HOME METRICS
    ====================================================== */

    capacityLabel:
      totalCapacity,

    blocks:
      totalBlocks,

    wtgs:
      totalWTGs,

    idts:
      totalICRs,


    /* ======================================================
       HEADER
    ====================================================== */

    header: {

      siteName:
        getField(
          header,
          [
            "siteName",
            "Site Name",
          ],
          ""
        ),

      siteCode:
        getField(
          header,
          [
            "siteCode",
            "Site Code",
          ],
          ""
        ),

      status:
        getField(
          header,
          [
            "status",
            "Status",
          ],
          "Active"
        ),

      lastUpdated:
        getField(
          header,
          [
            "Last Updated",
            "lastUpdated",
          ],
          null
        ),

      location: {

        name:
          getField(
            location,
            [
              "name",
              "Name",
            ],
            ""
          ),

        latitude:
          getField(
            location,
            [
              "latitude",
              "Latitude",
            ],
            null
          ),

        longitude:
          getField(
            location,
            [
              "longitude",
              "Longitude",
            ],
            null
          ),

        googleMapsLink:
          getField(
            location,
            [
              "googleMapsLink",
              "Google Maps Link",
            ],
            ""
          ),
      },

      internalTools: {

        flightHub:
          getField(
            internalTools,
            [
              "FlightHub",
              "flightHub",
              "Flight Hub",
            ],
            {}
          ),

        spectra:
          getField(
            internalTools,
            [
              "Spectra",
              "spectra",
            ],
            {}
          ),
      },

      externalTool: {

        spectra:
          getField(
            externalTool,
            [
              "Spectra",
              "spectra",
            ],
            {}
          ),
      },
    },


    /* ======================================================
       OPERATIONAL
    ====================================================== */

    operational: {

      dockHealth:
        getField(
          operational,
          [
            "Dock Health",
            "dockHealth",
          ],
          {}
        ),

      aircraft: (
        getField(
          operational,
          [
            "Dock Health",
          ],
          {}
        )
      )?.Aircraft ||
        (
          getField(
            operational,
            [
              "Dock Health",
            ],
            {}
          )
        )?.aircraft ||
        {},

      battery: (
        getField(
          operational,
          [
            "Dock Health",
          ],
          {}
        )
      )?.Battery ||
        (
          getField(
            operational,
            [
              "Dock Health",
            ],
            {}
          )
        )?.battery ||
        {},

      dock: (
        getField(
          operational,
          [
            "Dock Health",
          ],
          {}
        )
      )?.Dock ||
        (
          getField(
            operational,
            [
              "Dock Health",
            ],
            {}
          )
        )?.dock ||
        {},

      /* ====================================================
         FINAL FLIGHT PARAMETERS
      ==================================================== */

      flightParameters,

      flightObstacles,

      needToKnow,

      incidents,

      infrastructure:
        getField(
          operational,
          [
            "Infrastructure",
            "infrastructure",
          ],
          {}
        ),
    },


    /* ======================================================
       MAP
    ====================================================== */

    map: {

      imageURL:
        mapImageURL,

      imageFormat:
        getField(
          map,
          [
            "imageFormat",
            "Image Format",
          ],
          ""
        ),

      resolution:
        getField(
          map,
          [
            "resolution",
            "Resolution",
          ],
          ""
        ),

      image:
        getField(
          map,
          [
            "image",
            "mapImageURL",
            "Map Image URL",
          ],
          ""
        ),

      kml:
        mapKML,

      latitude:
        mapLatitude,

      longitude:
        mapLongitude,

      zoom:
        mapZoom,
    },


    /* ======================================================
       STAKEHOLDERS
    ====================================================== */

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


    /* ======================================================
       FOOTER
    ====================================================== */

    footer: {

      keyMetrics: {

        totalCapacity,

        totalBlocks,

        totalWTGs,

        totalICRs,
      },

      activities:
        Array.isArray(
          getField(
            footer,
            [
              "Activities",
              "activities",
            ],
            []
          )
        )
          ? getField(
              footer,
              [
                "Activities",
                "activities",
              ],
              []
            )
          : [],
    },
  };
}