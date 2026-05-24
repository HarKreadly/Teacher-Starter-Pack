import React from "react";
import { motion } from "framer-motion";
import { useSettings } from "../../../context/SettingsContext";

const HeroInfo = ({ dateTime }) => {
  const { showTime, showDate, widgetsEnabled } = useSettings();

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

  const dateVisible = widgetsEnabled && showDate;
  const timeVisible = widgetsEnabled && showTime;

  if (!dateVisible && !timeVisible) return null;

  return (
    <div className="lg:col-span-3 flex flex-col justify-center lg:justify-end h-full py-6 lg:py-12 order-2 lg:order-3 px-4 md:px-8 lg:pr-8 relative z-50 items-center lg:items-end mt-12 lg:mt-0">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center lg:items-end gap-6 w-full max-w-[280px] mx-auto lg:mx-0 mt-auto"
      >
        {/* Date Card */}
        {dateVisible && (
          <div className="bg-white/30 dark:bg-black/40 backdrop-blur-lg p-5 rounded-sm border border-white/40 dark:border-white/10 shadow-lg w-full flex flex-col gap-2">
            <span className="text-[10px] font-bold tracking-widest text-gray-900 dark:text-white uppercase text-center lg:text-right">
              Date
            </span>
            <div className="text-2xl font-serif text-center lg:text-right">
              <span className="font-normal text-gray-900 dark:text-white">
                {day}
              </span>{" "}
              <span className="text-gray-500 dark:text-gray-400 font-light">
                of
              </span>{" "}
              <span className="text-gray-900 dark:text-white">
                {month}
              </span>
              <span className="text-base text-gray-900 dark:text-white font-normal ml-2">
                {year}
              </span>
            </div>
          </div>
        )}

        {/* Time Card */}
        {timeVisible && (
          <div className="bg-white/30 dark:bg-black/40 backdrop-blur-lg p-5 rounded-sm border border-white/40 dark:border-white/10 shadow-lg w-full flex flex-col gap-2">
            <span className="text-[10px] font-bold tracking-widest text-gray-900 dark:text-white uppercase text-center lg:text-right">
              Time
            </span>
            <div className="flex items-center justify-center lg:justify-end text-gray-600 dark:text-gray-300 w-full">
              <div className="text-center lg:text-right">
                <span className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white tracking-tighter flex items-baseline gap-2 justify-center lg:justify-end drop-shadow-sm">
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
        )}
      </motion.div>
    </div>
  );
};

export default HeroInfo;
