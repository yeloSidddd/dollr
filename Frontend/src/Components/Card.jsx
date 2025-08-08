import React from "react";

export default function Card({
  show,
  onClose,
  onUpgrade,
  title = "Upgrade to Pro",
  features = [
    "Advanced analytics & reports",
    "Real-time budget alerts",
    "Priority support",
    "Unlimited transaction history",
  ],
  buttonText = "Upgrade Now",
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white text-black p-6 rounded-2xl max-w-md w-full relative shadow-xl">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-700 mb-4">
          Unlock premium features like:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-800 mb-4 space-y-1">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full"
          onClick={onUpgrade}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

// Icon
function CloseIcon() {
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
