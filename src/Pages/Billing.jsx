import React from "react";

export default function BillingSettings() {
  const billingHistory = [
    { id: "001", date: "2025-07-01", amount: "$15.00", status: "Paid" },
    { id: "002", date: "2025-06-01", amount: "$15.00", status: "Paid" },
    { id: "003", date: "2025-05-01", amount: "$15.00", status: "Paid" },
  ];

  return (
    <div className="mx-auto px-6 space-y-10 text-gray-800">
      <div>
        <h1 className="text-xl font-semibold">Billing Settings</h1>
        <p className="text-sm text-gray-500">Manage your subscription and view your billing history.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">Subscription</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <p><span className="font-medium">Plan:</span> Premium</p>
          <p><span className="font-medium">Renewal Date:</span> 2025-09-01</p>
          <button className="mt-2 text-green-500 hover:underline">Update Payment Method</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="px-4 py-2">{entry.id}</td>
                  <td className="px-4 py-2">{entry.date}</td>
                  <td className="px-4 py-2">{entry.amount}</td>
                  <td className="px-4 py-2">{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
