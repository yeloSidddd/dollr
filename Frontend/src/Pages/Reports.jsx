import ApexCharts from "apexcharts";
import { useEffect, useRef, useState, useCallback } from "react";

const chartData = {
  "1d": {
    categories: ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    data: [45, 52, 38, 65, 58],
  },
  "1w": {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [30, 40, 35, 50, 49, 60, 70],
  },
  "1m": {
    categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [20, 45, 35, 80],
  },
  "1y": {
    categories: ["Q1", "Q2", "Q3", "Q4"],
    data: [65, 59, 80, 95],
  },
  all: {
    categories: ["2020", "2021", "2022", "2023", "2024"],
    data: [10, 25, 40, 65, 90],
  },
};

export default function Reports() {
  
  const chartInstance = useRef(null);
  const chartRef = useRef(null);
  const [activeButton, setActiveButton] = useState("all");

  const initializeChart = useCallback((period = "all") => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
      console.log("Hello");
    }

    if (!chartRef.current) return;

    chartInstance.current = new ApexCharts(chartRef.current, {
      chart: {
        type: "line",
        width: "100%",
        height: 200,
        toolbar: { show: false },
      },
      stroke: { curve: "smooth" },
      colors: ["#3AC249", "#000000"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["#000000"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      series: [{ name: "chart", data: chartData[period].data }],
      xaxis: {
        categories: chartData[period].categories,
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { show: false },
      grid: { show: false },
    });

    chartInstance.current.render();
  }, []);

  useEffect(() => {
    initializeChart(activeButton);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [activeButton, initializeChart]);

  const handleButtonClick = (period) => {
    setActiveButton(period);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Panel */}
      <div className="w-full md:flex-[3] flex flex-col h-full">
        <div className="flex flex-row justify-between items-start p-6 sm:p-10 md:p-10 gap-4">
          <h2 className="text-xl font-semibold">Report</h2>
        </div>

        {/* Chart */}
        <div className="p-6 sm:p-10 md:p-10 w-full" ref={chartRef} />

        {/* Button group */}
        <div className="flex justify-center items-center px-6 py-6 sm:px-6 sm:py-0">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "1D", value: "1d" },
              { label: "1W", value: "1w" },
              { label: "1M", value: "1m" },
              { label: "1Y", value: "1y" },
              { label: "ALL", value: "all" },
            ].map((button) => (
              <button
                key={button.value}
                onClick={() => handleButtonClick(button.value)}
                className={`px-5 py-2 md:px-8 rounded-full text-sm font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5 ${
                  activeButton === button.value
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-row justify-between items-start p-6 sm:p-10 md:px-10 md:pt-10 md:pb-6 gap-4">
          <h2 className="text-xl font-semibold">Summary</h2>
        </div>

        <div className="px-6 sm:px-10 md:px-10">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>

      {/* Right Panel */}
      <main className="w-full md:flex-[1] bg-gray-200 overflow-auto max-h-screen">
        <div className="flex flex-row justify-between items-start p-6 sm:p-10 md:p-10 gap-4">
          <h1 className="text-lg font-medium">Where did your money go?</h1>
        </div>
        {/* Add right panel content here */}
      </main>
    </div>
  );
}
