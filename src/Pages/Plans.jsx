import React from "react";

export default function PlansSettings() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["Basic access", "Community support"],
      current: false,
    },
    {
      name: "Pro",
      price: "$15/month",
      features: ["All Free features", "Advanced tools", "Priority support"],
      current: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["All Pro features", "Team licenses", "Dedicated support"],
      current: false,
    },
  ];

  return (
    <div className="mx-auto px-6 space-y-10 text-gray-800">
      <div>
        <h1 className="text-xl font-semibold">Plans</h1>
        <p className="text-sm text-gray-500">Upgrade or manage your subscription plan.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-xl border shadow-sm space-y-4 ${
              plan.current ? "border-green-600" : "border-gray-200"
            }`}
          >
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <p className="text-gray-700 text-sm">{plan.price}</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {plan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
            {plan.current ? (
              <span className="inline-block text-green-600 text-sm font-medium">Current Plan</span>
            ) : (
              <button className="text-sm font-medium px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                Choose Plan
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
