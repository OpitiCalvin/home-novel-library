"use client";

import {
  faBook,
  faCirclePlus,
  faFaceSmile,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Function to close menu when a link is clicked
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <nav className="p-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        {/* <div className="text-black dark:text-white text-2xl font-semibold"> */}
        <div>
          <Link
            href="/"
            className="text-black dark:text-white text-2xl font-semibold"
          >
            Novel Library
          </Link>
        </div>
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/books"
            className="text-black dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-400"
          >
            Library
          </Link>
          <Link
            href="/add-book"
            className="text-black dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-400"
          >
            Add a Book
          </Link>
          <Link
            href="/add-cover-images"
            className="text-black dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-400"
          >
            Add Cover Images
          </Link>
          <Link
            href="/authors"
            className="text-black dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-400"
          >
            Authors
          </Link>
          <Link
            href="/genres"
            className="text-black dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-400"
          >
            Genres
          </Link>
        </div>
        {/* Mobile hamburger button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-black dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white dark:bg-gray-700 text-black dark:text-white space-y-4 mt-4 p-4`}
      >
        <Link
          href="/books"
          onClick={handleLinkClick}
          className="block hover:text-gray-400"
        >
          <FontAwesomeIcon
            icon={faBook}
            className="text-gray-400 text-lg leading-lg mr-2"
          />{" "}
          Library
        </Link>
        <Link
          href="/add-book"
          onClick={handleLinkClick}
          className="block hover:text-gray-400"
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="text-gray-400 text-lg leading-lg mr-2"
          />{" "}
          Add a Book
        </Link>
        <Link
          href="/add-cover-images"
          onClick={handleLinkClick}
          className="block hover:text-gray-400"
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="text-gray-400 text-lg leading-lg mr-2"
          />{" "}
          Add Cover Images
        </Link>
        <Link
          href="/authors"
          onClick={handleLinkClick}
          className="block hover:text-gray-400"
        >
          <FontAwesomeIcon
            icon={faFaceSmile}
            className="text-gray-400 text-lg leading-lg mr-2"
          />{" "}
          Authors
        </Link>
        <Link
          href="/genres"
          onClick={handleLinkClick}
          className="block hover:text-gray-400"
        >
          <FontAwesomeIcon
            icon={faFileAlt}
            className="text-gray-400 text-lg leading-lg mr-2"
          />{" "}
          Genres
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
