import React from "react";
import { FaWhatsapp, FaPhoneAlt, FaDirections } from "react-icons/fa";
import { useProducts } from "../../context/ProductContext";
import { CONTACT_INFO } from "../../constants";

const QuickActionButtons = () => {
  const { incrementWhatsappClicks, siteContent } = useProducts();
  
  const phone = siteContent?.phone || CONTACT_INFO.phone;
  const whatsappNum = siteContent?.whatsapp || CONTACT_INFO.whatsapp;
  
  // Pre-filled WhatsApp link
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`;
  const callUrl = `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <>
      {/* Floating WhatsApp Button - Desktop Only (Hidden on mobile sticky bottom area to prevent overlay) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={incrementWhatsappClicks}
        className="hidden md:flex fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 z-40 animate-pulse-gold group"
        aria-label="Enquire on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
        <span className="absolute right-16 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-1 rounded shadow text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Chat with Us
        </span>
      </a>

      {/* Floating Call Button - Desktop Only */}
      <a
        href={callUrl}
        className="hidden md:flex fixed bottom-24 right-6 bg-primary hover:bg-gold text-white dark:bg-gold dark:text-gray-950 dark:hover:bg-yellow-500 w-14 h-14 rounded-full items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 z-40 group"
        aria-label="Call Store"
      >
        <FaPhoneAlt className="text-xl" />
        <span className="absolute right-16 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-1 rounded shadow text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Call Us
        </span>
      </a>

      {/* Sticky Bottom Bar - Mobile/Tablet Only (Hidden on Desktop) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 grid grid-cols-3 z-50 h-16 pb-safe">
        {/* Call Button */}
        <a
          href={callUrl}
          className="flex flex-col items-center justify-center text-primary dark:text-gold border-r border-gray-100 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
        >
          <FaPhoneAlt className="text-lg mb-1" />
          <span className="text-xs font-medium">Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={incrementWhatsappClicks}
          className="flex flex-col items-center justify-center bg-emerald-500 text-white active:bg-emerald-600 transition-colors"
        >
          <FaWhatsapp className="text-xl mb-1" />
          <span className="text-xs font-medium">WhatsApp</span>
        </a>

        {/* Get Directions Button */}
        <a
          href={CONTACT_INFO.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-primary dark:text-gold active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
        >
          <FaDirections className="text-lg mb-1" />
          <span className="text-xs font-medium">Directions</span>
        </a>
      </div>
    </>
  );
};

export default QuickActionButtons;
