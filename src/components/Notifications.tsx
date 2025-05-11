"use client";
import { useState } from "react";
import Link from "next/link";
import greater_than from "../../public/icons/greater-than.svg";
import Image from "next/image";

const items = [
  {
    title: "Order Protection Added",
    desc: "Protection added for order #12345",
  },
  {
    title: "Shipping Issue Reported",
    desc: "A shipping issue has been reported",
  },
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<string>("Notifications");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b-1 border-gray-200 ">
        <h2 className="text-xl font-semibold">Notifications</h2>

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
          {["Notifications", "Settings", "Claims"].map((button) => (
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

      <div className="bg-white rounded-lg shadow-md p-2 mb-7">
        <ul className="space-y-4">
          {items.map((n, i) => (
            <li
              key={i}
              className={`flex justify-between items-center ${
                i === 0 ? "pb-4 border-b-1 border-gray-400" : ""
              }`}
            >
              <div>
                <p className="font-medium">{n.title}</p>
                <p className="text-sm text-gray-600">{n.desc}</p>
              </div>
              <button
                type="button"
                className="bg-white text-sm text-black font-semibold shadow-md py-2 px-4 rounded-md cursor-pointer hover:bg-[#cfcecf] transition duration-200 ease-in-out"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Link href={"#"}>
        <div className="flex justify-between items-center p-4 mb-4 bg-white rounded-lg shadow-md hover:bg-[#f7f7f7] transition duration-200 ease-in-out">
          Notifications
          <Image src={greater_than} alt="Check Shield" width={24} height={24} />
        </div>
      </Link>
    </div>
  );
}
