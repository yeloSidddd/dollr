import React, { useState } from "react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: true,
  });

  const toggleSetting = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const CustomCheckbox = ({ checked, onChange }) => (
    <div
      onClick={onChange}
      className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded bg-white cursor-pointer"
    >
      {checked && (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3AC249"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="mx-auto px-6 space-y-10 text-gray-800">
      <div>
        <h1 className="text-xl font-semibold">Notification Settings</h1>
        <p className="text-sm text-gray-500">Manage how you receive updates and alerts.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">Preferences</h2>
        <div className="space-y-4 text-sm text-gray-700">
          {[
            { label: "Email Notifications", key: "email" },
            { label: "SMS Alerts", key: "sms" },
            { label: "Push Notifications", key: "push" },
            { label: "Newsletter Subscriptions", key: "newsletter" },
          ].map(({ label, key }) => (
            <label key={key} className="flex items-center justify-between cursor-pointer select-none">
              <span>{label}</span>
              <CustomCheckbox
                checked={settings[key]}
                onChange={() => toggleSetting(key)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
