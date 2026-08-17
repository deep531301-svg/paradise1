import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCertificate, FaShieldAlt, FaClock, FaHeart, FaChevronRight, FaRegSmileBeam } from "react-icons/fa";
import Breadcrumb from "../../components/common/Breadcrumb";

const About = () => {
  const stats = [
    { value: "15+", label: "Years Experience", description: "Serving trust and precision." },
    { value: "12K+", label: "Happy Customers", description: "Providing clarity and style." },
    { value: "800+", label: "Eyewear Collections", description: "Frames from global brands." },
    { value: "6+", label: "Expert Optometrists", description: "Comprehensive eye evaluations." }
  ];

  const coreValues = [
    {
      title: "Authorized Authenticity",
      description: "We are certified retail partners for all featured global brands. Every piece in our collection is 100% genuine and comes backed by manufacturer warrants.",
      icon: <FaShieldAlt className="text-2xl text-primary dark:text-gold" />,
      bullets: [
        "Official Brand Warranty Cards Sourced",
        "100% Original Premium Case Provided",
        "Direct-From-Manufacturer Sourced Catalog"
      ]
    },
    {
      title: "Clinical Fitting Precision",
      description: "Spectacles require surgical accuracy. Our computerized pupillary centration systems ensure your lenses align perfectly with your visual axis.",
      icon: <FaCertificate className="text-2xl text-primary dark:text-gold" />,
      bullets: [
        "Digital Pupil Distance (PD) Centration",
        "Vertex Distance & Lens Tilt Alignments",
        "Spherical Power Adaptation Support"
      ]
    },
    {
      title: "Lifetime Showroom Care",
      description: "Our relationship extends far beyond your initial purchase. Enjoy lifetime complimentary frame tuning and deep ultrasonic sanitations.",
      icon: <FaHeart className="text-2xl text-primary dark:text-gold" />,
      bullets: [
        "Free Ultrasonic Micro-Dirt Cleaning",
        "Complimentary Hinge Tightening & Resets",
        "Lifetime Nose-Pad & Screws Replacements"
      ]
    }
  ];

  const breadcrumbItems = [{ label: "About Us" }];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
      {/* Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} />

      {/* 1. Meet Our Founder Section (Owner Details on Top) */}
      <section className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Owner Image Container */}
          <div className="lg:col-span-5 relative group">
            {/* Background design accents */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-gold/10 to-primary/10 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative overflow-hidden rounded-2xl border-4 border-white dark:border-gray-900 shadow-premium aspect-[4/5] bg-gray-50 dark:bg-gray-800">
              <img
                src="/dr-kulwinder.jpeg"
                alt="Mr. Kulwinder Singh - Founder of Paradise Optics"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white text-left">
                  <span className="text-[10px] text-gold font-bold uppercase tracking-wider block">Est. 2011</span>
                  <span className="text-xs text-gray-300 font-light block">Ludhiana Showroom</span>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-primary dark:text-gold text-xs font-bold uppercase tracking-[0.25em] block">
                Leadership & Vision
              </span>
              <h2 className="text-3xl md:text-4.5xl font-serif font-black text-gray-800 dark:text-white leading-tight">
                Meet Mr. Kulwinder Singh
              </h2>
              <span className="text-xs font-semibold text-gold uppercase tracking-widest block font-sans">
                Founder & Chief Optometrist — Paradise Optics
              </span>
              <div className="w-16 h-0.5 bg-gold mt-2" />
            </div>

            <div className="space-y-4 text-xs md:text-sm text-gray-655 dark:text-gray-350 leading-relaxed font-light">
              <p>
                With over two decades of clinical optometry and vision refraction experience, <strong>Mr. Kulwinder Singh</strong> established Paradise Optics to bring advanced eye diagnosis and luxury European eyewear fashion to the region.
              </p>
              <p>
                He holds a Bachelor's Degree in Optometry (B.Optom) and is a certified Fellow of IACLE (International Association of Contact Lens Educators). Under his direction, the showroom has scaled to host one of the most comprehensive computerized diagnostics laboratories and premium lens-fitting systems in the country.
              </p>
              <p className="italic text-gray-500 dark:text-gray-400 border-l-2 border-gold pl-4 font-serif py-1">
                "Our mission is simple: we do not just sell spectacles; we engineer visual clarity and curate your personal styling. Your eyes deserve nothing less than the absolute zenith of precision and design."
              </p>
            </div>

            {/* Signature or Credentials Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 px-4 py-2 rounded-xl">
                <FaGraduationCap className="text-gold text-sm" />
                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">B.Optom, FIACLE</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 px-4 py-2 rounded-xl">
                <FaCertificate className="text-gold text-sm" />
                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">20+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5. Next Generation Leadership Section */}
      <section className="py-12 border-t border-gray-150 dark:border-gray-850">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-primary dark:text-gold text-xs font-bold uppercase tracking-[0.2em] block">
            Next Generation
          </span>
          <h2 className="text-2xl md:text-3.5xl font-serif font-bold text-gray-800 dark:text-white">
            Meet the Executive Team
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed font-light">
            Bringing academic rigor and modern luxury fashion curation to Paradise Optics' established clinical heritage.
          </p>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Dr. Amanpreet Singh Kuckreja */}
          <div className="bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-950/80 border border-gray-150 dark:border-gray-850 rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 hover:border-gray-300 dark:hover:border-gray-700 flex flex-col h-full">
            {/* Image Section */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-gray-105 dark:bg-gray-955 relative border-b border-gray-150 dark:border-gray-855">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
                alt="Dr. Amanpreet Singh Kuckreja - Clinical Optometrist"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-gray-950/20 to-transparent" />
              
              {/* Floating Degree Badge */}
              <div className="absolute bottom-3 left-3.5 bg-primary/95 dark:bg-gold/90 backdrop-blur-sm text-white dark:text-gray-950 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-lg shadow-lg border border-white/10 dark:border-black/5">
                Clinical Refractionist
              </div>
            </div>
            
            {/* Cartier Red / Gold Horizontal Accent Line */}
            <div className="h-[2.5px] bg-gradient-to-r from-primary via-gold to-primary" />

            {/* Content Section */}
            <div className="p-6 space-y-4 md:space-y-5 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gold uppercase tracking-[0.25em] block">
                    Chief Refractionist
                  </span>
                  <h3 className="font-serif text-xl md:text-[22px] font-black text-gray-900 dark:text-white leading-tight">
                    Dr. Amanpreet Singh Kuckreja
                  </h3>
                  <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Master of Optometry (M.Optom)
                  </p>
                </div>
                
                <p className="text-xs md:text-sm text-gray-650 dark:text-gray-350 leading-relaxed font-light">
                  Dr. Amanpreet directs our computerized refraction suites. He brings advanced clinical vision metrics, pediatric vision checks, and digital lens adaptation therapies from academic research straight to the Ludhiana showroom.
                </p>
              </div>

              {/* Technical Specialties Grid */}
              <div className="pt-4 border-t border-gray-150 dark:border-gray-850/80 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest block">Clinical Focus</span>
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Dry Eye & Refraction</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest block">Lab Supervised</span>
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">PD Centration Suite</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Evneet Kaur */}
          <div className="bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-950/80 border border-gray-150 dark:border-gray-850 rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 hover:border-gray-300 dark:hover:border-gray-700 flex flex-col h-full">
            {/* Image Section */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-gray-105 dark:bg-gray-955 relative border-b border-gray-150 dark:border-gray-850">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Evneet Kaur - Optometrist & Contact Lens Specialist"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-gray-950/20 to-transparent" />
              
              {/* Floating Degree Badge */}
              <div className="absolute bottom-3 left-3.5 bg-primary/95 dark:bg-gold/90 backdrop-blur-sm text-white dark:text-gray-950 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-lg shadow-lg border border-white/10 dark:border-black/5">
                Sankara Nethralaya Alumna
              </div>
            </div>

            {/* Divider Accent */}
            <div className="h-[2.5px] bg-gradient-to-r from-primary via-gold to-primary" />

            {/* Content Section */}
            <div className="p-6 space-y-4 md:space-y-5 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gold uppercase tracking-[0.25em] block">
                    Contact Lens Fellow
                  </span>
                  <h3 className="font-serif text-xl md:text-[22px] font-black text-gray-900 dark:text-white leading-tight">
                    Evneet Kaur
                  </h3>
                  <p className="text-[10px] font-medium text-gray-400 dark:text-gray-555 uppercase tracking-wider">
                    Sankara Nethralaya (Chennai) Certified
                  </p>
                </div>
                
                <p className="text-xs md:text-sm text-gray-655 dark:text-gray-350 leading-relaxed font-light">
                  Evneet leads our specialized contact lens fitting clinic. Trained at Chennai’s world-renowned Sankara Nethralaya, she handles advanced scleral lenses, toric adjustments, and complex ocular refraction.
                </p>
              </div>

              {/* Technical Specialties Grid */}
              <div className="pt-6 border-t border-gray-150 dark:border-gray-850/80 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest block">Clinical Focus</span>
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Specialty Scleral Lenses</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest block">Fellowship</span>
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Chennai Eye Institute</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Heritage Introduction */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-16 border-t border-gray-150 dark:border-gray-850">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-primary dark:text-gold text-xs font-bold uppercase tracking-[0.25em]">
            Since 2011
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-gray-800 dark:text-white leading-tight">
            Paradise Optics Showroom Story
          </h2>
          <div className="w-16 h-1 bg-gold mt-2" />
          <p className="text-xs md:text-sm text-gray-655 dark:text-gray-350 leading-relaxed font-light">
            Founded with a vision to redefine eyecare, **Paradise Optics** has grown from a local boutique to a leading premium optical showroom. Located at DMC Road, Ludhiana, we represent the absolute convergence of visual precision and high-street fashion.
          </p>
          <p className="text-xs md:text-sm text-gray-655 dark:text-gray-300 leading-relaxed font-light">
            Our showroom showcases exclusive eyewear selections from elite global houses like Ray-Ban, Oakley, Carrera, and Prada. Backed by fully computerized vision laboratories, our licensed specialists perform comprehensive diagnostics to protect and enhance your sight.
          </p>
          <div className="pt-2">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 bg-primary hover:bg-gold text-white dark:bg-gold dark:text-gray-950 px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Schedule Showroom Visit</span>
              <FaChevronRight className="text-[10px]" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-premium">
          <img
            src="/enterparadise.avif"
            alt="Paradise Optics Premium Showroom Gallery"
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </div>
      </section>

      {/* 3. Stats Block */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-150 dark:border-gray-800/80">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-6 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-1.5"
            >
              <h2 className="text-3xl md:text-5.5xl font-serif font-black text-primary dark:text-gold">
                {stat.value}
              </h2>
              <h4 className="font-bold text-xs uppercase tracking-wide text-gray-800 dark:text-white">
                {stat.label}
              </h4>
              <p className="text-[11px] text-gray-450 dark:text-gray-555 leading-relaxed max-w-xs mx-auto">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section className="py-16 border-t border-gray-150 dark:border-gray-850">
        <div className="text-center mb-12">
          <span className="text-primary dark:text-gold text-xs font-bold uppercase tracking-[0.2em] block mb-1">
            Our Commitments
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-850 dark:text-white">
            Why Customers Choose Us
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto mt-2 leading-relaxed font-light">
            We hold ourselves to clinical optometric standards and retail transparency. Here is what we guarantee with every purchase.
          </p>
          <div className="w-16 h-1 bg-gold mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-905 border border-gray-150 dark:border-gray-855 p-6 rounded-2xl shadow-premium hover:shadow-premium-hover hover:border-gold/50 transition-all duration-300 flex flex-col justify-between space-y-5 group transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Icon Container */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary/5 to-gold/10 dark:from-gray-800 dark:to-gold/15 rounded-xl flex items-center justify-center shadow-inner group-hover:bg-gold/20 transition-colors duration-300">
                  {val.icon}
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-base font-serif font-black text-gray-800 dark:text-white uppercase tracking-wide group-hover:text-primary dark:group-hover:text-gold transition-colors duration-300">
                    {val.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-350 leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>

                {/* Features Bullets */}
                <div className="space-y-1.5 pt-3 border-t border-gray-100 dark:border-gray-850">
                  {val.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-gray-550 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                      <span className="font-light">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Credentials/Certifications banner */}
      <section className="bg-primary dark:bg-gray-900 text-white rounded-2xl p-8 lg:p-12 mb-8 border border-white/5">
        <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between max-w-5xl mx-auto">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-xl md:text-2xl font-serif font-bold tracking-wide flex items-center gap-2">
              <FaGraduationCap className="text-gold" />
              <span>Certified Optometric Care Showroom</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed">
              All visual diagnosis, power checks, and contact lens fittings are supervised by registered members of the Optometry Council. We comply strictly with local health department directives.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="border border-gold/40 text-gold px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-center bg-gold/5">
              Optometry Council Approved
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
