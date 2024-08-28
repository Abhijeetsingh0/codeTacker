'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTokenFromCookie } from './getUserData';
import LogoutButton from './logout';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = getTokenFromCookie;
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 py-4 text-white text-xl sticky top-0 z-50 border-b border-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl">
          CodeTracker
        </Link>
        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div
          className={`md:flex items-center space-x-4 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <Link href="/about" className="border border-white py-1 px-2 md:inline-block text-white hover:text-gray-400 pr-4">
            About
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="border border-white py-1 px-2 md:inline-block text-white hover:text-gray-400 pr-4">
                Dashboard
              </Link>
              <Link href="/blog" className="border border-white py-1 px-2 md:inline-block text-white hover:text-gray-400 pr-4">
                Blog
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/auth/login" className="border border-white py-1 px-2 md:inline-block text-white hover:text-gray-400 pr-4">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
