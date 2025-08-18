import wifi from "../Resources/wifi.svg";
import cash from "../Resources/sanocash.svg";

export default function Transactions() {
  return (
    <>
      <div className="flex flex-row justify-between items-start p-6 sm:p-10 gap-6">
        <h2 className="text-xl font-semibold">Transactions</h2>
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
          />
        </div>

        {/* Date Section 1 */}
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
            placeholder="From"
            className="ml-3 bg-transparent outline-none text-sm w-full text-center leading-none"
          />
        </div>

        {/* Date Section 2 */}
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
            placeholder="To"
            className="ml-3 bg-transparent outline-none text-sm w-full text-center leading-none"
          />
        </div>

        <button className="flex items-center bg-green-500 hover:bg-green-600 px-4 py-3 rounded-full flex-1 min-w-[200px]">
          <div className="w-5 h-5 text-white flex-shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
          </div>
          <span className="flex-grow text-sm text-white text-center leading-none">
            Export
          </span>
        </button>
      </div>

      {/* Responsive Table */}
      <div className="px-6 sm:px-10 pb-10">
        <div className="overflow-x-auto max-h-[54 0px] overflow-y-auto border-none border-gray-200 rounded-md">
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
              <tr className="bg-white shadow-sm block sm:table-row mb-4 sm:mb-0 rounded-lg sm:rounded-none">
                {/* Icon */}
                <td
                  className="block sm:table-cell px-4 py-2 text-right sm:text-left align-middle"
                  data-label="Icon"
                >
                  <img
                    src={cash}
                    alt="Cash"
                    className="w-6 h-6 sm:w-8 sm:h-8 ml-auto sm:ml-0"
                  />
                </td>

                {/* Description */}
                <td
                  className="block sm:table-cell px-4 py-2 font-medium text-gray-800 text-right sm:text-left align-middle"
                  data-label="Description"
                >
                  Salary Received
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
                  className="block sm:table-cell px-4 py-2 text-green-500 text-right align-middle"
                  data-label="Amount"
                >
                  Rs. 3,000
                </td>

                {/* Balance */}
                <td
                  className="block sm:table-cell px-4 py-2 font-semibold text-right align-middle"
                  data-label="Balance"
                >
                  Rs. 28,000
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
