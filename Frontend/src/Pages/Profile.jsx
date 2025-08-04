import React, { useState } from "react";

// Pencil Icon Component
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

// Modal Component - keeping original structure with minor improvements
const EditModal = ({ title, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl leading-none">×</button>
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
};

export default function ProfileSettings() {
  const [modal, setModal] = useState(null);

  // Generate a clean profile image placeholder
  const profileImageUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMzYiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIyNCIgeT0iMjQiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS41Ij4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAwLTQtNEg4YTQgNCAwIDAwLTQgNHYyIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cjwvc3ZnPgo8L3N2Zz4K";

  return (
    <div className="mx-auto px-6 space-y-10 text-gray-800">
      {modal && <EditModal title={`Edit ${modal}`} onClose={() => setModal(null)} />}

      {/* Title - keeping original structure */}
      <div>
        <h1 className="text-xl font-semibold">Profile Settings</h1>
        <p className="text-sm text-gray-500">Manage your personal and account information.</p>
      </div>

      {/* Header Profile Card - same structure with refined details */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6">
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-[72px] h-[72px] rounded-full object-cover border"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Acoustic Tamrakar</span>
          <span className="text-sm text-gray-500">Acoustic AF</span>
          <span className="text-sm text-gray-500">Patan</span>
        </div>
        <div className="ml-auto">
          <button
            onClick={() => setModal("Profile")}
            className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-colors"
            title="Edit"
          >
            <PencilIcon />
          </button>
        </div>
      </div>

      {/* Personal Info Section - same structure with improved spacing */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <button
            onClick={() => setModal("Personal Info")}
            className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-colors"
            title="Edit"
          >
            <PencilIcon />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <span className="block font-medium text-gray-900">First Name</span>
            <p className="mt-1">Rafiquar</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">Last Name</span>
            <p className="mt-1">Rahman</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">Email</span>
            <p className="mt-1">rafquarrahman15@gmail.com</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">Phone</span>
            <p className="mt-1">+9845343446</p>
          </div>
          <div className="md:col-span-2">
            <span className="block font-medium text-gray-900">Bio</span>
            <p className="mt-1">Team Manager</p>
          </div>
        </div>
      </div>

      {/* Address Info Section - same structure with consistent styling */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Address</h2>
          <button
            onClick={() => setModal("Address Info")}
            className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-colors"
            title="Edit"
          >
            <PencilIcon />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <span className="block font-medium text-gray-900">Country</span>
            <p className="mt-1">United Kingdom</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">City/State</span>
            <p className="mt-1">Leeds, East London</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">Postal Code</span>
            <p className="mt-1">ERT 2354</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">TAX ID</span>
            <p className="mt-1">AS45616756</p>
          </div>
        </div>
      </div>
    </div>
  );
}