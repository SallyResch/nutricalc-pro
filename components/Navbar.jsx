"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-logo">NutriCalc Pro</span>
        <button
          className="navbar-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
        </button>
        <ul className={`navbar-links${open ? " open" : ""}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/features">Features</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
      <style jsx>{`
        .navbar {
          width: 100%;
          background: var(--speccolor);
          color: var(--foreground);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
        }
        .navbar-logo {
          font-weight: bold;
          font-size: 1.3rem;
        }
        .navbar-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .navbar-links li a {
          color: var(--foreground);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .navbar-links li a:hover {
          color: #38bdf8;
        }
        .navbar-toggle {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .navbar-toggle-bar {
          width: 24px;
          height: 3px;
          background: var(--foreground);
          border-radius: 2px;
        }
        @media (max-width: 768px) {
          .navbar-links {
            position: absolute;
            top: 60px;
            right: 0;
            background: var(--background);
            flex-direction: column;
            width: 180px;
            gap: 1.5rem;
            padding: 1.5rem 1rem;
            box-shadow: 0 4px 16px rgba(0,0,0,0.07);
            transform: translateX(100%);
            transition: transform 0.3s;
            pointer-events: none;
            opacity: 0;
          }
          .navbar-links.open {
            transform: translateX(0);
            pointer-events: auto;
            opacity: 1;
          }
          .navbar-toggle {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;