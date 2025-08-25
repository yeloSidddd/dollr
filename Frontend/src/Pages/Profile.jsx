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

// Reusable Edit Modal Component
const EditModal = ({ title, fields, initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm outline-none"
                />
              ) : (
                <input
                  type={field.type || "text"}
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm outline-none"
                />
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 shadow-sm transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};


export default function ProfileSettings() {
  const [modal, setModal] = useState(null);

  const [profile, setProfile] = useState({
    name: "Acoustic Tamrakar",
    username: "Acoustic AF",
    location: "Patan",
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Rafiquar",
    lastName: "Rahman",
    email: "rafquarrahman15@gmail.com",
    phone: "+9845343446",
    bio: "Team Manager",
  });

  const [address, setAddress] = useState({
    country: "United Kingdom",
    city: "Leeds, East London",
    postalCode: "ERT 2354",
    taxId: "AS45616756",
  });

  const profileImageUrl =
    "data:image/svg+xml;base64,..."; // shortened for clarity

  return (
    <div className="mx-auto px-6 space-y-10 text-gray-800">
      {modal?.type === "profile" && (
        <EditModal
          title="Edit Profile"
          fields={[
            { key: "name", label: "Name" },
            { key: "username", label: "Username" },
            { key: "location", label: "Location" },
          ]}
          initialData={profile}
          onClose={() => setModal(null)}
          onSave={setProfile}
        />
      )}

      {modal?.type === "personal" && (
        <EditModal
          title="Edit Personal Info"
          fields={[
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "email", label: "Email", type: "email" },
            { key: "phone", label: "Phone" },
            { key: "bio", label: "Bio", type: "textarea" },
          ]}
          initialData={personalInfo}
          onClose={() => setModal(null)}
          onSave={setPersonalInfo}
        />
      )}

      {modal?.type === "address" && (
        <EditModal
          title="Edit Address Info"
          fields={[
            { key: "country", label: "Country" },
            { key: "city", label: "City/State" },
            { key: "postalCode", label: "Postal Code" },
            { key: "taxId", label: "TAX ID" },
          ]}
          initialData={address}
          onClose={() => setModal(null)}
          onSave={setAddress}
        />
      )}

      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold">Profile Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your personal and account information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6">
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-[72px] h-[72px] rounded-full object-cover border"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{profile.name}</span>
          <span className="text-sm text-gray-500">{profile.username}</span>
          <span className="text-sm text-gray-500">{profile.location}</span>
        </div>
        <div className="ml-auto">
          <button
            onClick={() => setModal({ type: "profile" })}
            className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-colors"
            title="Edit"
          >
            <PencilIcon />
          </button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <button
            onClick={() => setModal({ type: "personal" })}
            className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-colors"
            title="Edit"
          >
            <PencilIcon />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <span className="block font-medium text-gray-900">First Name</span>
            <p className="mt-1">{personalInfo.firstName}</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">Last Name</span>
            <p className="mt-1">{personalInfo.lastName}</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">Email</span>
            <p className="mt-1">{personalInfo.email}</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">Phone</span>
            <p className="mt-1">{personalInfo.phone}</p>
          </div>
          <div className="md:col-span-2">
            <span className="block font-medium text-gray-900">Bio</span>
            <p className="mt-1">{personalInfo.bio}</p>
          </div>
        </div>
      </div>

      {/* Address Info */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Address</h2>
          <button
            onClick={() => setModal({ type: "address" })}
            className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-colors"
            title="Edit"
          >
            <PencilIcon />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <span className="block font-medium text-gray-900">Country</span>
            <p className="mt-1">{address.country}</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">City/State</span>
            <p className="mt-1">{address.city}</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">Postal Code</span>
            <p className="mt-1">{address.postalCode}</p>
          </div>
          <div>
            <span className="block font-medium text-gray-900">TAX ID</span>
            <p className="mt-1">{address.taxId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
