import logo from "../assets/skylark-logo.png";

import {
  LayoutGrid,
  MapPin,
  Search,
  User,
  Sun,
  Moon,
} from "lucide-react";

export default function AppShell({

  user,

  screen,

  setScreen,

  onLogout,

  theme,

  onToggleTheme,

  children,

}) {

  return (

    <>

      <header className="app-nav">

        <button

          className="brand-button"

          onClick={() => setScreen("home")}

        >

          <img

            src={logo}

            alt="Skylark"

          />

          <span>

            SkyStation

          </span>

        </button>

        <nav>

          <button

            className={

              screen === "home"

                ? "active"

                : ""

            }

            onClick={() =>

              setScreen("home")

            }

          >

            <LayoutGrid size={16} />

            Home

          </button>

          <button

            className={

              screen === "siteDetail"

                ? "active"

                : ""

            }

          >

            <MapPin size={16} />

            Site Card

          </button>

        </nav>

        <div className="nav-actions">

          <div className="search">

            <Search size={15} />

            <input

              placeholder="Search Site"

            />

          </div>

         <button
  className="theme-toggle"
  onClick={onToggleTheme}
  title={
    theme === "dark"
      ? "Switch to Light Mode"
      : "Switch to Dark Mode"
  }
>

  <span className="theme-toggle-knob">

    {theme === "dark" ? (

      <Sun size={18} />

    ) : (

      <Moon size={18} />

    )}

  </span>

</button>
          <button

            className="avatar"

            onClick={onLogout}

            title={user?.email}

          >

            <User size={16} />

          </button>

        </div>

      </header>

      <main>

        {children}

      </main>

    </>

  );

}