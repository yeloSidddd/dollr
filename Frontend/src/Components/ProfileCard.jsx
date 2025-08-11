import React from "react";

export default function ProfileCardModal({
  show,
  onClose,
  onEdit,
  name = "John Doe",
  email = "john.doe@example.com",
  avatar = "https://via.placeholder.com/100",
  bio = "Lifelong learner, budget optimizer, and finance enthusiast.",
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white text-black p-6 rounded-2xl max-w-sm w-full relative shadow-xl">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-24 h-24 rounded-full border-4 border-green-500 shadow-md"
          />
          <h2 className="text-xl font-bold mt-3">{name}</h2>
          <p className="text-sm text-gray-600">{email}</p>
        </div>

        {/* Bio */}
        <p className="text-center text-gray-700 text-sm mt-4">{bio}</p>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            onClick={onEdit}
          >
            Edit Profile
          </button>
          <button
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Close Icon
function CloseIcon() {
  console.log("hello world");
  return (
    <svg
      className="w-5 h-5"
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
