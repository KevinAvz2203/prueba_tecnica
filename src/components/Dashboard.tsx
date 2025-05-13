"use client";

import { dashboardStatsDummy } from "../dummy/dashboardData";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { Products } from "@/interfaces/Products";
import dayjs from "dayjs";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Navbar URLs dummy
const navbarUrls = [
  "Dashboard",
  "Settings",
  "Claims",
  "Notifications",
  "Reports",
];

// Months for the chart
const months = [
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
  "Nov",
  "Dec",
];

export default function Dashboard() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Products>();
  const [dashboardStats, setDashboardStats] = useState([
    { label: "Total Categories", value: 0 },
    { label: "Total Products", value: 0 },
    { label: "Cheapest Item", value: 0 },
    { label: "Most Expensive Item", value: 0 },
  ]);
  const [chartData, setChartData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products and categories from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const product = await fetch(
          `${process.env.NEXT_PUBLIC_DUMMY_JSON_URL}/products`
        );
        if (!product.ok) throw new Error("Failed to fetch items");
        const data_products: Products = await product.json();
        setProducts(data_products);

        const category = await fetch(
          `${process.env.NEXT_PUBLIC_DUMMY_JSON_URL}/products/category-list`
        );
        if (!category.ok) throw new Error("Failed to fetch categories");
        const data_categories = await category.json();

        // Filling the dashboard stats with real values
        if (data_products.products && data_products.products.length > 0) {
          setDashboardStats([
            { label: "Total Categories", value: data_categories.length || 0 },
            { label: "Total Products", value: data_products.total || 0 },
            {
              label: "Cheapest Item",
              value: `$${
                Math.min(
                  ...data_products.products.map((product) => product.price)
                ) || 0
              }`,
            },
            {
              label: "Most Expensive Item",
              value: `$${
                Math.max(
                  ...data_products.products.map((product) => product.price)
                ) || 0
              }`,
            },
          ]);

          const monthlyData: { [key: string]: number } = {};

          // * Here I am using the dummy data to simulate the API response because all the API products were created in the same date
          // data_products.products.forEach((product) => {
          dashboardStatsDummy.products.forEach((product) => {
            const month = dayjs(product.meta.createdAt).format("MMM");
            monthlyData[month] = (monthlyData[month] || 0) + 1;
          });

          const chartCategories = months.filter((month) =>
            Object.keys(monthlyData).includes(month)
          );
          const chartValues = chartCategories.map(
            (month) => monthlyData[month]
          );

          setCategories(chartCategories);
          setChartData(chartValues);
        } else {
          setError("No products found");
        }
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: { id: "protection-added-chart", toolbar: { show: false } },
    xaxis: {
      categories: categories,
    },
    stroke: { curve: "smooth" as "smooth" },
    colors: ["#4F46E5"],
    dataLabels: { enabled: false },
  };

  const productsCreatedOverTime = [
    {
      name: "Products Created",
      data: chartData,
    },
  ];

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#fbfbfd] rounded-xl p-6 shadow-md max-w-5xl mx-auto">
      <Navbar Title={"Insure Booster"} NavbarURLs={navbarUrls} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-lg shadow-md p-4 mb-4">
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

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mt-4 mb-2 text-gray-800">
          Products Created Over Time
        </h2>
        <Chart
          options={chartOptions}
          series={productsCreatedOverTime}
          type="line"
          height={200}
        />
      </div>
    </div>
  );
}
