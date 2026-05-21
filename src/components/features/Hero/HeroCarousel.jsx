import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import TextPressure from "../../ui/TextPressure";
import { slides } from "../../../data/heroSlides";
import { useTheme } from "next-themes";

const HeroCarousel = ({ currentQuote, nextQuote, prevQuote, fontSize, currentSlide }) => {
  const { theme } = useTheme();
  
  const fontSizes = {
    sm: { quote: "text-sm" },
    md: { quote: "text-base" },
    lg: { quote: "text-lg" },
  };

  const quickLinks = [
    { name: "Warmups" },
    { name: "Lessons" },
    { name: "Lesson Plans" },
    { name: "Exercises" },
    { name: "Materials" },
  ];

  return (
    <div className="lg:col-span-6 flex flex-col items-center justify-between h-[85vh] lg:h-full order-1 lg:order-2 relative z-10 w-full pb-20 lg:pb-8 pt-8">
      
      {/* Top Spacer */}
      <div className="flex-1 w-full min-h-[4vh] lg:min-h-0"></div>

      {/* Title Overlay - TextPressure (Huge) */}
      <div className="relative z-50 text-center flex flex-col items-center w-full justify-center mb-6">
        <div className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[800px] xl:w-[900px] h-[100px] sm:h-[150px] md:h-[200px]">
          <TextPressure
            text="Hello Teacher!"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={false}
            textColor={theme === 'dark' ? "#ffffff" : "#000000"}
            minFontSize={60}
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl px-4 z-30 mb-8 flex justify-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for lessons, materials..."
            className="w-full pl-12 pr-4 py-3 rounded-full backdrop-blur-md bg-white/30 dark:bg-black/40 border border-white/40 dark:border-white/10 shadow-lg text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:zinc-300/50 transition-all font-sans text-sm"
          />
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400" />
        </div>
      </div>

      {/* Quick Access Links (Glass Pills) */}
      <div className="w-full max-w-3xl px-4 z-30 mb-8 flex justify-center">
        <div className="flex flex-wrap justify-center gap-3">
          {quickLinks.map((link, idx) => (
            <button
              key={idx}
              className="flex items-center gap-2 pl-5 pr-2 py-1.5 rounded-full 
                         backdrop-blur-md bg-black/80 dark:bg-white/10 
                         hover:bg-black dark:hover:bg-white/20 
                         transition-all duration-300 group shadow-lg border border-white/20 dark:border-white/10 hover:cursor-pointer"
            >
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-white uppercase">
                {link.name}
              </span>
              <div className="bg-white/20 dark:bg-black/30 rounded-full p-1 ml-1 group-hover:bg-white/40 dark:group-hover:bg-black/50 transition-colors">
                <ArrowRight size={14} className="text-white group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Flexible spacer to push the bottom section down */}
      <div className="flex-1 w-full min-h-[10vh] lg:min-h-0"></div>

      {/* Bottom Section: Quotes & Indicators */}
      <div className="w-full absolute bottom-8 left-0 right-0 px-4 flex flex-col items-center z-30">
        
        {/* Quote Section */}
        <div className="max-w-3xl w-full backdrop-blur-md bg-white/30 dark:bg-black/40 rounded-sm p-6 border border-white/40 dark:border-white/10 shadow-lg mb-6 flex flex-col items-center">
          <div className="flex gap-4 mb-3">
            <button
              onClick={prevQuote}
              className="text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={nextQuote}
              className="text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowRight size={14} />
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.5 }}
              className="relative w-full flex items-center justify-center px-4 md:px-8 text-center"
            >
              <FaQuoteLeft className="text-gray-500/40 dark:text-white/40 mr-3 -mt-3 hidden sm:block" size={12} />
              <p className={`${fontSizes[fontSize]?.quote || "text-base"} text-gray-900 dark:text-white/90 leading-relaxed font-serif italic max-w-2xl drop-shadow-sm dark:drop-shadow-md`}>
                "{slides[currentQuote].quote}"
              </p>
              <FaQuoteRight className="text-gray-500/40 dark:text-white/40 ml-3 mt-3 hidden sm:block" size={12} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative Lines (Carousel Indicators) */}
        <div className="flex gap-2 justify-center w-full">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? "w-8 bg-gray-900 dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  : "w-2 bg-gray-400/50 dark:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
