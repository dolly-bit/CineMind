import React, { useState } from "react";
import {
  Sparkles,
  Bell,
  ChevronDown,
  User,
  Bookmark,
  LogOut,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBar({ username = "Ayush" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-cm-line bg-cm-bg/85 px-4 sm:px-6 py-4 backdrop-blur-md">

      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Sparkles size={18} className="text-cm-purple" />
        <span className="font-display text-xl sm:text-[22px] text-cm-text">
          DeepCine
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate("/")}
          className="hidden md:flex items-center gap-2 text-white hover:text-purple-400"
        >
          <Home size={18} />
          Home
        </button>

        <button
          aria-label="Notifications"
          className="relative p-1.5"
        >
          <Bell size={18} className="text-cm-text" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-purple-500" />
        </button>

        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-bold">
              {username.charAt(0)}
            </div>

            <ChevronDown size={16} />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-52 rounded-xl bg-[#181622] border border-white/10 shadow-xl">

              <button
                className="flex w-full items-center gap-3 px-4 py-3 hover:bg-white/5"
              >
                <User size={17} />
                Profile
              </button>

              <button
                className="flex w-full items-center gap-3 px-4 py-3 hover:bg-white/5"
              >
                <Bookmark size={17} />
                Watchlist
              </button>

              <hr className="border-white/10" />

              <button
                onClick={logout}
                className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5"
              >
                <LogOut size={17} />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}