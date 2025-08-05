import cash from "../Resources/cash.svg";

export default function Notification() {
  return (
    <>
      <div className="flex flex-row justify-between items-start p-6 sm:p-10 gap-6">
        <h2 className="text-xl font-semibold">Notification</h2>
      </div>

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
                    src={cash}
                    alt="Cash Icon"
                    className="w-6 h-6 sm:w-8 sm:h-8 ml-auto sm:ml-0"
                  />
                </td>

                {/* Description */}
                <td
                  className="block sm:table-cell px-4 py-2 font-medium text-gray-800 text-right sm:text-left align-middle"
                  data-label="Description"
                >
                  Check Out the new Premium Features
                </td>

                {/* Date */}
                <td
                  className="block sm:table-cell px-4 py-2 text-gray-500 text-right sm:text-center align-middle"
                  data-label="Date"
                ></td>

                {/* Amount */}
                <td
                  className="block sm:table-cell px-4 py-2 text-red-600 text-right align-middle"
                  data-label="Amount"
                ></td>

                {/* Balance */}
                <td
                  className="block sm:table-cell px-4 py-2 text-gray-500 text-right align-middle"
                  data-label="Date"
                >
                  13-Apr-2025
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
                    alt="Cash Icon"
                    className="w-6 h-6 sm:w-8 sm:h-8 ml-auto sm:ml-0"
                  />
                </td>

                {/* Description */}
                <td
                  className="block sm:table-cell px-4 py-2 font-medium text-gray-800 text-right sm:text-left align-middle"
                  data-label="Description"
                >
                  Check Out the new Premium Features
                </td>

                {/* Date */}
                <td
                  className="block sm:table-cell px-4 py-2 text-gray-500 text-right sm:text-center align-middle"
                  data-label="Date"
                ></td>

                {/* Amount */}
                <td
                  className="block sm:table-cell px-4 py-2 text-red-600 text-right align-middle"
                  data-label="Amount"
                ></td>

                {/* Balance */}
                <td
                  className="block sm:table-cell px-4 py-2 text-gray-500 text-right align-middle"
                  data-label="Date"
                >
                  13-Apr-2025
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
