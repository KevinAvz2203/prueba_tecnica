"use client";
import { useState } from "react";
import { reportsData } from "@/dummy/reportsData";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Datos para el gráfico
const chartOptions = {
  chart: {
    id: "protection-added-chart",
    toolbar: { show: false },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May"],
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
    name: "Claims Summary",
    data: [40, 20, 80, 16, 10], // Datos dummy
  },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState<string>("Reports");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#fbfbfd] rounded-xl p-6 shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b-1 border-gray-200 ">
        <h1 className="text-2xl font-bold">Reports</h1>

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
          {["Reports"].map((button) => (
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
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-lg shadow-md p-2 mb-4">
        {reportsData.map((report) => (
          <div key={report.label} className="flex flex-col items-center p-4">
            <p className="text-sm text-gray-500 max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {report.label}
            </p>
            <p className="text-xl font-semibold max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {report.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-2 ">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 pb-1 border-b-1 border-gray-200 ">
          Claims Summary
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-gray-200">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={113}
          />

          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600">
                <th>Claim</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {[
                { id: "C-1003", date: "10/15/2023", status: "Resolved" },
                { id: "C-1002", date: "10/14/2023", status: "Pending" },
                { id: "C-1001", date: "10/03/2023", status: "Approved" },
              ].map((r, i) => (
                <tr key={i}>
                  <td>{r.id}</td>
                  <td>{r.date}</td>
                  <td
                    className={`${
                      r.status === "Resolved" || r.status === "Approved"
                        ? "text-green-500"
                        : r.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {r.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
