import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Brand */}
        <div className="text-white text-2xl font-bold tracking-wide">
          Store Rating & Review
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-200 hover:text-white transition duration-300 font-medium"
          >
            Home
          </Link>
          <Link
            to="/stores"
            className="text-gray-200 hover:text-white transition duration-300 font-medium"
          >
            Stores
          </Link>
          <Link
            to="/admin"
            className="text-gray-200 hover:text-white transition duration-300 font-medium"
          >
            Admin
          </Link>
          <Link
            to="/login"
            className="text-gray-200 hover:text-white transition duration-300 font-medium"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden text-gray-200 cursor-pointer">
          {/* You can add a hamburger menu here for mobile */}
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
