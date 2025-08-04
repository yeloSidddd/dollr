import React, { useState } from "react";

// Reuse the Pencil Icon
const PencilIcon = ({ className = "w-4 h-4 text-black" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 3.487l3.651 3.65a1.75 1.75 0 010 2.475l-9.336 9.336a2 2 0 01-1.08.554l-4.586.765a1 1 0 01-1.174-1.173l.765-4.586a2 2 0 01.554-1.08l9.336-9.336a1.75 1.75 0 012.475 0z"
    />
  </svg>
);

// Modal
const EditModal = ({ title, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl leading-none"
        >
          ×
        </button>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-4">Form goes here...</p>
        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
            Save
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function AccountSettings() {
  const [modal, setModal] = useState(null);

  return (
    <div className="mx-auto px-6 space-y-10 text-gray-800">
      {modal && <EditModal title={`Edit ${modal}`} onClose={() => setModal(null)} />}

      <div>
        <h1 className="text-xl font-semibold">Account Settings</h1>
        <p className="text-sm text-gray-500">Manage your account preferences and security.</p>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Account Information</h2>
          <button
            onClick={() => setModal("Account Info")}
            className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-colors"
            title="Edit"
          >
            <PencilIcon />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <span className="block font-medium text-gray-900">Username</span>
            <p className="mt-1">acoustic123</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">Account Type</span>
            <p className="mt-1">Premium</p>
          </div>
          <div className="md:col-span-2">
            <span className="block font-medium text-gray-900">Email</span>
            <p className="mt-1">acoustic@example.com</p>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Security Settings</h2>
          <button
            onClick={() => setModal("Security")}
            className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-colors"
            title="Edit"
          >
            <PencilIcon />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <span className="block font-medium text-gray-900">Password</span>
            <p className="mt-1">********</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">Two-Factor Auth</span>
            <p className="mt-1">Enabled</p>
          </div>
        </div>
      </div>

      {/* Login Activity */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Login Activity</h2>
          <button
            onClick={() => setModal("Login Activity")}
            className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-colors"
            title="Edit"
          >
            <PencilIcon />
          </button>
        </div>
        <div className="space-y-2 text-sm text-gray-700">
          <div>
            <span className="block font-medium text-gray-900">Last Login</span>
            <p className="mt-1">Aug 4, 2025 - 08:23 AM</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">Login IP</span>
            <p className="mt-1">192.168.1.101</p>
          </div>
        </div>
      </div>
    </div>
  );
}
