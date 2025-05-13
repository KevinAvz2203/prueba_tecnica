"use client";

import check_shield from "../../public/check-shield.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import Error from "next/error";
import { Products } from "../interfaces/Products";

export default function Cart() {
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
        console.error("Error fetching items:", err);
        setError(err.message || "An unexpected error occurred");
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
    <div className="flex flex-col bg-[#fbfbfd] rounded-xl p-6 shadow-md space-y-9">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 mb-4 border-b-1 border-gray-200">
        <h1 className="text-2xl font-bold">Cart</h1>
        <span
          className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700"
          aria-label="Close cart"
        >
          X
        </span>
      </div>

      {/* Cart Items */}
      <div className="border-b border-gray-200 pb-4 mb-6 space-y-6">
        {items !== undefined &&
          items.products.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center w-full sm:w-auto">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="rounded-md mr-4 bg-[#f2f2f3]"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                </div>
              </div>
              <div className="text-lg font-semibold mt-2 sm:mt-0">
                ${item.price}
              </div>
            </div>
          ))}
      </div>

      {/* Order Protection */}
      <div className="flex items-center space-x-3 flex-wrap sm:flex-nowrap">
        <div className="flex-shrink-0">
          <Image src={check_shield} alt="Check Shield" width={24} height={24} />
        </div>
        <div className="flex-1">
          <p className="font-semibold">Add order protection</p>
          <p className="text-sm text-gray-600">against loss, damage or theft</p>
        </div>
        <div className="ml-auto mt-2 sm:mt-0">
          <p className="font-semibold">$2.99</p>
        </div>
      </div>

      {/* Checkout Button */}
      <div>
        <button
          type="button"
          onClick={() => alert("Sending to checkout...")}
          className="bg-[#0a724d] text-white text-2xl font-semibold py-2 px-4 rounded-md w-full cursor-pointer hover:bg-[#106246] transition duration-200 ease-in-out"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
