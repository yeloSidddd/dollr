import { useState } from "react";

export default function Settings() {


  const [activeButton, setActiveButton] = useState("Profile");


  const handleButtonClick = (period) => {
    setActiveButton(period);
  };
  
  return (
    <>
      <div className="flex flex-row justify-between items-start p-6 sm:p-10 gap-6">
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>

      <div className="flex justify-start items-center px-6 sm:px-10 sm:py-0">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Profile", value: "Profile" },
              { label: "Account", value: "Account" },
              { label: "Billing", value: "Billing" },
              { label: "Plan", value: "Plan" },
              { label: "Notification", value: "Notification" },
            ].map((button) => (
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
    </>
  );
}
