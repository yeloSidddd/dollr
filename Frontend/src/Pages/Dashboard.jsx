import { useState, useEffect } from "react";
import axios from "axios";
import trendup from "../Resources/trendup.svg";
import wifi from "../Resources/wifi.svg";
import food from "../Resources/food.svg";
import shopping from "../Resources/shopping.svg";
import salary from "../Resources/cash.svg";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(wifi);

  // Form state
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [email, setEmail] = useState("");

  // Filter state
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch user email
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users/me", {
          withCredentials: true,
        });
        setEmail(res.data.email || "");
      } catch (err) {
        console.log("Not logged in or error:", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch transactions
  const fetchTransactions = async () => {
    if (!email) return;
    try {
      const res = await axios.get(
        `http://localhost:8080/api/users/${email}/transactions`
      );
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [email]);

  // Add new transaction
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const transactionData = {
      icon: selectedIcon,
      description,
      type,
      amount: parseFloat(amount),
      // Convert date to ISO string for backend
      date: date ? `${date}T00:00:00` : null,
    };
    try {
      await axios.post(
        `http://localhost:8080/api/users/${email}/transactions`,
        transactionData
      );
      fetchTransactions();
      // Reset form
      setDescription("");
      setAmount("");
      setType("income");
      setDate("");
      setSelectedIcon(wifi);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to add transaction:", err);
    }
  };

  const netWorth =
    transactions.length > 0 ? transactions[transactions.length - 1].balance : 0;

  // Filtered transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = filterType === "all" ? true : tx.type === filterType;
    const matchesSearch = tx.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <>
      {/* Top Section */}
      <div className="flex flex-row justify-between items-start px-6 pt-6 sm:px-10 sm:pt-10 gap-6">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      {/* Net Worth */}
      <div className="flex flex-row justify-between items-start p-6 sm:p-10 gap-6">
        <div>
          <p className="text-sm text-gray-400">Net Worth</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold mt-2 leading-tight">
            Rs. {netWorth.toLocaleString()}
          </h1>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <p className="text-sm text-gray-400">Trend</p>
          <img
            src={trendup}
            alt="Trend Up"
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto mt-2"
          />
        </div>
      </div>

      {/* Search & Filters */}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-3 bg-transparent outline-none text-sm w-full text-center leading-none"
          />
        </div>

        {/* Income Filter */}
        <button
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full flex-1 min-w-[200px] bg-gray-200 transition-all duration-150 ${
            filterType === "income"
              ? "ring-1 ring-green-500"
              : "hover:ring-1 hover:ring-gray-300"
          }`}
          onClick={() =>
            setFilterType((prev) => (prev === "income" ? "all" : "income"))
          }
        >
          <span className="text-sm font-medium">Income</span>
        </button>

        {/* Expense Filter */}
        <button
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full flex-1 min-w-[200px] bg-gray-200 transition-all duration-150 ${
            filterType === "expense"
              ? "ring-1 ring-red-500"
              : "hover:ring-1 hover:ring-gray-300"
          }`}
          onClick={() =>
            setFilterType((prev) => (prev === "expense" ? "all" : "expense"))
          }
        >
          <span className="text-sm font-medium">Expense</span>
        </button>

        {/* Add New Transaction */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-green-500 hover:bg-green-600 px-4 py-3 rounded-full flex-1 min-w-[200px]"
        >
          <span className="flex-grow text-sm text-white text-center leading-none">
            Add New Transaction
          </span>
        </button>
      </div>

      {/* Transactions Table */}
      <div className="px-6 sm:px-10 pb-10">
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto border-none border-gray-200 rounded-md">
          <table className="min-w-full border-separate border-spacing-y-2 text-xs sm:text-sm md:text-base">
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="bg-white shadow-sm block sm:table-row mb-4 sm:mb-0 rounded-lg sm:rounded-none"
                >
                  <td
                    className="block sm:table-cell px-4 py-2 text-right sm:text-left align-middle"
                    data-label="Icon"
                  >
                    <img
                      src={tx.icon}
                      alt="Icon"
                      className="w-6 h-6 sm:w-8 sm:h-8 ml-auto sm:ml-0"
                    />
                  </td>

                  <td
                    className="block sm:table-cell px-4 py-2 font-medium text-gray-800 text-right sm:text-left align-middle"
                    data-label="Description"
                  >
                    {tx.description}
                  </td>

                  <td
                    className="block sm:table-cell px-4 py-2 text-gray-500 text-right sm:text-center align-middle"
                    data-label="Date"
                  >
                    {new Date(tx.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td
                    className={`block sm:table-cell px-4 py-2 text-right align-middle ${
                      tx.type === "expense" ? "text-red-600" : "text-green-600"
                    }`}
                    data-label="Amount"
                  >
                    {tx.type === "expense" ? "-" : "+"}Rs.{" "}
                    {tx.amount.toLocaleString()}
                  </td>

                  <td
                    className="block sm:table-cell px-4 py-2 font-semibold text-right align-middle"
                    data-label="Balance"
                  >
                    Rs. {tx.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Transaction</h3>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleAddTransaction}
            >
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Choose Icon
                </p>
                <div className="flex gap-3 flex-wrap">
                  {[wifi, food, shopping, salary].map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={`p-2 rounded-lg border ${
                        selectedIcon === icon
                          ? "border-green-500 ring-2 ring-green-500"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <img src={icon} alt="icon" className="w-8 h-8" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile table labels */}
      <style>
        {`
          @media (max-width: 639px) {
            table tbody tr td {
              position: relative;
              padding-left: 3rem;
              text-align: right !important;
            }
            table tbody tr td::before {
              content: attr(data-label);
              position: absolute;
              left: 0.5rem;
              top: 50%;
              transform: translateY(-50%);
              font-weight: 600;
              color: #4B5563;
              white-space: nowrap;
            }
          }
        `}
      </style>
    </>
  );
}
