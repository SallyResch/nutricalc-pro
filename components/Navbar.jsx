"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-[var(--speccolor)] text-[var(--foreground)] shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <h1 className="font-bold text-lg">NutriCalc Pro</h1>
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span className="block w-6 h-0.5 bg-[var(--foreground)] rounded"></span>
          <span className="block w-6 h-0.5 bg-[var(--foreground)] rounded"></span>
          <span className="block w-6 h-0.5 bg-[var(--foreground)] rounded"></span>
        </button>
        <ul
          className={`flex-col md:flex-row md:flex gap-8 md:gap-8 list-none m-0 p-0 absolute md:static top-16 right-0 bg-[var(--background)] md:bg-transparent shadow-lg md:shadow-none w-48 md:w-auto transition-all duration-300 ${
            open
              ? "flex opacity-100 pointer-events-auto"
              : "hidden md:flex opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto"
          }`}
        >
          <li>
            <a
              href="/"
              className="block px-4 py-2 md:p-0 text-[var(--foreground)] hover:text-green-300 font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/features"
              className="block px-4 py-2 md:p-0 text-[var(--foreground)] hover:text-green-300 font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="block px-4 py-2 md:p-0 text-[var(--foreground)] hover:text-green-300 font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;