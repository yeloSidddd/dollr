import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: DashboardIcon, path: "/main/dashboard" },
    { name: "Transactions", icon: TransactionsIcon, path: "/main/transactions" },
    { name: "Reports", icon: ReportsIcon, path: "/main/reports" },
    { name: "Settings", icon: SettingsIcon, path: "/main/settings" },
    { name: "Notifications", icon: NotificationIcon, path: "/main/notification" },
  ];

  function handleClick(name, path) {
    if (path) {
      navigate(path);
    } else {
      navigate("/"); // Logout
    }
    setMobileMenuOpen(false);
  }

  const isActivePage = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <>
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white text-black p-6 rounded-2xl max-w-md w-full relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowUpgradeModal(false)}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
            <h2 className="text-xl font-bold mb-2">Upgrade to Pro</h2>
            <p className="text-sm text-gray-700 mb-4">
              Unlock premium features like:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-800 mb-4 space-y-1">
              <li>Advanced analytics & reports</li>
              <li>Real-time budget alerts</li>
              <li>Priority support</li>
              <li>Unlimited transaction history</li>
            </ul>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full"
              onClick={() => {
                // Replace with actual upgrade logic
                alert("Redirecting to upgrade...");
                setShowUpgradeModal(false);
              }}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Profile */}
        <div className="border-b border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="Profile"
                className="w-10 h-10 rounded-full ring-2 ring-gray-600"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">Samantha</p>
              <p className="text-xs text-gray-400 truncate">samantha@email.com</p>
            </div>
            <button
              className="text-xs font-semibold bg-white text-black rounded-full px-3 py-1 hover:bg-gray-200 transition-all"
            >
              Pro
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <ul className="flex flex-col">
          {navItems.map(({ name, icon: Icon, path }) => (
            <li key={name}>
              <div
                className={`flex items-center gap-3 px-5 py-4 hover:bg-gray-800 cursor-pointer transition-all duration-200 ${
                  isActivePage(path) ? "bg-gray-800 border-r-4 border-white" : ""
                }`}
                onClick={() => handleClick(name, path)}
              >
                <div className="flex-shrink-0">
                  <Icon />
                </div>
                <span className="text-sm font-medium">{name}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Mobile Logout */}
        <div className="border-t border-gray-800 p-4">
          <div
            className="flex items-center gap-3 px-2 py-3 text-gray-400 hover:bg-red-600/90 hover:text-white rounded-xl cursor-pointer transition-all duration-200"
            onClick={() => handleClick("Logout")}
          >
            <LogoutIcon />
            <span className="text-sm font-medium">Logout</span>
          </div>
        </div>
      </div>

      {/* Main Sidebar */}
      <div
        className={`bg-[#000000] text-white md:flex md:flex-col transition-all duration-300 ease-in-out ${
          collapsed ? "md:w-16" : "md:w-52"
        } w-full md:w-auto md:h-screen flex flex-col md:justify-start shadow-xl md:static`}
      >
        {/* Mobile Top Navbar */}
        <div className="w-full flex items-center justify-between px-4 md:hidden h-14 flex-shrink-0">
          <span className="text-lg font-bold text-white">Dollr</span>
          <div className="flex items-center gap-2">
            <button className="text-xs font-semibold bg-white text-black rounded-full px-2 py-[2px] hover:bg-gray-200 transition-all" onClick={() => setShowUpgradeModal(true)}>
              ↑
            </button>
            <button
              className="text-white hover:text-gray-300 transition-colors p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex p-4 w-full justify-between items-center border-b border-gray-800">
          <div className={`transition-opacity duration-300 ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>
            {!collapsed && <span className="text-lg font-bold text-white whitespace-nowrap">Dollr</span>}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-all duration-200 flex-shrink-0"
            aria-label="Toggle collapse"
          >
            {collapsed ? <MenuIcon /> : <CloseIcon />}
          </button>
        </div>

        {/* Desktop Profile */}
        <div className="hidden md:block p-4 border-b border-gray-800">
          <div className={`flex items-center transition-all duration-300 ${collapsed ? "justify-center" : "gap-3"}`}>
            <div className="relative flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="Profile"
                className="w-8 h-8 rounded-full ring-2 ring-gray-600 hover:ring-gray-400 transition-all cursor-pointer"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
              <p className="text-sm font-medium text-white truncate">Samantha</p>
              <p className="text-xs text-gray-400 truncate">samantha@email.com</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-col flex-1 mt-2 w-full px-2">
          <ul className="space-y-2">
            {navItems.map(({ name, icon: Icon, path }) => (
              <li key={name}>
                <div
                  className={`group flex items-center cursor-pointer rounded-xl relative transition-all duration-300 ${
                    collapsed ? "justify-center px-3 py-3" : "gap-3 px-4 py-3"
                  } ${
                    isActivePage(path)
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                  onClick={() => handleClick(name, path)}
                >
                  {isActivePage(path) && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                  )}
                  <div className="flex-shrink-0">
                    <Icon />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  }`}>
                    <span className="whitespace-nowrap font-medium">{name}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Upgrade and Logout */}
        <div className="hidden md:block p-3">
          <div className={`mb-3 transition-all duration-300 ${collapsed ? "px-1" : "px-2"}`}>
            <div
              className={`rounded-xl text-white hover:shadow-lg transition-all cursor-pointer ${
                collapsed ? "p-3 flex items-center justify-center" : "p-4 flex flex-col items-center justify-center"
              }`}
            >
              <div className={`overflow-hidden transition-all duration-300 ${
                collapsed ? "h-0 opacity-0" : "h-auto opacity-100"
              }`}>
                {!collapsed && (
                  <>
                    <p className="text-sm font-bold text-center">Upgrade to Pro</p>
                    <p className="text-xs text-gray-300 mt-1 text-center leading-tight">Unlock premium features</p>
                  </>
                )}
              </div>
              <button
                className={`font-semibold bg-white text-black rounded-full hover:bg-gray-100 hover:shadow transition-all duration-300 ${
                  collapsed ? "px-2 py-1 text-xs" : "mt-3 px-4 py-2 text-sm"
                }`}
                onClick={() => setShowUpgradeModal(true)}
              >
                {collapsed ? "↑" : "Upgrade"}
              </button>
            </div>
          </div>
          <div className="px-2" onClick={() => handleClick("Logout")}>
            <div className={`flex items-center cursor-pointer rounded-xl hover:bg-red-600/90 hover:text-white group transition-all duration-300 ${
              collapsed ? "justify-center px-3 py-3" : "gap-3 px-3 py-3"
            }`}>
              <div className="flex-shrink-0 text-gray-400 group-hover:text-white transition-colors duration-200">
                <LogoutIcon />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}>
                <span className="text-gray-400 group-hover:text-white font-medium whitespace-nowrap">
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Icons
function MenuIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashboardIcon() {
  return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>;
}

function TransactionsIcon() {
  return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h10v4H4v-4z" /></svg>;
}

function ReportsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon() {
  return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5zm7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.4-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0014 2h-4c-.25 0-.46.18-.49.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.32-.07.65-.07.97s.02.66.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" /></svg>;
}

function NotificationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-2.21-1.343-4.084-3.2-4.8A1.993 1.993 0 0013 5a2 2 0 00-4 0c0 .368.103.712.281 1.007C7.343 6.916 6 8.79 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m1 0v1a3 3 0 006 0v-1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
