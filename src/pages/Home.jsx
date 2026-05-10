import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroControls from "../components/features/Hero/HeroControls";
import HeroCarousel from "../components/features/Hero/HeroCarousel";
import HeroInfo from "../components/features/Hero/HeroInfo";
import { useSettings } from "../context/SettingsContext";
import { slides } from "../data/heroSlides";

const Home = () => {
  const { fontSize, setFontSize, autoPlaySpeed, setAutoPlaySpeed } =
    useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [dateTime, setDateTime] = useState(new Date());
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-play for carousel
  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, autoPlaySpeed);
    return () => clearInterval(slideTimer);
  }, [currentSlide, autoPlaySpeed]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % slides.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full min-h-dvh bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-hidden font-serif transition-colors duration-1000">
      {/* Layer 0: Full Screen Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Background"
            className="w-full h-full object-cover opacity-30 dark:opacity-60 transition-opacity duration-500"
          />
        </motion.div>
      </AnimatePresence>

      {/* Layer 1: Blur Overlay */}
      <div className="absolute inset-0 z-0 backdrop-blur-2xl bg-white/40 dark:bg-black/40 transition-colors duration-500"></div>

      {/* Layer 2: Dark Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,1)_100%)] pointer-events-none transition-all duration-500"></div>

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-dvh pt-32 pb-10 px-4 md:px-8 lg:px-16 gap-8 items-center">
        <HeroControls
          currentSlide={currentSlide}
          currentQuote={currentQuote}
          nextQuote={nextQuote}
          prevQuote={prevQuote}
          dateTime={dateTime}
          fontSize={fontSize}
          setFontSize={setFontSize}
          autoPlaySpeed={autoPlaySpeed}
          setAutoPlaySpeed={setAutoPlaySpeed}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />

        <HeroCarousel
          currentSlide={currentSlide}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          setIsCVModalOpen={setIsCVModalOpen}
          slides={slides}
        />

        <HeroInfo
          currentSlide={currentSlide}
          dateTime={dateTime}
          fontSize={fontSize}
          slides={slides}
        />
      </div>
    </div>
  );
};

export default Home;
