'use client'
// components/Navbar.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTokenFromCookie } from './getTokenFromCookie';
import LogoutButton from './logout';
import { useGlobalState } from '@/contexts/globalStataeContext';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {token} = useGlobalState()

  useEffect(() => {
    const token = getTokenFromCookie
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">CodeTracker</Link>
        <button className="md:hidden" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'} space-x-4`}>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="block md:inline-block text-white hover:text-gray-400">Dashboard</Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/auth/login" className="block md:inline-block text-white hover:text-gray-400">Login</Link>
          )}
          <Link href="/about" className="block md:inline-block text-white hover:text-gray-400">About</Link>
      
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
