import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  // --- Persistent States ---
  const [cursorEnabled, setCursorEnabled] = useState(() => {
    const saved = localStorage.getItem("harkreadly_cursor");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const saved = localStorage.getItem("harkreadly_animations");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [sparksEnabled, setSparksEnabled] = useState(() => {
    const saved = localStorage.getItem("harkreadly_sparks");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [floatingParticles, setFloatingParticles] = useState(() => {
    const saved = localStorage.getItem("harkreadly_particles");
    return saved !== null ? JSON.parse(saved) : true; // Default to true now
  });

  const [scanlines, setScanlines] = useState(() => {
    const saved = localStorage.getItem("harkreadly_scanlines");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [monochrome, setMonochrome] = useState(() => {
    const saved = localStorage.getItem("harkreadly_monochrome");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [performanceMode, setPerformanceMode] = useState(() => {
    const saved = localStorage.getItem("harkreadly_performance");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [smoothScroll, setSmoothScroll] = useState(() => {
    const saved = localStorage.getItem("harkreadly_smoothscroll");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [autoPlaySpeed, setAutoPlaySpeed] = useState(() => {
    const saved = localStorage.getItem("harkreadly_autoplay");
    return saved !== null ? JSON.parse(saved) : 6000;
  });

  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("harkreadly_fontsize");
    return saved !== null ? saved : "md";
  });

  // --- Persistence Effect ---
  useEffect(() => {
    localStorage.setItem("harkreadly_cursor", JSON.stringify(cursorEnabled));
    localStorage.setItem("harkreadly_animations", JSON.stringify(animationsEnabled));
    localStorage.setItem("harkreadly_sparks", JSON.stringify(sparksEnabled));
    localStorage.setItem("harkreadly_particles", JSON.stringify(floatingParticles));
    localStorage.setItem("harkreadly_scanlines", JSON.stringify(scanlines));
    localStorage.setItem("harkreadly_monochrome", JSON.stringify(monochrome));
    localStorage.setItem("harkreadly_performance", JSON.stringify(performanceMode));
    localStorage.setItem("harkreadly_smoothscroll", JSON.stringify(smoothScroll));
    localStorage.setItem("harkreadly_autoplay", JSON.stringify(autoPlaySpeed));
    localStorage.setItem("harkreadly_fontsize", fontSize);
  }, [
    cursorEnabled, animationsEnabled, sparksEnabled, floatingParticles, 
    scanlines, monochrome, performanceMode, smoothScroll, 
    autoPlaySpeed, fontSize
  ]);

  return (
    <SettingsContext.Provider value={{ 
      cursorEnabled, setCursorEnabled,
      animationsEnabled, setAnimationsEnabled,
      sparksEnabled, setSparksEnabled,
      floatingParticles, setFloatingParticles,
      scanlines, setScanlines,
      monochrome, setMonochrome,
      performanceMode, setPerformanceMode,
      smoothScroll, setSmoothScroll,
      autoPlaySpeed, setAutoPlaySpeed,
      fontSize, setFontSize
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
