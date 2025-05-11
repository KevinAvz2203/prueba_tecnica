"use client";

import { items } from "@/dummy/items";
import check_shield from "../../public/check-shield.svg";
import Image from "next/image";

export default function Cart() {
  return (
    <div className="flex flex-col bg-white rounded-xl p-6 shadow-md space-y-9">
      <div className="flex justify-between items-center pb-4 mb-4 border-b-1 border-gray-200">
        <h1 className="text-2xl font-bold">Cart</h1>
        <span className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700">
          X
        </span>
      </div>

      <div className="border-b border-gray-200 pb-4 mb-6 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={64}
                height={64}
                className="w-16 h-16 rounded-md mr-4 bg-[#f2f2f3]"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
              </div>
            </div>
            <div className="text-lg font-semibold">${item.price}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Image src={check_shield} alt="Check Shield" width={24} height={24} />
        </div>
        <div>
          <p className="font-semibold">Add order protection</p>
          <p className="text-sm text-gray-600">against loss, damage or theft</p>
        </div>
        <div className="ml-auto">
          <p className="font-semibold">$2.99</p>
        </div>
      </div>

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
