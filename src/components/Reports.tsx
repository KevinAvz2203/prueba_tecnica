"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import { Products } from "@/interfaces/Products";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const navbarUrls = ["Reports"];

export default function Reports() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Products>();
  const [reportStats, setReportStats] = useState([
    { label: "Total Categories", value: 0 },
    { label: "Total Products", value: 0 },
    { label: "Cheapest Item", value: 0 },
  ]);
  const [chartData, setChartData] = useState<{
    categories: string[];
    data: number[];
  }>({
    categories: [],
    data: [],
  });
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

        console.log(data_categories);

        if (data_products.products && data_products.products.length > 0) {
          setReportStats([
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
          ]);

          setCategories(data_categories);

          // Calculate chart data
          const categoryCounts = data_categories
            .slice(0, 4)
            .map((category: string) => {
              const count = data_products.products.filter(
                (product) => product.category === category
              ).length;
              return { category, count };
            });

          setChartData({
            categories: categoryCounts.map(
              (item: { category: string; count: number }) => item.category
            ),
            data: categoryCounts.map(
              (item: { category: string; count: number }) => item.count
            ),
          });
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

  // Chart options and data
  const chartOptions = {
    chart: {
      id: "products-by-category-chart",
      toolbar: { show: false },
    },
    xaxis: {
      categories: chartData.categories,
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
      name: "Products by Category",
      data: chartData.data,
    },
  ];

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#fbfbfd] rounded-xl p-6 shadow-md max-w-6xl mx-auto">
      {/* Header */}
      <Navbar Title={"Reports"} NavbarURLs={navbarUrls} />

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-lg shadow-md p-4 mb-4">
        {reportStats.map((report) => (
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

      {/* Chart and Table */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Productos x Categoría
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Chart */}
          <div className="flex-1">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={200}
            />
          </div>

          {/* Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-gray-600 border-b">
                  <th className="py-2 px-4">Claim</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {[
                  { id: "C-1003", date: "10/15/2023", status: "Resolved" },
                  { id: "C-1002", date: "10/14/2023", status: "Pending" },
                  { id: "C-1001", date: "10/03/2023", status: "Approved" },
                ].map((r, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2 px-4">{r.id}</td>
                    <td className="py-2 px-4">{r.date}</td>
                    <td
                      className={`py-2 px-4 ${
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
    </div>
  );
}
