import { useEffect, useMemo, useState } from "react";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  auth,
  firebaseEnabled,
} from "./src/lib/firebase";

import {
  getSites,
} from "./src/services/siteService";

/* ===========================
   Components
=========================== */
import SiteDetailScreen from "./src/components/SiteDetailScreen";
import LoginScreen from "./src/components/LoginScreen";
import HomeScreen from "./src/components/HomeScreen";
import AppShell from "./src/components/AppShell";

/* ===========================
   Global Styles
=========================== */

import "./styles.css";

/* ==========================================================
   APP
========================================================== */

export default function App() {

  /* ===========================
     USER
  =========================== */

  const [user, setUser] = useState(null);

  /* ===========================
     SITES
  =========================== */

  const [sites, setSites] = useState([]);

  const [activeSiteId, setActiveSiteId] = useState(null);

  /* ===========================
     UI
  =========================== */

  const [screen, setScreen] = useState("home");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [theme, setTheme] = useState(() => {

    return (

      localStorage.getItem("skylark-theme")

      ||

      "dark"

    );

  });

  /* ==========================================================
     LOAD SITES FROM FIRESTORE
  ========================================================== */

  useEffect(() => {

    async function loadSites() {

      try {

        setLoading(true);

        const firestoreSites = await getSites();

        setSites(firestoreSites);

        if (firestoreSites.length > 0) {

          setActiveSiteId(

            firestoreSites[0].id

          );

        }

      } catch (err) {

        console.error(err);

        setError(

          "Unable to load Firestore Sites."

        );

      } finally {

        setLoading(false);

      }

    }

    loadSites();

  }, []);

  /* ==========================================================
     ACTIVE SITE
  ========================================================== */

  const activeSite = useMemo(() => {

    return sites.find(

      (site) => site.id === activeSiteId

    );

  }, [

    sites,

    activeSiteId,

  ]);

  // ---------- AUTH ----------

    /* ==========================================================
     AUTH STATE
  ========================================================== */

  useEffect(() => {

    if (!auth) return;

    const unsubscribe = onAuthStateChanged(

      auth,

      (currentUser) => {

        setUser(currentUser);

      }

    );

    return unsubscribe;

  }, []);

  /* ==========================================================
     GOOGLE LOGIN
  ========================================================== */

  async function handleGoogleLogin() {

    if (!auth) return;

    setError("");

    try {

      const provider = new GoogleAuthProvider();

      await signInWithPopup(

        auth,

        provider

      );

    } catch (err) {

      console.error(err);

      setError(err.message);

    }

  }

  /* ==========================================================
     LOGOUT
  ========================================================== */

  async function handleLogout() {

    if (!auth) return;

    await signOut(auth);

    setUser(null);

    setScreen("home");

  }

  /* ==========================================================
     THEME
  ========================================================== */

useEffect(() => {

  localStorage.setItem("skylark-theme", theme);

  document.documentElement.classList.remove(
    "theme-dark",
    "theme-light"
  );

  document.documentElement.classList.add(
    `theme-${theme}`
  );

  document.documentElement.style.colorScheme = theme;

}, [theme]);

  function toggleTheme() {

    setTheme((current) =>

      current === "dark"

        ? "light"

        : "dark"

    );

  }

  /* ==========================================================
     NAVIGATION
  ========================================================== */

  function openSite(siteId) {

    setActiveSiteId(siteId);

    setScreen("siteDetail");

  }

  function goHome() {

    setScreen("home");

  }

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {

    return (

      <main className="app-loading">

        Loading SkyStation...

      </main>

    );

  }

  /* ==========================================================
     LOGIN
  ========================================================== */

  if (!user) {

    return (

      <LoginScreen

        firebaseEnabled={firebaseEnabled}

        error={error}

        onGoogleLogin={handleGoogleLogin}

        onDemoLogin={() =>

          setUser({

            email:

              "demo@skylarkdrones.com",

          })

        }

      />

    );

  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (

    <div className="app-shell">

      <AppShell

        user={user}

        screen={screen}

        setScreen={setScreen}

        onLogout={handleLogout}

        theme={theme}

        onToggleTheme={toggleTheme}

      >

        {screen === "home" && (

          <HomeScreen

            sites={sites}

            onOpenSite={openSite}

          />

        )}

        {screen === "siteDetail" &&

          activeSite && (

            <SiteDetailScreen

              site={activeSite}

              onBack={goHome}

            />

          )}

      </AppShell>

    </div>

  );

}