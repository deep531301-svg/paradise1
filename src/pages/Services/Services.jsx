import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaTools, FaExchangeAlt, FaRegSmileBeam, FaSun, FaFilePrescription, FaAward, FaUserCheck, FaMicroscope, FaCalendarAlt } from "react-icons/fa";
import Breadcrumb from "../../components/common/Breadcrumb";
import { SERVICES } from "../../data/productsData";

const Services = () => {
  const iconMap = {
    FaEye: <FaEye className="text-2xl text-primary dark:text-gold" />,
    FaTools: <FaTools className="text-2xl text-primary dark:text-gold" />,
    FaExchangeAlt: <FaExchangeAlt className="text-2xl text-primary dark:text-gold" />,
    FaRegSmileBeam: <FaRegSmileBeam className="text-2xl text-primary dark:text-gold" />,
    FaSun: <FaSun className="text-2xl text-primary dark:text-gold" />,
    FaFilePrescription: <FaFilePrescription className="text-2xl text-primary dark:text-gold" />
  };

  // Rich professional details for each service
  const serviceDetails = {
    "srv-01": {
      duration: "25 Mins",
      price: "FREE (Online Promo)",
      features: [
        "12-Step Visual Acuity & Refractive Check",
        "Computerized Auto-Refractor Readings",
        "Licensed Optometrist Audited Power Slip"
      ]
    },
    "srv-02": {
      duration: "15 Mins",
      price: "Included with Lenses",
      features: [
        "Digital Pupil Distance (PD) Centration",
        "Sphere & Cylinder Power Adjustments",
        "High-Index Edge Thinning Calculations"
      ]
    },
    "srv-03": {
      duration: "10 Mins",
      price: "FREE for Lifetime",
      features: [
        "Ultrasonic Deep-Dirt Sanitation Wash",
        "Temple Hinge Tightening & Screws Reset",
        "Silicon Nose-Pad Wear Replacements"
      ]
    },
    "srv-04": {
      duration: "20 Mins",
      price: "₹199 / Session",
      features: [
        "Corneal Curvature Curve Map Audits",
        "Insertion & Gentle Removal Training",
        "Hydration Index Brand Compatibility Check"
      ]
    },
    "srv-05": {
      duration: "15 Mins",
      price: "FREE",
      features: [
        "Polarized Anti-Glare Lens Tester",
        "Frame Shape Face Contour Audits",
        "UV Protection Rating Audits"
      ]
    },
    "srv-06": {
      duration: "20 Mins",
      price: "FREE",
      features: [
        "High-Index Adaptation Analysis",
        "Vertex Calibration Checkups",
        "Spherical Aberration Fine-Tuning"
      ]
    }
  };

  const breadcrumbItems = [{ label: "Optical Services" }];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
      {/* Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Title */}
      <div className="text-center my-8 max-w-2xl mx-auto space-y-3">
        <span className="text-primary dark:text-gold text-xs font-bold uppercase tracking-[0.25em]">
          Paradise Care
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-black text-gray-800 dark:text-white">
          Our Professional Services
        </h1>
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light">
          From state-of-the-art vision diagnostics to customized lens fittings and style consultations, our licensed specialists ensure you see clearly and look outstanding.
        </p>
        <div className="w-16 h-1 bg-gold mx-auto mt-2" />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-12">
        {SERVICES.map((srv) => {
          const details = serviceDetails[srv.id] || { duration: "15 Mins", price: "FREE", features: [] };
          return (
            <div
              key={srv.id}
              className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-855 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col sm:flex-row h-full group"
            >
              {/* Service Image */}
              <div className="w-full sm:w-2/5 min-h-[220px] sm:min-h-auto relative overflow-hidden bg-gray-150 flex-shrink-0">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Service Content */}
              <div className="w-full sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Meta (Icon + Duration/Price) */}
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl inline-block shadow-inner group-hover:bg-gold/10 dark:group-hover:bg-gold/15 transition-colors duration-300">
                      {iconMap[srv.icon]}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-primary dark:text-gold block uppercase tracking-wider">
                        {details.price}
                      </span>
                      <span className="text-[10px] text-gray-450 dark:text-gray-500 block font-semibold">
                        {details.duration}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h2 className="text-lg font-serif font-black text-gray-855 dark:text-white group-hover:text-primary dark:group-hover:text-gold transition-colors duration-300">
                      {srv.title}
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-0.5">
                      {srv.shortDesc}
                    </p>
                  </div>

                  {/* Paragraph Desc */}
                  <p className="text-xs text-gray-655 dark:text-gray-350 leading-relaxed font-light">
                    {srv.description}
                  </p>

                  {/* Bullet Highlights */}
                  {details.features.length > 0 && (
                    <div className="space-y-1.5 pt-1.5 border-t border-gray-100 dark:border-gray-850">
                      {details.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                          <span className="font-light">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Link
                    to="/appointment"
                    className="w-full flex items-center justify-center gap-1.5 py-3 bg-primary hover:bg-gold text-white dark:bg-gray-850 dark:hover:bg-gold dark:hover:text-gray-950 font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 active:scale-98 shadow-sm"
                  >
                    <FaCalendarAlt className="text-[10px]" />
                    <span>Book Service Slot</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Equipment Highlights section */}
      <section className="mt-20 bg-gray-50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-800/80 rounded-2xl p-8 lg:p-12 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
              Expert Diagnostics
            </span>
            <h2 className="text-2xl md:text-3.5xl font-serif font-bold text-gray-800 dark:text-white leading-tight">
              Our State-of-the-Art Vision Lab
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-350 leading-relaxed font-light">
              We leverage advanced ophthalmology and vision diagnostics to perform high-accuracy computerized eye checkups. Our showroom labs host digital phoropters and auto-refractors ensuring error-free prescription readings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <FaMicroscope className="text-2xl text-primary dark:text-gold" />
                <h4 className="font-bold text-xs uppercase text-gray-855 dark:text-white">Precision Checkups</h4>
                <p className="text-[11px] text-gray-550 dark:text-gray-500 font-light">Zero-error optical alignment readouts.</p>
              </div>
              <div className="space-y-2">
                <FaAward className="text-2xl text-primary dark:text-gold" />
                <h4 className="font-bold text-xs uppercase text-gray-855 dark:text-white">Licensed Experts</h4>
                <p className="text-[11px] text-gray-550 dark:text-gray-500 font-light">Registered, highly experienced optometrists.</p>
              </div>
              <div className="space-y-2">
                <FaUserCheck className="text-2xl text-primary dark:text-gold" />
                <h4 className="font-bold text-xs uppercase text-gray-855 dark:text-white">Fittings Audit</h4>
                <p className="text-[11px] text-gray-550 dark:text-gray-500 font-light">Lens centering and vertex adjustments.</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-video lg:aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-premium">
            <img
              src="/Ophthalmology-Testing-Lab.png"
              alt="Ophthalmology Testing Lab"
              className="w-full h-full object-cover object-center absolute inset-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
