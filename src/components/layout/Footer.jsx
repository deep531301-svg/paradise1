import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaWhatsapp } from "react-icons/fa";
import { CONTACT_INFO, SOCIAL_LINKS } from "../../constants";
import { useProducts } from "../../context/ProductContext";
import { getShowroomStatus } from "../../utils/timeHelper";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { siteContent, incrementWhatsappClicks } = useProducts();
  const [status, setStatus] = useState({ isOpen: true, message: "Open Now — Closes at 8:30 PM", shortMessage: "Showroom Open" });

  React.useEffect(() => {
    const update = () => setStatus(getShowroomStatus());
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const phone = siteContent?.phone || CONTACT_INFO.phone;
  const emailVal = siteContent?.email || CONTACT_INFO.email;
  const address = siteContent?.address || CONTACT_INFO.address;
  const whatsappNum = siteContent?.whatsapp || CONTACT_INFO.whatsapp;
  const callUrl = `tel:${phone.replace(/\s+/g, "")}`;
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      if (window.showToast) {
        window.showToast("Thank you for subscribing!", "success");
      }
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#111827] text-gray-300 pt-16 pb-24 md:pb-8 border-t border-gray-800 font-sans z-30 relative">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Logo & About Store */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center text-left group">
            <img
              src="/logo.png"
              alt="Paradise Optics Logo"
              className="h-10 md:h-12 w-auto object-contain mr-3 dark:brightness-110"
            />
            <div className="flex flex-col">
              <span className="text-[10px] md:text-[11px] font-sans font-semibold text-gray-500 dark:text-gray-400 tracking-wide leading-none mb-1 pl-[16px] md:pl-[20px]">
                Dr. Kuckreja's
              </span>
              <h2 className="font-serif text-2xl font-black uppercase tracking-wider leading-none text-white">
                Paradise <span className="text-gold">Optics</span>
              </h2>
              <span className="block text-[9px] font-sans font-semibold text-gray-500 uppercase tracking-widest mt-1.5">
                SEE BETTER. LOOK BETTER. FEEL BETTER.
              </span>
            </div>
          </Link>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
            Paradise Optics is a luxury optical retail showroom in Ludhiana. Providing professional optical consulting paired with premium designer eyewear, advanced contact lenses, and customized prescription fittings.
          </p>
          
          {/* Dynamic Showroom Open indicator */}
          <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest pt-2 ${
            status.isOpen ? "text-emerald-400" : "text-rose-500"
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full animate-pulse inline-block ${
              status.isOpen ? "bg-emerald-500" : "bg-rose-500"
            }`} />
            <span>{status.message}</span>
          </div>
        </div>

        {/* Column 2: Quick Navigation */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-gray-850 pb-2">
            Quick Navigation
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
            <div className="space-y-2">
              <Link to="/" className="hover:text-gold transition-colors duration-200 block py-0.5 text-gray-400">Home</Link>
              <Link to="/products" className="hover:text-gold transition-colors duration-200 block py-0.5 text-gray-400">Products</Link>
              <Link to="/services" className="hover:text-gold transition-colors duration-200 block py-0.5 text-gray-400">Services</Link>
              <Link to="/offers" className="hover:text-gold transition-colors duration-200 block py-0.5 text-gray-400">Offers</Link>
            </div>
            <div className="space-y-2">
              <Link to="/about" className="hover:text-gold transition-colors duration-200 block py-0.5 text-gray-400">About Us</Link>
              <Link to="/brands" className="hover:text-gold transition-colors duration-200 block py-0.5 text-gray-400">Brands</Link>
              <Link to="/gallery" className="hover:text-gold transition-colors duration-200 block py-0.5 text-gray-400">Gallery</Link>
              <Link to="/contact" className="hover:text-gold transition-colors duration-200 block py-0.5 text-gray-400">Contact</Link>
            </div>
          </div>
        </div>

        {/* Column 3: Visit Showroom */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-gray-850 pb-2">
            Visit Showroom
          </h3>
          <div className="space-y-3 text-xs md:text-sm text-gray-400 font-light">
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-gold mt-1 text-xs flex-shrink-0" />
              <span className="leading-relaxed">{address}</span>
            </div>
            <a href={callUrl} className="flex items-center gap-2 hover:text-gold transition-colors block">
              <FaPhoneAlt className="text-gold text-xs flex-shrink-0" />
              <span>{phone}</span>
            </a>
            <a href={`mailto:${emailVal}`} className="flex items-center gap-2 hover:text-gold transition-colors block">
              <FaEnvelope className="text-gold text-xs flex-shrink-0" />
              <span>{emailVal}</span>
            </a>
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-gray-850 pb-2">
            Newsletter
          </h3>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
            Subscribe to receive exclusive festival coupons, luxury catalog launches, and vision tips.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <div className="relative flex w-full">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1e293b]/40 border border-gray-800 focus:border-gold rounded-l px-3 py-2 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-0"
                required
              />
              <button
                type="submit"
                className="bg-gold text-gray-950 hover:bg-yellow-500 font-bold px-3.5 py-2 rounded-r transition-colors flex items-center justify-center flex-shrink-0"
                aria-label="Subscribe"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </div>
          </form>

          {/* Social Row */}
          <div className="flex space-x-2 pt-2">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-800 hover:border-gold text-gray-450 hover:text-gold flex items-center justify-center transition-all duration-300 bg-gray-900/40 hover:bg-gray-900"
              aria-label="Facebook page"
            >
              <FaFacebookF className="text-xs" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-800 hover:border-gold text-gray-450 hover:text-gold flex items-center justify-center transition-all duration-300 bg-gray-900/40 hover:bg-gray-900"
              aria-label="Instagram profile"
            >
              <FaInstagram className="text-xs" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={incrementWhatsappClicks}
              className="w-8 h-8 rounded-full border border-gray-800 hover:border-gold text-gray-450 hover:text-gold flex items-center justify-center transition-all duration-300 bg-gray-900/40 hover:bg-gray-900"
              aria-label="WhatsApp Hotline"
            >
              <FaWhatsapp className="text-xs" />
            </a>
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-800 hover:border-gold text-gray-450 hover:text-gold flex items-center justify-center transition-all duration-300 bg-gray-900/40 hover:bg-gray-900"
              aria-label="YouTube channel"
            >
              <FaYoutube className="text-xs" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="border-t border-gray-805/40 mt-12 pt-6 max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <span>
          &copy; {new Date().getFullYear()} Paradise Optics Showroom. All Rights Reserved. Designed for Elegant Luxury.
        </span>
        <div className="flex gap-4 font-medium">
          <Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-gold transition-colors">Terms of Service</Link>
          <Link to="/faq" className="hover:text-gold transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
