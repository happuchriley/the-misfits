import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navigation = ({ cartCount = 0, user = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-md border-b border-gray-200">
      <div className="max-w-2xl md:max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 relative">
          {/* Hamburger (left, mobile only) */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-900 hover:text-[#FF6F3C] transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop nav links (left) */}
          <div className="hidden md:flex items-center space-x-8 flex-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-base font-medium px-2 py-1 rounded transition-colors duration-200 ${location.pathname === link.to ? 'text-[#FF6F3C] bg-orange-50' : 'text-gray-900 hover:text-[#FF6F3C] hover:bg-orange-50'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo (center) */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center select-none">
            <span className="text-2xl md:text-3xl font-extrabold tracking-widest text-gray-900" style={{ letterSpacing: '0.15em' }}>
              THE-<span className="text-[#FF6F3C]">MISFITS</span>
            </span>
          </Link>

          {/* Actions (right) */}
          <div className="flex items-center space-x-4 md:ml-auto">
            {/* Desktop Search Bar */}
            <form
              action="/search"
              method="GET"
              className="hidden md:flex items-center bg-gray-100 rounded-xl px-2 py-1 mr-2"
              style={{ minWidth: '220px' }}
              onSubmit={e => {
                // Let browser handle navigation
              }}
            >
              <input
                type="text"
                name="query"
                placeholder="Search..."
                className="bg-transparent px-2 py-1 w-full focus:outline-none text-gray-900"
                autoComplete="off"
              />
              <button type="submit" className="text-[#FF6F3C] px-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                </svg>
              </button>
            </form>
            <Link to="/cart" className="relative p-2 text-gray-900 hover:text-[#FF6F3C] transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6F3C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to={user ? "/account" : "/login"} className="p-2 text-gray-900 hover:text-[#FF6F3C] transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl shadow-xl rounded-b-xl animate-fade-in-down">
            {/* Mobile Search Bar */}
            <form
              action="/search"
              method="GET"
              className="flex items-center bg-gray-100 rounded-xl px-3 py-2 mt-3 mb-2 mx-2"
              style={{ minWidth: '0' }}
              onSubmit={e => {
                // Let browser handle navigation
              }}
            >
              <input
                type="text"
                name="query"
                placeholder="Search..."
                className="bg-transparent px-2 py-1 w-full focus:outline-none text-gray-900"
                autoComplete="off"
              />
              <button type="submit" className="text-[#FF6F3C] px-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                </svg>
              </button>
            </form>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 rounded text-base font-medium transition-colors duration-200 ${location.pathname === link.to ? 'text-[#FF6F3C] bg-orange-50' : 'text-gray-900 hover:text-[#FF6F3C] hover:bg-orange-50'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
