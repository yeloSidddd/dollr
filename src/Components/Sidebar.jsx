import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: DashboardIcon },
    { name: "Transactions", icon: TransactionsIcon },
    { name: "Reports", icon: ReportsIcon },
    { name: "Settings", icon: SettingsIcon },
  ];

  return (
    <div
      className={`bg-black text-white h-screen flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle */}
      <div
        className={`flex p-4 ${collapsed ? "justify-center" : "justify-end"}`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white focus:outline-none hover:bg-gray-800 hover:text-gray-300 p-2 rounded-lg transition-all duration-200"
        >
          {collapsed ? <MenuIcon /> : <CloseIcon />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map(({ name: Name, icon: Icon }) => (
            <li key={Name}>
              <div
                className={`group flex items-center transition-all duration-200 cursor-pointer hover:bg-gray-800 mx-2 rounded-lg ${
                  collapsed ? "justify-center px-3 py-3" : "gap-4 px-4 py-3"
                }`}
                onClick={() => handleClick(Name)}
              >
                <div className="flex-shrink-0 transition-colors duration-200 group-hover:text-gray-300">
                  <Icon />
                </div>
                {!collapsed && (
                  <span className="whitespace-nowrap transition-all duration-300 group-hover:text-gray-300">
                    {Name}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Upgrade CTA */}
      <div className={`p-4 ${collapsed ? "px-2" : "px-4"}`}>
        <div
          className={`rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-indigo-400 hover:to-purple-400 cursor-pointer ${
            collapsed
              ? "p-3 flex items-center justify-center"
              : "p-4 flex flex-col items-center justify-center"
          }`}
        >
          {!collapsed && (
            <>
              <p className="text-sm font-semibold text-center">
                Upgrade to Pro
              </p>
              <p className="text-xs text-white/80 mt-1 text-center">
                Unlock premium features and insights.
              </p>
            </>
          )}
          <button
            className={`font-medium bg-white text-black rounded-full transition-all duration-200 hover:bg-gray-200 hover:shadow-md ${
              collapsed ? "px-3 py-2 text-xs" : "mt-3 px-4 py-2 text-sm"
            }`}
          >
            {collapsed ? "↑" : "Upgrade"}
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4" onClick={() => handleClick()}>
        <div
          className={`flex items-center cursor-pointer rounded-lg transition-all duration-300 hover:bg-red-600 hover:scale-105 hover:shadow-lg group ${
            collapsed ? "justify-center px-3 py-3" : "gap-3 px-3 py-3"
          }`}
        >
          <div className="flex-shrink-0 transition-colors duration-200 group-hover:text-red-100">
            <LogoutIcon />
          </div>
          {!collapsed && (
            <span className="transition-all duration-300 group-hover:text-red-100 group-hover:font-medium">
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );

  function handleClick(name) {
    switch (name) {
      case "Dashboard":
        navigate("/main/dashboard");
        break;

      case "Transactions":
        navigate("/main/transactions");
        break;

      case "Reports":
        navigate("/main/reports");
        break;

      case "Settings":
        navigate("/main/settings");
        break;

      default:
        navigate("/");
        break;
    }
  }
}

function MenuIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 6h16M4 12h16M4 18h16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h10v4H4v-4z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReportsIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 3h18v18H3V3zm5 14l3-4 2 3 4-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 15.5c-1.9 0-3.5-1.6-3.5-3.5S10.1 8.5 12 8.5s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 13c.1-.3.1-.7.1-1s0-.7-.1-1l2.1-1.6c.2-.2.3-.5.2-.8l-2-3.4c-.1-.3-.5-.4-.8-.3l-2.5 1a6.4 6.4 0 00-1.6-1l-.4-2.7a.7.7 0 00-.7-.5h-3.4a.7.7 0 00-.7.5l-.4 2.7a6.4 6.4 0 00-1.6 1l-2.5-1a.7.7 0 00-.8.3l-2 3.4c-.1.3 0 .6.2.8l2.1 1.6c-.1.3-.1.7-.1 1s0 .7.1 1l-2.1 1.6c-.2.2-.3.5-.2.8l2 3.4c.1.3.5.4.8.3l2.5-1c.5.4 1 .7 1.6 1l.4 2.7c.1.3.4.5.7.5h3.4c.3 0 .6-.2.7-.5l.4-2.7c.6-.2 1.1-.6 1.6-1l2.5 1c.3.1.6 0 .8-.3l2-3.4c.1-.3 0-.6-.2-.8L19.4 13z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        d="M16 17l5-5m0 0l-5-5m5 5H9M13 21v-2M13 5V3M13 3H5a2 2 0 00-2 2v14a2 2 0 002 2h8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
