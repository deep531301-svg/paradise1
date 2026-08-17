import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaSearch, FaMoon, FaSun, FaWhatsapp, FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useWishlist } from "../../context/WishlistContext";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";
import { CONTACT_INFO } from "../../constants";
import MobileMenu from "../navigation/MobileMenu";

const Navbar = ({ onOpenWishlist }) => {
  const { theme, toggleTheme } = useTheme();
  const { wishlistCount } = useWishlist();
  const { siteContent } = useProducts();
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll detection to update header styles
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Products", path: "/products" },
    { label: "Brands", path: "/brands" },
    { label: "Services", path: "/services" },
    { label: "Gallery", path: "/gallery" },
    { label: "Offers", path: "/offers" },
    { label: "Contact", path: "/contact" },
  ];

  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-primary dark:text-gold border-b-2 border-primary dark:border-gold py-1 font-semibold text-sm tracking-wide"
      : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-gold py-1 transition-colors duration-200 text-sm tracking-wide font-medium";

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full pointer-events-none">
        {/* 1. Announcement Bar */}
        <div 
          className={`bg-primary dark:bg-gray-900 text-white text-center text-xs font-medium tracking-wider flex items-center justify-center border-b border-white/5 px-4 overflow-hidden transition-all duration-500 ease-in-out ${
            scrolled ? "h-0 py-0 border-b-0 opacity-0" : "h-[32px] py-1.5 opacity-100"
          }`}
        >
          <marquee className="w-full text-[11px] font-bold uppercase tracking-widest text-white/95" scrollamount="4">
            {siteContent.marqueeText}
          </marquee>
        </div>

        {/* 2. Main Navigation Bar */}
        <nav
          className={`w-full transition-all duration-500 ease-in-out border-b pointer-events-auto ${
            scrolled
              ? "glass-effect shadow-premium border-gray-150/40 dark:border-gray-800/40"
              : "bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-900"
          }`}
        >
          <div
            className={`max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 w-full flex items-center justify-between transition-all duration-500 ${
              scrolled ? "py-2.5" : "py-4"
            }`}
          >
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center text-left group"
            >
              <img
                src="/logo.png"
                alt="Paradise Optics Logo"
                className="h-8 md:h-12 w-auto object-contain mr-2 md:mr-3"
              />
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[11px] font-sans font-semibold text-gray-600 dark:text-gray-400 tracking-wide leading-none mb-0 md:-mb-[5px] pl-[12px] md:pl-[20px]">
                  Dr. Kuckreja's
                </span>
                <span className="font-serif text-[15px] sm:text-lg md:text-2xl font-black uppercase tracking-widest group-hover:opacity-90 transition-opacity leading-none">
                  <span className="text-primary">Paradise</span> <span className="text-gold">Optics</span>
                </span>
                <span className="hidden sm:block text-[9px] md:text-[10px] font-sans font-medium text-gray-400 dark:text-gray-550 uppercase tracking-[0.25em] mt-1.5">
                  See Better. Look Better.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <NavLink key={index} to={link.path} className={activeStyle}>
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Action Items */}
            <div className="flex items-center space-x-3 md:space-x-4">

              {/* Dark/Light Mode Switcher */}
              <button
                onClick={toggleTheme}
                className="hidden lg:flex w-10 h-10 rounded-full items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                aria-label="Toggle visual theme"
              >
                {theme === "dark" ? <FaSun className="text-amber-500 text-lg" /> : <FaMoon className="text-sky-600 text-lg" />}
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={onOpenWishlist}
                className="hidden lg:flex w-10 h-10 rounded-full items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative focus:outline-none"
                aria-label="View Wishlist"
              >
                <FaHeart className="text-rose-500 text-lg" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary dark:bg-gold text-white dark:text-gray-955 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border border-white dark:border-gray-900 shadow-md">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Book Now Button (Desktop Only) */}
              <Link
                to="/appointment"
                className="hidden sm:inline-flex bg-primary hover:bg-gold dark:bg-gold dark:hover:bg-yellow-500 text-white dark:text-gray-950 px-4 py-2 rounded font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Book Test
              </Link>

              {/* Auth Actions (Desktop Only) */}
              {user ? (
                <div className="hidden lg:flex items-center space-x-3">
                  <Link
                    to="/admin"
                    className="text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-gold uppercase tracking-wider transition-colors"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      window.showToast?.("Signed out successfully", "info");
                    }}
                    className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-wider transition-colors focus:outline-none"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden lg:inline-flex text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-gold uppercase tracking-wider transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile Hamburger Menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                aria-label="Open mobile navigation menu"
              >
                <FaBars className="text-lg" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Full screen Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenWishlist={onOpenWishlist}
      />
    </>
  );
};

export default Navbar;
