import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTrash, FaWhatsapp, FaCalendarCheck, FaHeart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { useProducts } from "../../context/ProductContext";
import { CONTACT_INFO } from "../../constants";

const WishlistDrawer = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { incrementWhatsappClicks, coupons } = useProducts();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const subtotal = wishlist.reduce((sum, item) => sum + (item.discountPrice || item.price), 0);

  const handleApplyCoupon = () => {
    setCouponError("");
    const matched = coupons.find(
      (c) => c.code.trim().toUpperCase() === couponCode.trim().toUpperCase()
    );

    if (!matched) {
      setCouponError("Invalid coupon code.");
      setAppliedCoupon(null);
      return;
    }

    if (!matched.active) {
      setCouponError("This coupon is currently inactive.");
      setAppliedCoupon(null);
      return;
    }

    if (subtotal < matched.minPurchase) {
      setCouponError(`Min order of ₹${matched.minPurchase} required for this coupon.`);
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon(matched);
    if (window.showToast) {
      window.showToast(`Coupon ${matched.code} applied successfully!`, "success");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discount) / 100) : 0;
  const finalTotal = subtotal - discountAmount;

  // Close on Escape keypress
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Disable background scrolling
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBrowseClick = () => {
    onClose();
    navigate("/products");
  };

  const handleBookClick = () => {
    onClose();
    navigate("/appointment");
  };

  // Compile all wishlist items into a single WhatsApp enquiry message
  const getWhatsappUrl = () => {
    if (wishlist.length === 0) return "#";
    const itemsList = wishlist
      .map((item, idx) => `${idx + 1}. ${item.name} (${item.brand} - ₹${item.discountPrice || item.price})`)
      .join("\n");
    let message = `Hello Paradise Optics, I am interested in these items from my wishlist:\n\n${itemsList}\n\n`;
    message += `Subtotal: ₹${subtotal.toLocaleString("en-IN")}\n`;
    if (appliedCoupon) {
      message += `Applied Coupon: ${appliedCoupon.code} (-${appliedCoupon.discount}%)\n`;
      message += `Estimated Total: ₹${finalTotal.toLocaleString("en-IN")}\n`;
    }
    message += `\nPlease let me know availability and lens fittings details.`;
    return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
          />

          {/* Slide-in Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col justify-between border-l border-gray-150 dark:border-gray-800"
          >
            {/* 1. Header Box */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary dark:text-gold">
                <FaHeart className="text-rose-500 animate-pulse" />
                <h2 className="font-serif text-lg font-bold">My Wishlist ({wishlist.length})</h2>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gold dark:hover:bg-gold dark:hover:text-gray-950 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Close wishlist drawer"
              >
                <FaTimes />
              </button>
            </div>

            {/* 2. Scrollable List Content */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4">
              {wishlist.length > 0 ? (
                wishlist.map((product) => {
                  const currentPrice = product.discountPrice || product.price;
                  return (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-900 relative group transition-shadow"
                    >
                      {/* Mini Thumbnail */}
                      <Link
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="w-20 h-20 bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-850 p-1 flex-shrink-0 flex items-center justify-center"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </Link>

                      {/* Content */}
                      <div className="flex-grow min-w-0 pr-6 space-y-1">
                        <span className="text-[9px] font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider block">
                          {product.brand}
                        </span>
                        <Link
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className="font-semibold text-xs md:text-sm text-gray-800 dark:text-white hover:text-primary dark:hover:text-gold block truncate"
                        >
                          {product.name}
                        </Link>
                        <span className="block text-xs font-bold text-primary dark:text-gold">
                          ₹{currentPrice.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Trash Button */}
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-rose-500 transition-colors focus:outline-none"
                        aria-label="Remove item"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  );
                })
              ) : (
                /* Empty Wishlist view */
                <div className="flex flex-col items-center justify-center text-center h-[50vh] space-y-4">
                  <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center text-rose-500 dark:text-rose-400">
                    <FaHeart className="text-2xl" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-white">Your Wishlist is Empty</h3>
                  <p className="text-xs text-gray-500 max-w-xs leading-relaxed font-light">
                    Add your favorite glasses, sunglasses, and frames to the wishlist to keep track of them and enquire easily!
                  </p>
                  <button
                    onClick={handleBrowseClick}
                    className="bg-primary hover:bg-gold text-white dark:bg-gold dark:text-gray-950 font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wider transition-all"
                  >
                    Browse Collections
                  </button>
                </div>
              )}
            </div>

            {/* 3. Footer Action Panels */}
            {wishlist.length > 0 && (
              <div className="p-5 border-t border-gray-100 dark:border-gray-800 space-y-4 bg-gray-50/50 dark:bg-gray-950/20">
                {/* Price Breakdown */}
                <div className="space-y-2 text-xs border-b border-gray-200/60 dark:border-gray-850 pb-3 font-medium">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Wishlist Subtotal</span>
                    <span className="text-gray-750 dark:text-gray-300">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Promo Discount ({appliedCoupon.code})</span>
                      <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-gray-850 dark:text-white pt-1">
                    <span>Estimated Total</span>
                    <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Have a promo code?</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. PARADISE20"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError("");
                      }}
                      disabled={!!appliedCoupon}
                      className="flex-grow text-xs px-2.5 py-1.5 rounded border border-gray-250 dark:border-gray-850 bg-white dark:bg-gray-900 text-gray-800 dark:text-white uppercase disabled:opacity-50"
                    />
                    {appliedCoupon ? (
                      <button
                        onClick={handleRemoveCoupon}
                        className="px-3 bg-rose-500 hover:bg-rose-650 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={handleApplyCoupon}
                        className="px-3.5 bg-primary hover:bg-gold text-white dark:bg-gold dark:text-gray-950 rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {couponError && <p className="text-[10px] font-semibold text-rose-500">{couponError}</p>}
                </div>

                {/* Clear All Option */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-450">Wishlist Size: {wishlist.length}</span>
                  <button
                    onClick={clearWishlist}
                    className="text-rose-500 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                {/* WhatsApp Bulk Enquiry */}
                <a
                  href={getWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={incrementWhatsappClicks}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  <FaWhatsapp className="text-base" />
                  <span>Enquire All on WhatsApp</span>
                </a>

                {/* Booking link */}
                <button
                  onClick={handleBookClick}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-gray-250 dark:border-gray-800 hover:border-primary dark:hover:border-gold text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <FaCalendarCheck />
                  <span>Book Fitting for Saved Items</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
