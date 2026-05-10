import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import TextPressure from "../../ui/TextPressure";
import { slides } from "../../../data/heroSlides";

const HeroCarousel = ({
  currentSlide,
  nextSlide,
  prevSlide,
  setIsCVModalOpen,
}) => {
  return (
    <div className="lg:col-span-6 flex opacity-80 flex-col items-center justify-center order-1 lg:order-2 relative z-10">
      {/* Image Container */}
      <div 
        id="hero-image-container"
        className="relative w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px] flex items-center justify-center"
      >
        {/* Main Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 rounded-full overflow-hidden shadow-2xl"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            {/* Vignette on Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>
          </motion.div>
        </AnimatePresence>

        {/* Title Overlay - TextPressure */}
        <div className="absolute z-50 text-center flex flex-col items-center pointer-events-none w-full h-full justify-center">
          <div className="w-[300px] md:w-[700px] lg:w-[600px] h-[100px] md:h-[200px]">
            <TextPressure
              text="PORTFOLIO"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              minFontSize={36}
            />
          </div>
        </div>
      </div>

      {/* CV Download Button (Triggers Popup) */}
      <div className="relative mt-12 z-30">
        <button
          onClick={() => setIsCVModalOpen(true)}
          className="group relative px-6 py-3
                    text-gray-900 dark:text-white
                    tracking-widest text-xs uppercase
                    border border-gray-900 dark:border-white
                    overflow-hidden
                    transition-colors duration-300
                    hover:text-white dark:hover:text-gray-900"
        >
          {/* Fill effect on hover */}
          <span
            className="absolute inset-0 bg-gray-900 dark:bg-white
                          scale-x-0 group-hover:scale-x-100
                          transition-transform duration-300 ease-out origin-left"
          />

          {/* Text & Icon */}
          <span className="relative z-10 flex items-center gap-2">
            <span>Download CV</span>
            <Download size={14} />
          </span>
        </button>
      </div>

      {/* Decorative Lines (Carousel Indicators) */}
      <div className="flex gap-2 mt-8">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? "w-8 bg-gray-900 dark:bg-white"
                : "w-2 bg-gray-400 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons - Mobile/Tablet/Small Laptop */}
      <div className="lg:hidden flex gap-6 mt-6">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-gray-200/50 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-300/50 dark:hover:bg-white/20 transition-all duration-300 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-gray-900 text-white dark:bg-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
