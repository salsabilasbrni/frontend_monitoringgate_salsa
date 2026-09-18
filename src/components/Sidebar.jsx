import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";
import "../components/Sidebar.css";

import {
  LayoutDashboard,
  Cpu,
  Database,
  FileText,
  Settings,
  ChevronLeft,
  LogOut
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen, search, setSearch }) {
    // Ambil data akun Google yang sedang login
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("user");

    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    window.location.href = "/login";
  };
  const [imageError, setImageError] = useState(false);

  return (
    <aside
      className={`
        flex
        flex-col
        flex-shrink-0
        sticky top-0
        my-4 ml-4
        h-[calc(100vh-2rem)]
        transition-all duration-300
        rounded-[32px]
        overflow-hidden
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        ${sidebarOpen ? "w-72" : "w-20"}
      `}
      style={{
        background: "#005E99",
      }}
    >
      

      {/* ================= HEADER ================= */}

      <div
        className={`
          flex items-center
          p-5
          ${sidebarOpen ? "justify-between" : "justify-center"}
        `}
      >

        {sidebarOpen && (
          <div className="flex items-center gap-1">
            
            <div className="w-11 h-11 rounded-[12px] overflow-hidden flex items-center justify-center flex-shrink-0">
              <img
                src="/HTMLLOGO.png"
                alt="ReMops Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <h1
              className="text-2xl font-bold mt-2"
              style={{ color: "#FFFFFF" }}
            >
              ReMops
            </h1>

          </div>
        )}


        {/* Collapse Button */}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center
                     w-12 h-12
                     rounded-[18px]
                     transition-all duration-300
                     hover:scale-105"
          style={{
            background: "#FFFFFF",
            color: "#005E99",
          }}
        >
          <ChevronLeft
            size={22}
            className={`
              transition-transform duration-300
              ${!sidebarOpen ? "rotate-180" : ""}
            `}
          />
        </button>

      </div>


      {/* ================= SEARCH ================= */}

      {sidebarOpen && (
        <div className="px-4 mt-5 mb-6">

          <div className="relative">

            <Search
              size={20}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#CDECFF]
              "
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                bg-white/10
                border
                border-white/20
                rounded-[18px]
                py-3
                pl-11
                pr-4
                text-white
                placeholder-[#CDECFF]
                outline-none
                focus:bg-white/20
                transition
              "
            />

          </div>

        </div>
      )}


      {/* ================= MENU ================= */}

      <nav
        className={`
          sidebar-menu
          px-4
          space-y-2
          mt-4
          h-[430px]
          overflow-y-auto
          ${sidebarOpen ? "pb-10" : "pb-10"}
        `}
      >
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="
              w-full
              flex
              items-center
              justify-center
              p-4
              rounded-[20px]
              text-[#CDECFF]
              hover:bg-blue-500
              transition-all
              duration-300
            "
          >
            <Search size={22} />
          </button>
        )}

        <MenuItem
          to="/"
          icon={<LayoutDashboard size={22} />}
          text="Dashboard"
          sidebarOpen={sidebarOpen}
        />

        <MenuItem
          to="/history"
          icon={<Database size={22} />}
          text="History"
          sidebarOpen={sidebarOpen}
        />

        <MenuItem
          to="/reports"
          icon={<FileText size={22} />}
          text="Reports"
          sidebarOpen={sidebarOpen}
        />

        <MenuItem
          to="/settings"
          icon={<Settings size={22} />}
          text="Settings"
          sidebarOpen={sidebarOpen}
        />

      </nav>


      {/* ================= FOOTER ================= */}

      {sidebarOpen && (
        <div className="px-4 pb-4 pt-4">

          <div
            className="
              rounded-[22px]
              p-3
              flex
              items-center
              gap-3
              border
            "
            style={{
              background: "#FFFFFF",
              borderColor: "#FFFFFF",
            }}
          >

            <div
              className="
                w-12
                h-12
                rounded-full
                flex
                items-center
                justify-center
                text-white
                font-bold
                flex-shrink-0
              "
              style={{
                background: "#008EE6",
              }}
            >
            {sidebarOpen && (
              <div className="absolute bottom-4 left-4 right-4">

                <div className="rounded-[22px] p-3 bg-white">

                  {/* USER INFO */}
                  <div className="flex items-center gap-3">

                    {/* FOTO GOOGLE */}
                    {user?.picture && !imageError ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="
                          w-12 h-12
                          rounded-full
                          object-cover
                          flex-shrink-0
                        "
                        onError={() => setImageError(true)}
                        />
                    ):(
                      <div
                        className="
                          w-12 h-12
                          rounded-full
                          flex items-center justify-center
                          text-white font-bold
                          flex-shrink-0
                        "
                        style={{ background: "#008EE6" }}
                      >
                        {user?.name?.charAt(0) || "U"}
                      </div>
                    )}

                    {/* NAMA + EMAIL */}
                    <div className="min-w-0 flex-1">

                      <p
                        className="font-semibold truncate text-sm"
                        style={{ color: "#6B7C8F" }}
                      >
                        {user?.name || "User"}
                      </p>

                      <p
                        className="text-xs truncate"
                        style={{ color: "#6B7C8F" }}
                      >
                        {user?.email || "No email"}
                      </p>

                    </div>

                  </div>


                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="
                      mt-3
                      w-full
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-[14px]
                      py-2.5
                      text-sm
                      font-medium
                      text-red-500
                      bg-red-50
                      hover:bg-red-100
                      transition
                    "
                  >
                    <LogOut size={17} />
                    Logout
                  </button>

                </div>

              </div>
            )}

            </div>

          </div>

        </div>
      )}
      {!sidebarOpen && (
        <div className="mt-auto flex justify-center pb-5">

          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="
                w-12
                h-12
                rounded-full
                object-cover
                border-2
                border-white/50
              "
            />
          ) : (
            <div
              className="
                w-12
                h-12
                rounded-full
                flex
                items-center
                justify-center
                text-white
                font-bold
                border-2
                border-white/50
              "
              style={{ background: "#008EE6" }}
            >
              {user?.name?.charAt(0) || "U"}
            </div>
          )}

        </div>
      )}

    </aside>
  );
}


/* =================================================
   MENU ITEM
================================================= */

function MenuItem({
  to,
  icon,
  text,
  sidebarOpen,
}) {

  return (

    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `
        w-full
        flex
        items-center
        ${sidebarOpen ? "gap-4 justify-start" : "justify-center"}

        p-4

        rounded-[20px]

        transition-all
        duration-300

        ${
          isActive
            ? "bg-blue-400 text-white shadow-sm"
            : "text-[#CDECFF] hover:bg-blue-500"
        }
        `
      }
    >

      {icon}

      {sidebarOpen && (
        <span className="font-medium">
          {text}
        </span>
      )}

    </NavLink>

  );
}

export default Sidebar;