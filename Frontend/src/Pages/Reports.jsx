import ApexCharts from "apexcharts";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [email, setEmail] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [activeButton, setActiveButton] = useState("all");
  const [chartData, setChartData] = useState({
    categories: [],
    data: [],
  });
  const chartInstance = useRef(null);
  const chartRef = useRef(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users/me", {
          withCredentials: true,
        });
        setEmail(res.data.email || "");
      } catch (err) {
        console.log("Not logged in or ", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch all transactions
  useEffect(() => {
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
    fetchTransactions();
  }, [email]);

  // Fetch balance history for chart
  useEffect(() => {
    const fetchChartData = async () => {
      if (!email) return;
      try {
        const res = await axios.get(
          `http://localhost:8080/api/users/${email}/balance-history?period=${activeButton}`
        );
        const { categories, balances } = res.data || {
          categories: [],
          balances: [],
        };
        setChartData({ categories, data: balances });
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
      }
    };
    fetchChartData();
  }, [email, activeButton]);

  // Initialize chart once
  useEffect(() => {
    if (!chartRef.current || chartInstance.current) return;

    chartInstance.current = new ApexCharts(chartRef.current, {
      chart: {
        type: "line",
        height: 250,
        toolbar: { show: false },
        background: "transparent",
        sparkline: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
        lineCap: "round",
      },
      colors: ["#3AC249"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          gradientToColors: ["#000000"],
          opacityFrom: 1,
          opacityTo: 0.8,
        },
      },
      series: [
        {
          name: "Balance",
          data: [],
        },
      ],
      xaxis: {
        type: "datetime",
        categories: [],
        labels: {
          show: true,
          style: {
            fontSize: "12px",
            colors: "#666",
          },
          rotate: -45,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      tooltip: {
        enabled: true,
        x: {
          formatter: (val, opts) => {
            const index = opts.dataPointIndex;
            return chartData.categories && chartData.categories[index]
              ? chartData.categories[index]
              : "N/A";
          },
        },
        y: {
          formatter: (val) => `Balance: ${val ? val.toFixed(2) : "0.00"}`,
        },
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    });

    chartInstance.current.render();
  }, []);

  // Update chart when data changes
  useEffect(() => {
    if (chartInstance.current && chartData.categories.length > 0) {
      // Convert date strings to timestamps for datetime x-axis
      const timestamps = chartData.categories.map((date) => {
        // Handle both date-only and datetime strings
        const cleanDate = date.includes("T") ? date.split("T")[0] : date;
        return new Date(cleanDate + "T12:00:00").getTime();
      });

      let seriesData = chartData.data.map((value, index) => ({
        x: timestamps[index],
        y: value,
      }));

      // If we have only 1 data point, create a smooth line by adding padding points
      if (seriesData.length === 1) {
        const singlePoint = seriesData[0];
        const dayMs = 24 * 60 * 60 * 1000;

        seriesData = [
          { x: singlePoint.x - dayMs, y: singlePoint.y },
          { x: singlePoint.x, y: singlePoint.y },
          { x: singlePoint.x + dayMs, y: singlePoint.y },
        ];
      } else if (seriesData.length === 2) {
        // For 2 points, add one point in between for smoother curve
        const [point1, point2] = seriesData;
        const midPoint = {
          x: (point1.x + point2.x) / 2,
          y: (point1.y + point2.y) / 2,
        };
        seriesData = [point1, midPoint, point2];
      }

      chartInstance.current.updateSeries([
        {
          name: "Balance",
          data: seriesData,
        },
      ]);
    }
  }, [chartData]);

  const handleButtonClick = (period) => setActiveButton(period);

  // Summary
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Panel */}
      <div className="w-full md:flex-[3] flex flex-col h-full">
        <div className="flex justify-between items-start p-6 sm:p-10 gap-4">
          <h2 className="text-xl font-semibold">Report</h2>
        </div>

        {/* Chart */}
        <div className="p-6 sm:p-10 w-full" ref={chartRef} />

        {/* Period buttons */}
        <div className="flex justify-center items-center px-6 py-6 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "1D", value: "1d" },
              { label: "1W", value: "1w" },
              { label: "1M", value: "1m" },
              { label: "1Y", value: "1y" },
              { label: "ALL", value: "all" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleButtonClick(btn.value)}
                className={`px-5 py-2 md:px-8 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeButton === btn.value
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="flex justify-between items-start p-6 sm:p-10 gap-4">
          <h2 className="text-xl font-semibold">Summary</h2>
        </div>
        <div className="px-6 sm:px-10 space-y-2">
          <p className="text-green-600 font-medium">
            Income: ${totalIncome.toFixed(2)}
          </p>
          <p className="text-red-600 font-medium">
            Expenses: ${totalExpense.toFixed(2)}
          </p>
          <p className="text-black font-semibold">
            Net Balance: ${netBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <main className="w-full md:flex-[1] bg-gray-200 overflow-auto max-h-screen">
        <div className="flex justify-between items-start p-6 sm:p-10 gap-4">
          <h1 className="text-lg font-medium">Where did your money go?</h1>
        </div>
      </main>
    </div>
  );
}
