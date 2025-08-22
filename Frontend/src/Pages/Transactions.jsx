import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Transactions() {
  const [email, setEmail] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users/me", {
          withCredentials: true,
        });
        setEmail(res.data.email || "");
      } catch (err) {
        console.log("Not logged in or error:", err);
        console.log("test");
      }
    };
    fetchUser();
  }, []);

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

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const txDate = new Date(tx.date);
    const afterFrom = fromDate ? txDate >= new Date(fromDate) : true;
    const beforeTo = toDate ? txDate <= new Date(toDate) : true;
    return matchesSearch && afterFrom && beforeTo;
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    let totalIncome = 0;
    let totalExpense = 0;
    filteredTransactions.forEach((tx) => {
      if (tx.type === "expense") totalExpense += tx.amount;
      else totalIncome += tx.amount;
    });

    // HEADER
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Transaction Statement", 14, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Generated on: ${currentDate}`, 14, 28);
    doc.text(`Account Holder: ${email}`, 14, 34);
    doc.setFont("helvetica", "bold");
    doc.text("Dollr", 160, 20); // logo text top-right

    // FILTER INFO
    let filterInfo = [];
    if (searchTerm) filterInfo.push(`Search: "${searchTerm}"`);
    if (fromDate)
      filterInfo.push(`From: ${new Date(fromDate).toLocaleDateString("en-GB")}`);
    if (toDate)
      filterInfo.push(`To: ${new Date(toDate).toLocaleDateString("en-GB")}`);
    if (filterInfo.length > 0) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.text(`Filters Applied: ${filterInfo.join(" | ")}`, 14, 42);
    }

    // TABLE
    const tableColumn = ["Date", "Description", "Type", "Amount (Rs.)", "Balance (Rs.)"];
    const tableRows = filteredTransactions.map((tx) => [
      new Date(tx.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      tx.description,
      tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
      `${tx.type === "expense" ? "-" : "+"}${tx.amount.toLocaleString()}`,
      tx.balance.toLocaleString(),
    ]);

    autoTable(doc, {
      startY: filterInfo.length > 0 ? 48 : 44,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
      styles: { font: "helvetica", fontSize: 10, cellPadding: 3 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    // SUMMARY
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Summary", 14, finalY);
    finalY += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Total Income: Rs. ${totalIncome.toLocaleString()}`, 14, finalY);
    finalY += 6;
    doc.text(`Total Expense: Rs. ${totalExpense.toLocaleString()}`, 14, finalY);
    finalY += 6;
    doc.text(
      `Net Amount: ${totalIncome - totalExpense >= 0 ? "+" : "-"} Rs. ${Math.abs(
        totalIncome - totalExpense
      ).toLocaleString()}`,
      14,
      finalY
    );

    // FOOTER
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(
      "This statement was generated electronically by Dollr Financial Management System.",
      14,
      285
    );
    doc.text("For support, please contact your account manager.", 14, 290);

    // SAVE PDF
    let filename =
      "Dollr_Transaction_Statement_" +
      new Date().toISOString().split("T")[0] +
      ".pdf";
    if (searchTerm)
      filename =
        filename.replace(".pdf", "") +
        "_" +
        searchTerm.replace(/[^a-zA-Z0-9]/g, "") +
        ".pdf";
    doc.save(filename);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-start p-6 sm:p-10 gap-6">
        <h2 className="text-xl font-semibold">Transactions</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 px-6 sm:px-10 pb-10">
        <div className="flex items-center bg-gray-200 rounded-full px-4 py-3 flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-3 bg-transparent outline-none text-sm w-full text-center leading-none"
          />
        </div>
        <div className="flex items-center bg-gray-200 rounded-full px-4 py-3 flex-1 min-w-[200px]">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="ml-3 bg-transparent outline-none text-sm w-full text-center leading-none"
          />
        </div>
        <div className="flex items-center bg-gray-200 rounded-full px-4 py-3 flex-1 min-w-[200px]">
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="ml-3 bg-transparent outline-none text-sm w-full text-center leading-none"
          />
        </div>
        <button
          onClick={exportPDF}
          className="flex items-center bg-green-500 hover:bg-green-600 px-4 py-3 rounded-full flex-1 min-w-[200px]"
        >
          <span className="flex-grow text-sm text-white text-center leading-none">
            Export PDF
          </span>
        </button>
      </div>

      {/* Transactions Table */}
     <div className="px-6 sm:px-10 pb-10">
        <div className="overflow-x-auto max-h-[54 0px] overflow-y-auto border-none border-gray-200 rounded-md">
          <table className="min-w-full border-separate border-spacing-y-2 text-xs sm:text-sm md:text-base">
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="bg-white shadow-sm block sm:table-row mb-4 sm:mb-0 rounded-lg sm:rounded-none"
                  >
                    {/* Logo/Icon */}
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

                    {/* Description */}
                    <td
                      className="block sm:table-cell px-4 py-2 font-medium text-gray-800 text-right sm:text-left align-middle"
                      data-label="Description"
                    >
                      {tx.description}
                    </td>

                    {/* Date */}
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

                    {/* Amount */}
                    <td
                      className={`block sm:table-cell px-4 py-2 text-right align-middle ${
                        tx.type === "expense" ? "text-red-600" : "text-green-600"
                      }`}
                      data-label="Amount"
                    >
                      {tx.type === "expense" ? "-" : "+"}Rs.{" "}
                      {tx.amount.toLocaleString()}
                    </td>

                    {/* Balance */}
                    <td
                      className="block sm:table-cell px-4 py-2 font-semibold text-right align-middle"
                      data-label="Balance"
                    >
                      Rs. {tx.balance.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile table label CSS */}
      <style>{`
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
      `}</style>
    </>
  );
}
