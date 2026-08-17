import React from "react";

/* ==========================================================
   STATUS PILL
========================================================== */

export default function StatusPill({

  status = "Unknown",

  className = "",

}) {

  const value = String(status || "Unknown").trim();

  const key = value.toLowerCase();

  const config = {

    active: {
      label: "Active",
      className: "active",
    },

    setup: {
      label: "Setup",
      className: "setup",
    },

    offline: {
      label: "Offline",
      className: "offline",
    },

    maintenance: {
      label: "Maintenance",
      className: "maintenance",
    },

    unknown: {
      label: "Unknown",
      className: "unknown",
    },

  };

  const current =

    config[key] ||

    {

      label: value,

      className: "unknown",

    };

  return (

    <span

      className={`status-pill ${current.className} ${className}`}

    >

      <i />

      {current.label}

    </span>

  );

}