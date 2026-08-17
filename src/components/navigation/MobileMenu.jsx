import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart, FaMoon, FaSun, FaChevronRight } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useWishlist } from "../../context/WishlistContext";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";
import { CONTACT_INFO } from "../../constants";

const MobileMenu = ({ isOpen, onClose, onOpenWishlist }) => {
  const { theme, toggleTheme } = useTheme();
  const { wishlistCount } = useWishlist();
  const { siteContent } = useProducts();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);



  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Products Catalog", path: "/products" },
    { label: "Partner Brands", path: "/brands" },
    { label: "Services", path: "/services" },
    { label: "Showroom Gallery", path: "/gallery" },
    { label: "Special Offers", path: "/offers" },
    { label: "Contact Us", path: "/contact" },
  ];



  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[380px] bg-white dark:bg-[#0b0f19] z-50 shadow-2xl p-6 overflow-y-auto lg:hidden border-l border-gray-100 dark:border-gray-900"
          >
            {/* Header Area */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-900">
              <Link to="/" onClick={handleLinkClick} className="flex flex-col text-left">
                <span className="font-serif text-lg font-black uppercase tracking-widest text-primary dark:text-gold">
                  Paradise Optics
                </span>
                <span className="text-[8px] font-sans font-medium text-gray-400 dark:text-gray-550 uppercase tracking-[0.2em] -mt-0.5">
                  See Better. Look Better.
                </span>
              </Link>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-white focus:outline-none transition-colors border border-gray-150/40 dark:border-gray-700/30"
                aria-label="Close menu"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>



            {/* Menu Links */}
            <nav className="flex flex-col space-y-3.5 mb-8">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={handleLinkClick}
                  className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-gold border-b border-gray-100/60 dark:border-gray-900 pb-3.5 transition-colors duration-200 group"
                >
                  <span>{item.label}</span>
                  <FaChevronRight className="text-[9px] text-gray-400 group-hover:translate-x-0.5 group-hover:text-primary dark:group-hover:text-gold transition-all" />
                </Link>
              ))}
            </nav>

            {/* Utility Actions & Contacts */}
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {/* Theme Switcher */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#141b2d] font-semibold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-95"
                >
                  {theme === "dark" ? (
                    <>
                      <FaSun className="text-amber-500 text-sm" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <FaMoon className="text-sky-600 text-sm" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>

                {/* Wishlist Link */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    if (onOpenWishlist) onOpenWishlist();
                  }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#141b2d] font-semibold text-xs tracking-wider uppercase relative transition-all shadow-sm active:scale-95"
                >
                  <FaHeart className="text-rose-500 text-sm" />
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full text-[9px] w-5 h-5 flex items-center justify-center font-bold shadow-md border border-white dark:border-gray-950">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Auth Actions on Mobile */}
              <div className="pt-4 border-t border-gray-150/40 dark:border-gray-800/50 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/admin"
                      onClick={handleLinkClick}
                      className="flex w-full items-center justify-center gap-2 py-3 rounded-xl bg-gold text-gray-950 font-bold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-95 text-center"
                    >
                      Admin Panel
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        onClose();
                        window.showToast?.("Signed out successfully", "info");
                      }}
                      className="flex w-full items-center justify-center gap-2 py-3 rounded-xl border border-red-200 dark:border-red-950/40 text-red-500 bg-red-50/50 dark:bg-red-950/10 font-bold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-95"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="flex w-full items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-gold text-white dark:bg-gold dark:text-gray-950 font-bold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-95 text-center"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
