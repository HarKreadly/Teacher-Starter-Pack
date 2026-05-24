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
    return saved !== null ? JSON.parse(saved) : true; // Film grain default true
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
    try {
      const saved = localStorage.getItem("harkreadly_fontsize");
      if (saved === null) return 16;
      const parsed = JSON.parse(saved);
      // Guard against old string values like "md"
      return typeof parsed === "number" ? parsed : 16;
    } catch {
      return 16;
    }
  });

  const [backdropBlur, setBackdropBlur] = useState(() => {
    const saved = localStorage.getItem("harkreadly_backdropblur");
    return saved !== null ? JSON.parse(saved) : 60;
  });

  const [widgetsEnabled, setWidgetsEnabled] = useState(() => {
    const saved = localStorage.getItem("harkreadly_widgets");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [showTime, setShowTime] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showtime");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [showDate, setShowDate] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showdate");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [showQuotation, setShowQuotation] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showquotation");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [showSearchBar, setShowSearchBar] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showsearchbar");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [showQuickLinks, setShowQuickLinks] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showquicklinks");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [showRotationSpeed, setShowRotationSpeed] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showrotationspeed");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [showTextSizeWidget, setShowTextSizeWidget] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showtextsizewidget");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [showWhatsNew, setShowWhatsNew] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showwhatsnew");
    return saved !== null ? JSON.parse(saved) : true;
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
    localStorage.setItem("harkreadly_fontsize", JSON.stringify(fontSize));
    localStorage.setItem("harkreadly_backdropblur", JSON.stringify(backdropBlur));
    localStorage.setItem("harkreadly_widgets", JSON.stringify(widgetsEnabled));
    localStorage.setItem("harkreadly_showtime", JSON.stringify(showTime));
    localStorage.setItem("harkreadly_showdate", JSON.stringify(showDate));
    localStorage.setItem("harkreadly_showquotation", JSON.stringify(showQuotation));
    localStorage.setItem("harkreadly_showsearchbar", JSON.stringify(showSearchBar));
    localStorage.setItem("harkreadly_showquicklinks", JSON.stringify(showQuickLinks));
    localStorage.setItem("harkreadly_showrotationspeed", JSON.stringify(showRotationSpeed));
    localStorage.setItem("harkreadly_showtextsizewidget", JSON.stringify(showTextSizeWidget));
    localStorage.setItem("harkreadly_showwhatsnew", JSON.stringify(showWhatsNew));
  }, [
    cursorEnabled, animationsEnabled, sparksEnabled, floatingParticles, 
    scanlines, monochrome, performanceMode, smoothScroll, 
    autoPlaySpeed, fontSize, backdropBlur, widgetsEnabled,
    showTime, showDate, showQuotation, showSearchBar, showQuickLinks,
    showRotationSpeed, showTextSizeWidget, showWhatsNew
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
      fontSize, setFontSize,
      backdropBlur, setBackdropBlur,
      widgetsEnabled, setWidgetsEnabled,
      showTime, setShowTime,
      showDate, setShowDate,
      showQuotation, setShowQuotation,
      showSearchBar, setShowSearchBar,
      showQuickLinks, setShowQuickLinks,
      showRotationSpeed, setShowRotationSpeed,
      showTextSizeWidget, setShowTextSizeWidget,
      showWhatsNew, setShowWhatsNew
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
