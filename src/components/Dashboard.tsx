"use client";

import { dashboardStats } from "@/dummy/dashboardData";
import { useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Datos para el gráfico
const chartOptions = {
  chart: {
    id: "protection-added-chart",
    toolbar: { show: false },
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
  },
  stroke: {
    curve: "smooth" as "smooth",
  },
  colors: ["#4F46E5"],
  dataLabels: {
    enabled: false,
  },
};

const chartSeries = [
  {
    name: "Protection Added",
    data: [10, 20, 30, 40, 30, 60, 70, 64, 90, 100], // Datos dummy
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b-1 border-gray-200 ">
        <h2 className="text-xl font-semibold">Insure Booster</h2>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <nav
          id="navbar-default"
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row w-full md:w-auto`}
        >
          {["Dashboard", "Settings", "Claims", "Notifications", "Reports"].map(
            (button) => (
              <button
                key={button}
                onClick={() => {
                  setActiveTab(button);
                  setIsMenuOpen(false);
                }}
                className={`w-full md:w-auto text-left md:text-center py-2 md:py-0 md:px-4 text-gray-500 hover:text-gray-800 relative ${
                  activeTab === button ? "text-gray-800 font-semibold" : ""
                }`}
              >
                {button}
                {activeTab === button && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#84848f]"></span>
                )}
              </button>
            )
          )}
        </nav>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-lg shadow-md p-2 mb-4">
        {dashboardStats.map((card) => (
          <div key={card.label} className="flex flex-col items-center p-4">
            <p className="text-sm text-gray-500 max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {card.label}
            </p>
            <p className="text-xl font-semibold max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-2">
        <h2 className="text-xl font-semibold mt-4 mb-2 text-gray-800">
          Protection Added Over Time
        </h2>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={130}
        />
      </div>
    </div>
  );
}
