import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Smooth linear progress: 100 steps of 15ms = exactly 1.5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    // Hard safety timeout: Dismiss loader after 3.0s maximum to prevent throttling lockups
    const safetyTimeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setLoading(false);
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "";
      }, 350); // Snappy luxury exit pause
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const titleLetters = "PARADISE OPTICS".split("");
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // 251.327

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            opacity: 0.9,
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-gradient-to-b from-[#030712] via-[#090d16] to-[#030712] flex flex-col items-center justify-center z-[9999] overflow-hidden select-none"
        >
          {/* Pulsing Ambient Background Radial Glow */}
          <motion.div 
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_65%)] rounded-full pointer-events-none"
          />

          <div className="text-center space-y-8 z-10 flex flex-col items-center max-w-md px-6">
            
            {/* Dynamic Circle Progress Tracer + Luxury Glasses Symbol */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Circular SVG Tracer */}
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-gray-900/60"
                  strokeWidth="2"
                  fill="transparent"
                />
                {/* Live Gold Tracer */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-gold"
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - (circumference * progress) / 100}
                  strokeLinecap="round"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.5))",
                    transition: "stroke-dashoffset 0.15s ease-out"
                  }}
                />
              </svg>

              {/* Inner Luxury Glasses Symbol */}
              <motion.div
                animate={{
                  scale: [0.96, 1.04, 0.96]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="z-10 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  className="w-10 h-10 text-gold filter drop-shadow-[0_0_8px_rgba(212,175,55,0.35)]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h3.375m12.75 0h3.375m-15 0a3.75 3.75 0 117.5 0M10.5 12V9.375c0-.621.504-1.125 1.125-1.125s1.125.504 1.125 1.125V12M10.5 12a3.75 3.75 0 007.5 0" />
                </svg>
              </motion.div>
            </div>

            {/* Brand Logo & Tagline */}
            <div className="space-y-3.5">
              {/* Letter by letter text reveal */}
              <h1 className="font-serif text-2xl md:text-3.5xl font-black uppercase tracking-[0.25em] bg-gradient-to-r from-amber-200 via-gold to-yellow-500 bg-clip-text text-transparent flex justify-center flex-wrap filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                {titleLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.035,
                      duration: 0.5,
                      ease: [0.215, 0.610, 0.355, 1]
                    }}
                    style={{ marginRight: letter === " " ? "0.4em" : "0px" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
              
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 0.7, letterSpacing: "0.35em" }}
                transition={{ delay: 0.75, duration: 0.8, ease: "easeOut" }}
                className="text-[9px] md:text-[10px] font-sans font-semibold text-gold uppercase block"
              >
                See Better. Look Better.
              </motion.p>
            </div>

            {/* High-end progress indicator */}
            <div className="space-y-2 pt-2 w-52 flex flex-col items-center">
              {/* Thin progress line container */}
              <div className="w-full h-[1px] bg-gray-900 rounded-full relative overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-gold/80 to-amber-400 shadow-[0_0_6px_rgba(212,175,55,0.7)] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Dynamic Percentage Display */}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="text-[10px] font-sans font-bold text-gold tracking-widest block font-mono mt-1"
              >
                {progress}%
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
