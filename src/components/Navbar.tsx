"use client";

import { useState } from "react";

interface NavbarProps {
  Title: string;
  NavbarURLs: string[];
}

export default function Navbar(props: NavbarProps) {
  const { Title, NavbarURLs } = props;

  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b-1 border-gray-200 ">
      <h1 className="text-2xl font-bold">{Title}</h1>

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
        {NavbarURLs.map((button) => (
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
  );
}
