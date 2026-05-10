import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { slides } from "../../../data/heroSlides";

const HeroControls = ({
  currentSlide,
  currentQuote,
  nextQuote,
  prevQuote,
  dateTime,
  fontSize,
  setFontSize,
  autoPlaySpeed,
  setAutoPlaySpeed,
  nextSlide,
  prevSlide,
}) => {
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = hours.toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return { hours: hoursStr, minutes, seconds, ampm };
  };

  const { day, month, year } = formatDate(dateTime);
  const { hours, minutes, ampm } = formatTime(dateTime);

  const fontSizes = {
    sm: {
      title: "text-6xl md:text-9xl",
      text: "text-sm",
      quote: "text-xs",
    },
    md: {
      title: "text-8xl md:text-[10rem]",
      text: "text-base",
      quote: "text-sm",
    },
    lg: {
      title: "text-9xl md:text-[12rem]",
      text: "text-lg",
      quote: "text-base",
    },
  };

  return (
    <div className="lg:col-span-3 flex flex-col h-full py-6 lg:py-12 order-3 lg:order-1 px-4 md:px-8 lg:pl-8 relative z-40 items-center lg:items-start gap-8">
      {/* Speed & Size Controls - Desktop Only */}
      <div className="mb-auto hidden lg:flex lg:flex-col lg:gap-20">
        {/* Speed */}
        <div>
          <span className="block text-xs font-bold tracking-widest text-gray-900 dark:text-white mb-4 uppercase">
            Speed
          </span>
          <div className="text-sm tracking-[0.5em] text-gray-500 dark:text-gray-500 font-light flex gap-4">
            {[12, 8, 6, 4].map((num) => (
              <button
                key={num}
                onClick={() => setAutoPlaySpeed(num * 1000)}
                className={`transition-colors hover:text-black dark:hover:text-white ${
                  autoPlaySpeed === num * 1000
                    ? "text-black dark:text-white font-bold"
                    : ""
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="flex flex-col gap-4">
          <span className="block text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase">
            Size
          </span>
          <div className="flex gap-6">
            <div className="w-[1px] h-32 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex flex-col justify-between h-32 font-serif">
              <button
                onClick={() => setFontSize("lg")}
                className={`text-5xl leading-none transition-colors ${
                  fontSize === "lg"
                    ? "text-gray-900 dark:text-white font-normal"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("md")}
                className={`text-3xl leading-none transition-colors ${
                  fontSize === "md"
                    ? "text-gray-900 dark:text-white font-normal"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("sm")}
                className={`text-xl leading-none transition-colors ${
                  fontSize === "sm"
                    ? "text-gray-900 dark:text-white font-normal"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
                }`}
              >
                A
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Speed & Size Controls - Mobile/Tablet/Small Laptop */}
      <div className="lg:hidden w-full flex gap-4">
        {/* Speed */}
        <div className="flex-1 backdrop-blur-sm bg-gray-100/30 dark:bg-white/5 rounded-lg p-4 flex flex-col items-center gap-3">
          <span className="block text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase">
            Speed
          </span>
          <div className="text-sm tracking-[0.3em] text-gray-500 dark:text-gray-500 font-light flex gap-3 justify-center">
            {[12, 8, 6, 4].map((num) => (
              <button
                key={num}
                onClick={() => setAutoPlaySpeed(num * 1000)}
                className={`transition-colors hover:text-black dark:hover:text-white ${
                  autoPlaySpeed === num * 1000
                    ? "text-black dark:text-white font-bold"
                    : ""
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="flex-1 backdrop-blur-sm bg-gray-100/30 dark:bg-white/5 rounded-lg p-4 flex flex-col items-center gap-3">
          <span className="block text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase">
            Size
          </span>
          <div className="flex gap-4 items-end justify-center">
            <button
              onClick={() => setFontSize("lg")}
              className={`text-3xl leading-none transition-colors ${
                fontSize === "lg"
                  ? "text-gray-900 dark:text-white font-normal"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize("md")}
              className={`text-2xl leading-none transition-colors ${
                fontSize === "md"
                  ? "text-gray-900 dark:text-white font-normal"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize("sm")}
              className={`text-lg leading-none transition-colors ${
                fontSize === "sm"
                  ? "text-gray-900 dark:text-white font-normal"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
              }`}
            >
              A
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Desktop Only */}
      <div className="hidden lg:flex lg:flex-col gap-6">
        <button
          onClick={prevSlide}
          className="w-14 h-14 rounded-full bg-gray-200/50 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-300/50 dark:hover:bg-white/20 transition-all duration-300 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
        </button>
        <button
          onClick={nextSlide}
          className="w-14 h-14 ml-4 rounded-full bg-gray-900 text-white dark:bg-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Date & Time - Mobile/Tablet/Small Laptop */}
      <div className="lg:hidden w-full backdrop-blur-sm bg-gray-100/30 dark:bg-white/5 rounded-lg p-6 flex flex-col gap-6">
        {/* Date */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase text-center">
            Date
          </span>
          <div className="text-2xl font-serif text-center">
            <span className="font-normal text-gray-900 dark:text-white">
              {day}
            </span>{" "}
            <span className="text-gray-500 dark:text-gray-400 font-light">
              of
            </span>{" "}
            {month}
            <span className="text-base text-gray-900 dark:text-white font-normal ml-2">
              {year}
            </span>
          </div>
        </div>

        {/* Time */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase text-center">
            Time
          </span>
          <div className="text-center">
            <span className="text-3xl font-light text-gray-900 dark:text-white tracking-tighter flex items-baseline gap-2 justify-center">
              <span>
                <span className="font-bold">{hours}</span>:{minutes}
              </span>
              <span className="text-xl text-gray-500 dark:text-gray-400 font-normal">
                {ampm}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Quote & Navigation */}
      <div className="mt-auto w-full flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start gap-6 mb-8">
          <div className="flex gap-4">
            <button
              onClick={prevQuote}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={nextQuote}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="relative pt-8 pb-8 px-6 backdrop-blur-sm bg-gray-100/30 dark:bg-white/5 rounded-lg w-full lg:w-auto"
          >
            <FaQuoteLeft
              className="absolute top-2 left-2 text-gray-400 dark:text-gray-500 opacity-60"
              size={24}
            />
            <p
              className={`${fontSizes[fontSize].quote} text-gray-600 dark:text-gray-400 leading-relaxed text-center lg:text-left`}
            >
              {slides[currentQuote].quote}
            </p>
            <FaQuoteRight
              className="absolute bottom-2 right-2 text-gray-400 dark:text-gray-500 opacity-60"
              size={24}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroControls;
