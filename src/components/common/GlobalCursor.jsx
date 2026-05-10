import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useSettings } from "../../context/SettingsContext";

const GlobalCursor = () => {
  const { cursorEnabled } = useSettings();
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (!isMobile && cursorEnabled) {
      window.addEventListener("mousemove", handleMouseMove);
      // Removed: document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    };
  }, [isMobile, cursorEnabled, mouseX, mouseY]);

  if (isMobile || !cursorEnabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none mix-blend-difference z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="rounded-full bg-white opacity-40 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        animate={{
          width: 40,  // Static size
          height: 40, // Static size
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 250,
        }}
      />
      
      {/* Small Core Dot */}
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="w-1 h-1 bg-white rounded-full opacity-80" />
      </div>
    </motion.div>
  );
};

export default GlobalCursor;
