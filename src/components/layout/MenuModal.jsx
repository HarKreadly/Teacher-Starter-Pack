import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FiX, FiArrowRight } from "react-icons/fi";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const menuItems = [
  { name: "Home", path: "/", id: "01" },
  { name: "Lesson Plans", path: "/lesson-plans", id: "02" },
  { name: "Warmups", path: "/warm-ups", id: "03" },
  { name: "Exercises", path: "/exercises", id: "04" },
  { name: "Assessments", path: "/assessments", id: "05" },
  { name: "Lessons", path: "/lessons", id: "06" },
  { name: "Textbooks", path: "/textbooks", id: "07" },
  { name: "Contact", path: "/contact", id: "08" },
];

const MenuModal = ({ isOpen, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sliceVariants = {
    closed: {
      clipPath: "circle(0% at 0% 0%)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.1,
      },
    },
    open: (i) => ({
      clipPath: "circle(150% at 0% 0%)",
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 2,
        delay: i * 0.05,
      },
    }),
  };

  const firstHalf = menuItems.slice(0, 4);
  const secondHalf = menuItems.slice(4, 8);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Refined Theme-Aware Pie Slices */}
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={`menu-slice-${i}`}
              custom={i}
              variants={sliceVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
                i === 0
                  ? "bg-card"
                  : i === 1
                  ? "bg-popover"
                  : "bg-background"
              } ${i === 0 ? "z-[101]" : i === 1 ? "z-[102]" : "z-[103]"}`}
              style={{ willChange: "clip-path" }}
            />
          ))}

          {/* Content Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
            transition={{ delay: 0.3 }}
            className="relative z-110 w-full h-full flex flex-col p-4 md:p-8 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Corner Close Button */}
            <button
              onClick={onClose}
              className="absolute top-0 left-0 p-2 m-8 hover:cursor-pointer rounded-full text-foreground hover:text-primary transition-colors z-120 group bg-zinc-100"
            >
              <FiX
                size={22}
                className="group-hover:rotate-90 transition-transform duration-500 text-zinc-950"
              />
            </button>

            {/* Two-Column Menu Links */}
            <div className="grow flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16">
              <nav className="w-full max-w-xs flex flex-col gap-2">
                {firstHalf.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={`
                            group flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300
                            ${
                              isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "bg-muted/10 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }
                          `}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-medium opacity-50 tracking-widest font-mono">
                            {item.id}
                          </span>
                          <span className="text-base font-bold tracking-tight uppercase">
                            {item.name}
                          </span>
                        </div>
                        <FiArrowRight
                          size={14}
                          className={`transition-all duration-300 ${
                            isActive
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="hidden lg:block w-px h-48 bg-border/30"></div>

              <nav className="w-full max-w-xs flex flex-col gap-2">
                {secondHalf.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i + 4) * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={`
                            group flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300
                            ${
                              isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "bg-muted/10 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }
                          `}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-medium opacity-50 tracking-widest font-mono">
                            {item.id}
                          </span>
                          <span className="text-base font-bold tracking-tight uppercase">
                            {item.name}
                          </span>
                        </div>
                        <FiArrowRight
                          size={14}
                          className={`transition-all duration-300 ${
                            isActive
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Footer */}
            <footer className="mt-auto py-8 flex justify-between items-center w-full opacity-50">
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-foreground bg-muted rounded-full p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <FaGithub size={20} />
                </a>
              </div>
              <div className="text-xs text-muted-foreground font-bold tracking-[0.2em] uppercase">
                Warmedia // 2026
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;
