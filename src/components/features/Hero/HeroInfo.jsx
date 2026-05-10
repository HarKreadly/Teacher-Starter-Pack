import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slides } from "../../../data/heroSlides";

const HeroInfo = ({ currentSlide, dateTime, fontSize }) => {
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

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const { day, month, year } = formatDate(dateTime);
  const { hours, minutes, seconds, ampm } = formatTime(dateTime);

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
    <div className="lg:col-span-3 flex flex-col justify-between h-full py-6 lg:py-12 order-2 lg:order-3 px-4 md:px-8 lg:pr-8 relative z-40 items-center lg:items-end">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center lg:items-end"
        >
          <h3 className="text-3xl md:text-4xl font-serif mb-6 leading-tight text-gray-900 dark:text-white text-center lg:text-right">
            {slides[currentSlide].rightTitle}
          </h3>
          <div className="w-12 h-1 bg-gray-400 dark:bg-gray-700 mb-8 mx-auto lg:ml-auto lg:mr-0"></div>
          <p
            className={`${fontSizes[fontSize].text} text-gray-600 dark:text-gray-400 leading-loose mb-12 max-w-xs transition-all duration-300 text-center lg:text-right`}
          >
            {slides[currentSlide].rightText}
          </p>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col items-center lg:items-end gap-8"
      >
        {/* Date */}
        <div className="hidden lg:flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase text-center lg:text-right">
            Date
          </span>
          <div className="text-2xl font-serif text-center lg:text-right">
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

        {/* Clock */}
        <div className="hidden lg:flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase text-center lg:text-right">
            Time
          </span>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
            <div className="text-center lg:text-right">
              <span className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white tracking-tighter flex items-baseline gap-2 justify-center lg:justify-end">
                <span>
                  <span className="font-bold">{hours}</span>:{minutes}
                </span>
                <span className="text-2xl text-gray-500 dark:text-gray-400 font-normal">
                  {ampm}
                </span>
              </span>
              <span className="text-xl text-gray-500 font-light tracking-widest mt-1 block">
                {seconds}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroInfo;
