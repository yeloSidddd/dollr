import { useState } from "react";
import Profile from "./Profile";
import AccountSettings from "./Account";
import BillingSettings from "./Billing";
import PlansSettings from "./Plans";
import NotificationSettings from "./NotificationSetting";
import Login from "./Login";

export default function Settings() {
  const [activeButton, setActiveButton] = useState("Profile");
  const [activePage, setActivePage] = useState("Profile");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navOptions = [
    { label: "Profile", value: "Profile" },
    { label: "Account", value: "Account" },
    { label: "Billing", value: "Billing" },
    { label: "Plan", value: "Plan" },
    { label: "Notification", value: "Notification" },
  ];

  function renderPage(pageName) {
    switch (pageName) {
      case "Profile":
        return <Profile />;
      case "Account":
        return <AccountSettings/>;
      case "Billing":
        return <BillingSettings/>;
      case "Plan":
        return <PlansSettings/>;
      case "Notification":
        return <NotificationSettings/>;
      default:
        return <Login/>;
    }
  }

  const handleButtonClick = (pageName) => {
    setActiveButton(pageName);
    setActivePage(pageName);
    setDropdownOpen(false); // Close dropdown on selection (mobile)
  };

  return (
    <>
      {/* Header with title and dropdown toggle on mobile */}
      <div className="flex justify-between items-center px-6 sm:px-10 pt-6 sm:pt-10">
        <h2 className="text-xl font-semibold">Settings</h2>
        {/* Dropdown toggle only on mobile */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-sm font-medium px-3 py-1.5 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            Menu
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50 overflow-hidden border border-gray-200">
              {navOptions.map((button) => (
                <button
                  key={button.value}
                  onClick={() => handleButtonClick(button.value)}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    activeButton === button.value
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop navigation buttons */}
      <div className="hidden sm:flex justify-start items-center px-6 py-6 sm:px-10 sm:py-6 mt-4 sm:mt-0">
        <div className="flex flex-wrap gap-4">
          {navOptions.map((button) => (
            <button
              key={button.value}
              onClick={() => handleButtonClick(button.value)}
              className={`px-5 py-2 md:px-8 rounded-full text-sm font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5 ${
                activeButton === button.value
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* Render the selected page */}
      <div className="p-6 sm:p-10">{renderPage(activePage)}</div>
    </>
  );
}
