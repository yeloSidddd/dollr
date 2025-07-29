import React from "react";
import trendup from "../Resources/trendup.svg";
import wifi from "../Resources/wifi.svg";

export default function Dashboard() {
  return (
    <>
      {/* Net Worth and Trend */}
      <div className="flex flex-row justify-between items-start p-6 sm:p-10 gap-6">
        {/* Net Worth */}
        <div>
          <p className="text-sm text-gray-400">Net Worth</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold mt-2 leading-tight">
            Rs. 20,000.00
          </h1>
        </div>

        {/* Trend */}
        <div className="flex flex-col items-start md:items-end">
          <p className="text-sm text-gray-400">Trend</p>
          <img
            src={trendup}
            alt="Trend Up"
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto mt-2"
          />
        </div>
      </div>

      {/* Search and Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 px-6 sm:px-10 pb-10">
        {/* Search */}
        <div className="flex items-center bg-gray-200 rounded-full px-4 py-3 flex-1 min-w-[200px]">
          <div className="w-5 h-5 text-gray-600 flex-shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="ml-3 bg-transparent outline-none text-sm w-full text-center leading-none"
            style={{ height: "1.25rem" }} // keeps input text vertically centered inside py-3 container
          />
        </div>

        {/* Income Button */}
        <button className="flex items-center bg-gray-200 px-4 py-3 rounded-full flex-1 min-w-[200px]">
          <div className="w-5 h-5 text-gray-700 flex-shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </div>
          <span className="flex-grow text-sm text-gray-700 text-center leading-none">
            Income
          </span>
        </button>

        {/* Expenses Button */}
        <button className="flex items-center bg-gray-200 px-4 py-3 rounded-full flex-1 min-w-[200px]">
          <div className="w-5 h-5 text-gray-700 flex-shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M17 7L7 17M17 17H7V7" />
            </svg>
          </div>
          <span className="flex-grow text-sm text-gray-700 text-center leading-none">
            Expenses
          </span>
        </button>

        {/* Add New Transaction Button */}
        <button className="flex items-center bg-green-500 hover:bg-green-600 px-4 py-3 rounded-full flex-1 min-w-[200px]">
          <div className="w-5 h-5 text-white flex-shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="flex-grow text-sm text-white text-center leading-none">
            Add New Transaction
          </span>
        </button>
      </div>

      {/* Responsive Table */}
      <div className="px-6 sm:px-10 pb-10">
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto border-none border-gray-200 rounded-md">
          <table className="min-w-full border-separate border-spacing-y-2 text-xs sm:text-sm md:text-base">
            <tbody>
              <tr className="bg-white shadow-sm block sm:table-row mb-4 sm:mb-0 rounded-lg sm:rounded-none">
                {/* Icon */}
                <td
                  className="block sm:table-cell px-4 py-2 text-right sm:text-left align-middle"
                  data-label="Icon"
                >
                  <img
                    src={wifi}
                    alt="Wifi Icon"
                    className="w-6 h-6 sm:w-8 sm:h-8 ml-auto sm:ml-0"
                  />
                </td>

                {/* Description */}
                <td
                  className="block sm:table-cell px-4 py-2 font-medium text-gray-800 text-right sm:text-left align-middle"
                  data-label="Description"
                >
                  Internet Expenses
                </td>

                {/* Date */}
                <td
                  className="block sm:table-cell px-4 py-2 text-gray-500 text-right sm:text-center align-middle"
                  data-label="Date"
                >
                  13-Apr-2025
                </td>

                {/* Amount */}
                <td
                  className="block sm:table-cell px-4 py-2 text-red-600 text-right align-middle"
                  data-label="Amount"
                >
                  -Rs. 3,000
                </td>

                {/* Balance */}
                <td
                  className="block sm:table-cell px-4 py-2 font-semibold text-right align-middle"
                  data-label="Balance"
                >
                  Rs. 25,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile table label CSS */}
      <style>
        {`
          @media (max-width: 639px) {
            table tbody tr td {
            position: relative;
            padding-left: 3rem; /* reduce from 50% to 3rem for right aligned */
            text-align: right !important; /* force right align */
          }
          table tbody tr td::before {
            content: attr(data-label);
            position: absolute;
            left: 0.5rem; /* closer to left edge */
            top: 50%;
            transform: translateY(-50%);
            font-weight: 600;
            color: #4B5563; /* Tailwind gray-600 */
            white-space: nowrap;
                    }
                  }
        `}
      </style>
    </>
  );
}
