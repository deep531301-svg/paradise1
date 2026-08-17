import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Icons
import { FaEye, FaTools, FaExchangeAlt, FaRegSmileBeam, FaSun, FaFilePrescription, FaChevronDown, FaArrowRight, FaClock, FaCalendarCheck, FaStar } from "react-icons/fa";

// Data & Context
import { LENSES_COMPARISON, SERVICES, BRANDS, TESTIMONIALS, FAQS } from "../../data/productsData";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/products/ProductCard";
import ProductQuickView from "../../components/products/ProductQuickView";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  const { products: PRODUCTS, siteContent } = useProducts();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [activeFaq, setActiveFaq] = useState(null);

  const heroSlides = [
    {
      title: siteContent.heroTitle,
      subtitle: siteContent.heroSubtitle,
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1200&auto=format&fit=crop",
      primaryCta: "Shop Eyeglasses",
      primaryLink: "/products?category=eyeglasses",
      secondaryCta: "Explore Sunglasses",
      secondaryLink: "/products?category=sunglasses"
    },
    {
      title: "Precision Vision. Ultimate Style.",
      subtitle: "Experience state-of-the-art computerized eye testing and professional lens fittings today.",
      image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1200&auto=format&fit=crop",
      primaryCta: "Book Eye Test",
      primaryLink: "/appointment",
      secondaryCta: "Explore Services",
      secondaryLink: "/services"
    },
    {
      title: "Crafted For The Connoisseur",
      subtitle: "Browse our exclusive Carrera, Oakley, and Ray-Ban designer collections curated for ultimate styling.",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
      primaryCta: "View Sunglasses",
      primaryLink: "/products?category=sunglasses",
      secondaryCta: "Showroom Story",
      secondaryLink: "/about"
    },
    {
      title: "Effortless Clarity, Every Day",
      subtitle: "Experience extreme breathing comfort with elite daily disposable and cosmetic colored contact lenses.",
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1200&auto=format&fit=crop",
      primaryCta: "Shop Contact Lenses",
      primaryLink: "/products?category=contact-lenses",
      secondaryCta: "Book Consultation",
      secondaryLink: "/appointment"
    }
  ];

  const categoryCards = [
    {
      name: "Men's Collection",
      desc: "Classic & Premium Frames for Men",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      link: "/products?gender=men"
    },
    {
      name: "Women's Collection",
      desc: "Chic & Fashion-Forward Eyewear",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      link: "/products?gender=women"
    },
    {
      name: "Kids Specialty",
      desc: "Durable & Play-Safe Frames",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=400&auto=format&fit=crop",
      link: "/products?gender=kids"
    },
    {
      name: "Contact Lenses",
      desc: "Comfortable Everyday Vision",
      image: "https://images.unsplash.com/photo-1516246838830-ec387063d803?q=80&w=400&auto=format&fit=crop",
      link: "/products?category=contact-lenses"
    },
    {
      name: "Prescription Lenses",
      desc: "Advanced Lens Technology",
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=400&auto=format&fit=crop",
      link: "/products?category=prescription-lenses"
    },
    {
      name: "Computer Glasses",
      desc: "Blue Light Digital Shields",
      image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=400&auto=format&fit=crop",
      link: "/products?category=computer-glasses"
    }
  ];

  // Icon mapping for services
  const iconMap = {
    FaEye: <FaEye />,
    FaTools: <FaTools />,
    FaExchangeAlt: <FaExchangeAlt />,
    FaRegSmileBeam: <FaRegSmileBeam />,
    FaSun: <FaSun />,
    FaFilePrescription: <FaFilePrescription />
  };

  // Filter products for the featured section
  const getFeaturedProducts = () => {
    if (activeTab === "all") return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter((p) => p.category === activeTab).slice(0, 4);
  };



  return (
    <div className="w-full">
      {/* 1. Cinematic Hero Section */}
      <section className="w-full bg-gray-950 text-white relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          className="h-[65vh] md:h-[80vh] w-full"
        >
          {heroSlides.map((slide, idx) => (
            <SwiperSlide key={idx} className="relative w-full h-full overflow-hidden">
              {/* Slide Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
              </div>

              {/* Text Layout */}
              <div className="absolute inset-0 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-xl md:max-w-2xl space-y-4"
                >
                  <span className="text-gold text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                    Welcome to Paradise Optics
                  </span>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-lg text-gray-300 font-light leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link
                      to={slide.primaryLink}
                      className="bg-gold hover:bg-yellow-500 text-gray-950 px-6 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all shadow-lg"
                    >
                      {slide.primaryCta}
                    </Link>
                    <Link
                      to={slide.secondaryLink}
                      className="bg-transparent hover:bg-white/10 text-white border border-white/50 px-6 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all"
                    >
                      {slide.secondaryCta}
                    </Link>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2. Shop Categories Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-primary dark:text-gold text-xs font-bold uppercase tracking-[0.2em] block mb-1">
            Curated Eyewear
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 dark:text-white">
            Shop By Category
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative h-64 rounded-xl overflow-hidden shadow-premium border border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-900"
            >
              {/* Category Image */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/40 to-transparent" />
              </div>

              {/* Category Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-xl font-serif font-bold tracking-wide">{cat.name}</h3>
                <p className="text-xs text-gray-300 font-light mb-4">{cat.desc}</p>
                <Link
                  to={cat.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold uppercase tracking-wider hover:text-white transition-colors"
                >
                  <span>Explore Collection</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Featured Eyeglasses (With Tabs) */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/40 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-primary dark:text-gold text-xs font-bold uppercase tracking-[0.2em] block mb-1">
                New Arrivals
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 dark:text-white">
                Featured Eyewear
              </h2>
            </div>
            {/* Filter Tabs */}
            <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2">
              {["all", "eyeglasses", "sunglasses", "contact-lenses"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? "bg-primary text-white dark:bg-gold dark:text-gray-950"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab === "all" ? "Best Sellers" : tab.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFeaturedProducts().map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-2 border-primary hover:border-gold hover:bg-gold hover:text-gray-950 text-primary dark:text-gold dark:border-gold dark:hover:text-gray-950 px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>View Full Catalog</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Premium Sunglasses Showcase - Dark Section */}
      <section className="py-20 bg-gray-950 text-white overflow-hidden relative">
        {/* Subtle grid background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.25em]">
              Luxury Sunglasses
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold leading-tight text-white">
              The Luxury Sunglasses Collection
            </h2>
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
              Explore timeless silhouettes engineered for ultimate glare reduction and 100% UV block. From polarized sports models to high-fashion aviators, look your best in the solar glare.
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>100% UVA & UVB Polarized Protection Lenses</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>Signature Brands: Ray-Ban, Oakley, Carrera</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>Scratch-Resistant Polycarbonate Mirror Coatings</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/products?category=sunglasses"
                className="bg-gold hover:bg-yellow-500 text-gray-950 px-8 py-3.5 rounded text-xs font-bold uppercase tracking-wider transition-all inline-block shadow-lg"
              >
                Shop Sunglasses
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-darkText">
            {PRODUCTS.filter((p) => p.category === "sunglasses")
              .slice(0, 2)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
          </div>
        </div>
      </section>

      {/* 5. Prescription Lenses Guide Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-primary dark:text-gold text-xs font-bold uppercase tracking-[0.2em] block mb-1">
            Lens Technology
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 dark:text-white">
            Choose Your Lenses
          </h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto mt-2 leading-relaxed">
            Understanding lens options helps ensure clarity. Here is a simple comparison of optical lenses we fit.
          </p>
          <div className="w-16 h-1 bg-gold mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {LENSES_COMPARISON.map((lens, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl p-5 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-base font-bold text-primary dark:text-gold uppercase tracking-wide">
                  {lens.type}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {lens.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-400">Blue Cut Filter</span>
                  <span className="font-semibold text-gray-750 dark:text-gray-200">{lens.blueCut}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-400">Photochromic</span>
                  <span className="font-semibold text-gray-750 dark:text-gray-200">{lens.photochromic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Brands Marquee */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h3 className="text-center text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.25em] mb-8">
            Premium Brands Showcase
          </h3>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={3}
            breakpoints={{
              640: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 6 }
            }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false
            }}
            speed={4000}
            loop={true}
            className="flex items-center swiper-linear-marquee"
          >
            {BRANDS.map((brand, idx) => (
              <SwiperSlide key={idx} className="flex justify-center items-center py-2">
                <Link
                  to={`/products?brand=${encodeURIComponent(brand.name)}`}
                  className="w-full flex items-center justify-center h-20 md:h-24 px-6 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl text-center font-bold text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-gold hover:border-gold dark:hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                >
                  {brand.logo}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/40 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-primary dark:text-gold text-xs font-bold uppercase tracking-[0.2em] block mb-1">
              Customer Reviews
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 dark:text-white">
              What Our Customers Say
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-3" />
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {TESTIMONIALS.map((tst) => (
              <SwiperSlide key={tst.id} className="h-auto">
                <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl p-6 shadow-premium h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex text-amber-500 gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} className="text-xs" />
                      ))}
                    </div>
                    {/* Review text */}
                    <p className="text-xs md:text-sm text-gray-650 dark:text-gray-300 leading-relaxed italic">
                      "{tst.review}"
                    </p>
                  </div>
                  {/* Reviewer Details */}
                  <div className="flex items-center gap-3 pt-6 mt-4 border-t border-gray-100 dark:border-gray-800">
                    <img src={tst.photo} alt={tst.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-xs md:text-sm text-gray-800 dark:text-white leading-tight">
                        {tst.name}
                      </h4>
                      <span className="text-[10px] text-gray-450 dark:text-gray-500 font-semibold uppercase">
                        Bought: {tst.product}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 9. Interactive FAQ Accordion */}
      <section className="py-16 max-w-4xl mx-auto px-4" id="faq">
        <div className="text-center mb-12">
          <span className="text-primary dark:text-gold text-xs font-bold uppercase tracking-[0.2em] block mb-1">
            Questions & Answers
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-3" />
        </div>

        <div className="space-y-4">
          {FAQS.slice(0, 6).map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl overflow-hidden shadow-premium"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-xs md:text-sm text-gray-800 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <FaChevronDown
                    className={`text-xs text-gray-450 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. Eye Test Booking Teaser Banner */}
      <section className="py-14 bg-primary dark:bg-gray-900 text-white border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 bg-white/10 dark:bg-gold/15 text-gold px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <FaClock />
            <span>Takes only 2 minutes</span>
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight">
            Schedule a Premium Computerized Eye Checkup
          </h2>
          <p className="text-xs md:text-sm text-gray-350 max-w-xl mx-auto leading-relaxed">
            Our expert optometrists are available throughout the week to evaluate your eyesight and guide you on frame selections. Booking is 100% free online.
          </p>
          <div className="pt-2">
            <Link
              to="/appointment"
              className="bg-gold hover:bg-yellow-500 text-gray-950 font-bold uppercase tracking-wider text-xs md:text-sm px-8 py-3.5 rounded shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              Book Free Appointment Slot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
