import ApexCharts from "apexcharts";
import { useEffect, useRef } from "react";

export default function Reports() {
  const chartInstance = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    chartInstance.current = new ApexCharts(chartRef.current, {
      chart: {
        type: "line",
        width: "100%",
        height: 200,
        toolbar: {
          show: false,
        },
      },

      stroke: {
        curve: "smooth",
      },

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

      series: [
        {
          name: "chart",
          data: [10, 20, 30, 40, 50],
        },
      ],

      xaxis: {
        categories: ["jan", "feb", "mar", "apr", "may"],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },

      yaxis: {
        show: false,
      },

      grid: {
        show: false,
      },
    });

    chartInstance.current.render();

    return () => {
      chartInstance.current.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left side bigger */}
      <div className="flex-[3] flex flex-col h-full">
        <div className="flex flex-row justify-between items-start p-6 sm:p-10 gap-6">
          <h1>Report</h1>
        </div>
        <div
          className="p-6 sm:p-10 flex-grow"
          ref={chartRef}
          style={{ width: "100%", height: 200, minHeight: 0 }}
        />
      </div>

      {/* Right side smaller, grey background */}
      <main className="flex-[1] bg-gray-200 overflow-auto h-full">
        <div className="flex flex-row justify-between items-start p-6 sm:p-10 gap-6">
          <h1>Right</h1>
        </div>
        {/* Add more content here if needed */}
      </main>
    </div>
  );
}
