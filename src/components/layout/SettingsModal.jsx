import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { MdOutlineTranslate } from "react-icons/md";
import { 
  MousePointer2, Type, Aperture, Film, LayoutDashboard, Monitor, 
  Globe, Sparkles, Wind, Gauge, ScrollText, Zap, RotateCw, Palette,
  Eye, Layers, Cpu, ChevronRight, Clock, Calendar, Quote, Search, Link2, Bell
} from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

/* ─── Toggle Row ─── */
const ToggleRow = ({ icon: Icon, title, desc, value, onChange }) => (
  <div className="flex items-center gap-4 py-4 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0">
    <div className={`p-2 rounded-lg transition-colors duration-300 ${value ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
      <Icon size={16} strokeWidth={1.8} />
    </div>
    <div className="flex-1">
      <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{desc}</p>
    </div>
    <button 
      onClick={onChange} 
      className={`w-10 h-[22px] rounded-full transition-all duration-300 relative cursor-pointer ${value ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}
    >
      <div className={`absolute top-[3px] w-4 h-4 rounded-full transition-all duration-300 shadow-sm ${value ? 'left-[22px] bg-white dark:bg-zinc-900' : 'left-[3px] bg-white dark:bg-zinc-400'}`} />
    </button>
  </div>
);

/* ─── Slider Row ─── */
const SliderRow = ({ icon: Icon, title, desc, value, onChange, min, max, unit }) => (
  <div className="py-4 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0">
    <div className="flex items-center gap-4 mb-3">
      <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
        <Icon size={16} strokeWidth={1.8} />
      </div>
      <div className="flex-1">
        <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{desc}</p>
      </div>
      <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">{value}{unit}</span>
    </div>
    <div className="pl-12">
      <input 
        type="range" min={min} max={max} value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full appearance-none cursor-pointer accent-zinc-900 dark:accent-white"
      />
    </div>
  </div>
);

const SettingsModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("appearance");

  const { 
    cursorEnabled, setCursorEnabled,
    animationsEnabled, setAnimationsEnabled,
    sparksEnabled, setSparksEnabled,
    floatingParticles, setFloatingParticles,
    scanlines, setScanlines,
    monochrome, setMonochrome,
    performanceMode, setPerformanceMode,
    smoothScroll, setSmoothScroll,
    autoPlaySpeed, setAutoPlaySpeed,
    widgetsEnabled, setWidgetsEnabled,
    backdropBlur, setBackdropBlur,
    fontSize, setFontSize,
    showTime, setShowTime,
    showDate, setShowDate,
    showQuotation, setShowQuotation,
    showSearchBar, setShowSearchBar,
    showQuickLinks, setShowQuickLinks,
    showRotationSpeed, setShowRotationSpeed,
    showTextSizeWidget, setShowTextSizeWidget,
    showWhatsNew, setShowWhatsNew
  } = useSettings();

  const { i18n } = useTranslation("common");
  const { theme, setTheme } = useTheme();

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
  ];

  const sections = [
    { id: "appearance", label: "Appearance", icon: Eye },
    { id: "interface", label: "Interface", icon: Layers },
    { id: "effects", label: "Effects", icon: Sparkles },
    { id: "performance", label: "Performance", icon: Cpu },
    { id: "updates", label: "Updates", icon: Bell },
  ];

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const sliceVariants = {
    closed: {
      clipPath: "circle(0% at 100% 0%)",
      transition: { type: "spring", stiffness: 400, damping: 40, delay: 0.1 },
    },
    open: (i) => ({
      clipPath: "circle(150% at 100% 0%)",
      transition: { type: "spring", stiffness: 40, restDelta: 2, delay: i * 0.05 },
    }),
  };

  const renderContent = () => {
    switch (activeSection) {
      case "appearance":
        return (
          <div>
            {/* Theme */}
            <div className="mb-8">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 mb-4">Theme</p>
              <div className="flex gap-3">
                {[
                  { id: "light", label: "Light" },
                  { id: "dark", label: "Dark" },
                  { id: "system", label: "Auto" },
                ].map(t => (
                  <button 
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex-1 py-3 rounded-xl text-[12px] font-semibold transition-all duration-300 cursor-pointer ${
                      theme === t.id 
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/20 dark:shadow-white/20' 
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="mb-8">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 mb-4">Language</p>
              <div className="flex flex-col gap-2">
                {languages.map(lang => (
                  <button 
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                      i18n.language === lang.code 
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' 
                      : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <MdOutlineTranslate size={14} />
                    <span>{lang.name}</span>
                    {i18n.language === lang.code && <ChevronRight size={14} className="ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 mb-3">Visual</p>
              <ToggleRow icon={Palette} title="Monochrome" desc="Desaturate all colors" value={monochrome} onChange={() => setMonochrome(!monochrome)} />
            </div>
          </div>
        );

      case "interface":
        return (
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 mb-3">General</p>
            <ToggleRow icon={MousePointer2} title="Custom Cursor" desc="Enable tailored cursor tracking" value={cursorEnabled} onChange={() => setCursorEnabled(!cursorEnabled)} />
            <SliderRow icon={Type} title="Text Size" desc="Global base font size" value={fontSize} onChange={setFontSize} min={12} max={24} unit="px" />

            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 mb-3 mt-6">Hero Elements</p>
            <ToggleRow icon={Clock} title="Time Widget" desc="Display live clock on hero" value={showTime} onChange={() => setShowTime(!showTime)} />
            <ToggleRow icon={Calendar} title="Date Widget" desc="Display current date on hero" value={showDate} onChange={() => setShowDate(!showDate)} />
            <ToggleRow icon={Quote} title="Quotation" desc="Inspirational quotes section" value={showQuotation} onChange={() => setShowQuotation(!showQuotation)} />
            <ToggleRow icon={Search} title="Search Bar" desc="Hero search input field" value={showSearchBar} onChange={() => setShowSearchBar(!showSearchBar)} />
            <ToggleRow icon={Link2} title="Quick Links" desc="Shortcut navigation pills" value={showQuickLinks} onChange={() => setShowQuickLinks(!showQuickLinks)} />
            <ToggleRow icon={Gauge} title="Rotation Speed Widget" desc="Hero rotation interval controls" value={showRotationSpeed} onChange={() => setShowRotationSpeed(!showRotationSpeed)} />
            <ToggleRow icon={Type} title="Text Size Widget" desc="Hero text size selector controls" value={showTextSizeWidget} onChange={() => setShowTextSizeWidget(!showTextSizeWidget)} />
            <ToggleRow icon={Bell} title="What's New Widget" desc="Hero release notes announcement card" value={showWhatsNew} onChange={() => setShowWhatsNew(!showWhatsNew)} />
            <ToggleRow icon={LayoutDashboard} title="All Widgets" desc="Master toggle for all hero items" value={widgetsEnabled} onChange={() => setWidgetsEnabled(!widgetsEnabled)} />
          </div>
        );

      case "effects":
        return (
          <div>
            <ToggleRow icon={Film} title="Film Grain" desc="Cinematic noise overlay" value={scanlines} onChange={() => setScanlines(!scanlines)} />
            <ToggleRow icon={Sparkles} title="Click Sparks" desc="Particle burst on interaction" value={sparksEnabled} onChange={() => setSparksEnabled(!sparksEnabled)} />
            <ToggleRow icon={Wind} title="Floating Particles" desc="Ambient background particles" value={floatingParticles} onChange={() => setFloatingParticles(!floatingParticles)} />
            <SliderRow icon={Aperture} title="Backdrop Blur" desc="Glassmorphism blur intensity" value={backdropBlur} onChange={setBackdropBlur} min={0} max={100} unit="px" />
          </div>
        );

      case "performance":
        return (
          <div>
            <ToggleRow icon={Zap} title="Animations" desc="Enable motion and transitions" value={animationsEnabled} onChange={() => setAnimationsEnabled(!animationsEnabled)} />
            <ToggleRow icon={ScrollText} title="Smooth Scroll" desc="Lenis buttery scroll engine" value={smoothScroll} onChange={() => setSmoothScroll(!smoothScroll)} />
            <ToggleRow icon={Monitor} title="Performance Mode" desc="Disable heavy effects for speed" value={performanceMode} onChange={() => setPerformanceMode(!performanceMode)} />
            <SliderRow icon={RotateCw} title="Carousel Speed" desc="Auto-play slide interval" value={autoPlaySpeed / 1000} onChange={(v) => setAutoPlaySpeed(v * 1000)} min={2} max={15} unit="s" />
          </div>
        );

      case "updates":
        const versions = [
          { 
            id: "v1.2",
            title: "Major UI Overhaul & Performance Boost",
            date: "May 14, 2026",
            desc: "We've completely redesigned the home dashboard for a more cinematic and immersive experience. New GSAP animations ensure everything feels incredibly smooth. The new 'What's New' feature keeps you updated on all the latest tools we add for teachers.",
            features: ["Cinematic Dashboard", "GSAP Expanding Modals", "Minimalist Zinc Nav Style"]
          },
          { 
            id: "v1.1",
            title: "Gradebook & Visual Analytics",
            date: "April 28, 2026",
            desc: "An intuitive new interface for managing student grades with visual analytics. Track performance over time with beautiful, interactive charts.",
            features: ["Visual Analytics Dashboard", "Grade Tracking System", "One-click CSV Export"]
          },
          { 
            id: "v1.0",
            title: "Initial Teacher Starter Pack Launch",
            date: "April 1, 2026",
            desc: "The very first version of Teacher Starter Pack. Includes core functionalities designed specifically to save teachers time and energy.",
            features: ["Lesson Planner Module", "Schedule Manager", "Basic Student Roster"]
          }
        ];

        return (
          <div className="flex flex-col gap-6 max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar">
            {versions.map((v, i) => (
              <div key={v.id} className="border-b border-zinc-100 dark:border-zinc-800/50 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                    {v.id}
                  </span>
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
                    {v.date}
                  </span>
                </div>
                <h4 className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {v.title}
                </h4>
                <p className="text-[12px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                  {v.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {v.features.map((feature, fIdx) => (
                    <span 
                      key={fIdx} 
                      className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 px-2.5 py-1 rounded-full border border-zinc-100 dark:border-zinc-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Animated Background Slices */}
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={`settings-slice-${i}`}
              custom={i}
              variants={sliceVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`absolute inset-0 pointer-events-none ${
                i === 0 ? "bg-zinc-50 dark:bg-zinc-950" : i === 1 ? "bg-zinc-100 dark:bg-[#0a0a0b]" : "bg-white dark:bg-[#09090b]"
              } ${i === 0 ? "z-[101]" : i === 1 ? "z-[102]" : "z-[103]"}`}
              style={{ willChange: "clip-path" }}
            />
          ))}

          {/* Full Layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ delay: 0.3 }}
            className="relative z-[110] w-full h-full flex flex-col font-sans"
          >
            {/* ── Top Bar ── */}
            <div className="shrink-0 w-full px-8 md:px-12 pt-8 pb-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-zinc-300 dark:bg-zinc-700" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-600">Settings</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all duration-300 group cursor-pointer"
              >
                <FiX size={16} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* ── Sidebar + Content ── */}
            <div className="flex-1 flex overflow-hidden px-8 md:px-12 pb-12">
              {/* Sidebar */}
              <nav className="w-56 shrink-0 pr-8 border-r border-zinc-100 dark:border-zinc-800/50 flex flex-col gap-1 pt-4">
                {sections.map(section => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 cursor-pointer group ${
                        isActive
                          ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/10 dark:shadow-white/10'
                          : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      <section.icon size={16} strokeWidth={1.8} />
                      <span className="text-[13px] font-semibold tracking-tight">{section.label}</span>
                    </button>
                  );
                })}

                {/* Decorative footer */}
                <div className="mt-auto pt-6 px-4">
                  <div className="text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-300 dark:text-zinc-700">v2.4.0</div>
                </div>
              </nav>

              {/* Detail Panel */}
              <div className="flex-1 pl-10 pt-4 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="max-w-xl"
                  >
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">
                      {sections.find(s => s.id === activeSection)?.label}
                    </h3>
                    <p className="text-[12px] text-zinc-400 dark:text-zinc-500 mb-6">
                      {activeSection === "appearance" && "Customize colors, theme and language"}
                      {activeSection === "interface" && "Configure cursor, widgets and typography"}
                      {activeSection === "effects" && "Manage visual effects and overlays"}
                      {activeSection === "performance" && "Optimize speed and scroll behavior"}
                      {activeSection === "updates" && "Check out the latest features and release notes"}
                    </p>
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
