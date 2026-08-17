import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaWhatsapp, FaEye, FaStar } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { useProducts } from "../../context/ProductContext";
import { CONTACT_INFO } from "../../constants";
import WhatsAppOrderModal from "./WhatsAppOrderModal";

const ProductCard = ({ product, onQuickView }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { incrementWhatsappClicks } = useProducts();
  const liked = isInWishlist(product.id);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const currentPrice = product.discountPrice || product.price;

  // WhatsApp Enquiry Link
  const enquiryText = `💬 *PARADISE OPTICS - PRODUCT ENQUIRY*
---------------------------------------
👓 *Product:* ${product.name}
🏷️ *Brand:* ${product.brand}
💰 *Price:* ₹${currentPrice.toLocaleString("en-IN")}
---------------------------------------
📲 _Hello, I am interested in this eyewear. Is this model currently available in stock? Please share prescription options._`;
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(enquiryText)}`;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (window.showToast) {
      window.showToast(
        added ? `${product.name} added to wishlist!` : `${product.name} removed from wishlist!`,
        added ? "success" : "info"
      );
    }
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col h-full">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full bg-gray-50 dark:bg-gray-950 overflow-hidden flex items-center justify-center">
        <Link to={`/product/${product.id}`} className="w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 loading-lazy"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 dark:bg-gray-850/95 shadow-md flex items-center justify-center text-gray-500 hover:text-rose-500 dark:text-gray-300 dark:hover:text-rose-400 active:scale-95 transition-all z-20"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          {liked ? <FaHeart className="text-rose-500" /> : <FaRegHeart />}
        </button>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-gold text-gray-950 text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase">
            {discount}% OFF
          </span>
        )}

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-950/80 flex items-center justify-center z-10 pointer-events-none">
            <span className="bg-gray-900 text-white px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}


      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-450 dark:text-gray-500">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-amber-500 font-semibold bg-amber-50 dark:bg-amber-950/45 px-1.5 py-0.5 rounded">
              <FaStar className="-mt-0.5" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Name */}
          <Link
            to={`/product/${product.id}`}
            className="block text-sm font-semibold text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-gold line-clamp-2 transition-colors mb-2"
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Primary Call to Action */}
        <div className="mt-2">
          {/* Price Layout */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-bold text-primary dark:text-gold">
              ₹{currentPrice.toLocaleString("en-IN")}
            </span>
            {product.discountPrice && (
              <span className="text-xs line-through text-gray-400">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Double Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {/* Enquire Now */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={incrementWhatsappClicks}
              className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded py-2 px-1 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
            >
              <FaWhatsapp className="text-xs" />
              <span>Enquire</span>
            </a>

            {/* Buy Now */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOrderModalOpen(true);
              }}
              className="flex items-center justify-center gap-1 bg-primary hover:bg-gold text-white dark:bg-gold dark:text-gray-955 rounded py-2 px-1 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Checkout system popup */}
      <WhatsAppOrderModal
        product={product}
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </div>
  );
};

export default ProductCard;
