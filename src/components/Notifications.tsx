"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import greater_than from "../../public/icons/greater-than.svg";
import Image from "next/image";
import Navbar from "./Navbar";
import { Products } from "@/interfaces/Products";

const navbarUrls = ["Notifications", "Settings", "Claims"];

export default function Notifications() {
  const [items, setItems] = useState<Products>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DUMMY_JSON_URL}/products/?limit=3`
        );
        if (!response.ok) {
          throw { message: "Failed to fetch items" };
        }
        const data: Products = await response.json();
        setItems(data);
      } catch (err: Error | any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#fbfbfd] rounded-xl p-6 shadow-md max-w-4xl mx-auto">
      {/* Header */}
      <Navbar Title={"Notifications"} NavbarURLs={navbarUrls} />

      {/* Notifications List */}
      <div className="flex flex-col bg-white rounded-lg shadow-md p-7 mb-8">
        <ul className="space-y-6">
          {items !== undefined &&
            items.products.map((n, i) => (
              <li
                key={i}
                className={`flex flex-wrap justify-between items-center ${
                  i % 2 !== 0 ? "mb-4 py-4 border-y-1 border-gray-400" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">SKU: {n.sku}</p>
                  <p className="text-sm text-gray-600 truncate">
                    Recently updated to: {n.warrantyInformation}
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-white text-sm text-black font-semibold shadow-md py-2 px-4 rounded-md cursor-pointer hover:bg-[#cfcecf] transition duration-200 ease-in-out mt-2 sm:mt-0"
                >
                  Edit
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* Notifications Link */}
      <Link href={"#"}>
        <div className="flex justify-between items-center p-6 mt-5 mb-4 bg-white rounded-lg shadow-md hover:bg-[#f7f7f7] transition duration-200 ease-in-out">
          <span className="text-sm sm:text-base font-medium">
            View All Notifications
          </span>
          <Image
            src={greater_than}
            alt="Greater Than Icon"
            width={20}
            height={24}
          />
        </div>
      </Link>
    </div>
  );
}
