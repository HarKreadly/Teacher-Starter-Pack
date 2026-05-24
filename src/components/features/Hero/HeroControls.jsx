import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Bell, ArrowUpRight, X, Type, Gauge, List, Clock, CheckCircle2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSettings } from "../../../context/SettingsContext";

const HeroControls = ({
  fontSize,
  setFontSize,
  autoPlaySpeed,
  setAutoPlaySpeed,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeVersionId, setActiveVersionId] = useState("v1.2");
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const { widgetsEnabled, showRotationSpeed, showTextSizeWidget, showWhatsNew } = useSettings();

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

  const activeVersion = versions.find(v => v.id === activeVersionId) || versions[0];

  useGSAP(() => {
    if (expanded) {
      gsap.to(overlayRef.current, {
        duration: 0.6,
        autoAlpha: 1,
        ease: "expo.inOut"
      });
      gsap.fromTo(".expanded-item", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, stagger: 0.05, ease: "expo.out" }
      );
    } else {
      gsap.to(overlayRef.current, {
        duration: 0.5,
        autoAlpha: 0,
        ease: "expo.inOut"
      });
    }
  }, [expanded]);

  // Animate content change when activeVersionId changes
  useGSAP(() => {
    if (expanded && contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeVersionId, expanded]);

  const speedVisible = widgetsEnabled && showRotationSpeed;
  const sizeVisible = widgetsEnabled && showTextSizeWidget;
  const whatsNewVisible = widgetsEnabled && showWhatsNew;

  if (!speedVisible && !sizeVisible && !whatsNewVisible) return null;

  return (
    <div className="lg:col-span-3 flex flex-col h-full py-6 lg:py-12 order-3 lg:order-1 px-4 md:px-8 lg:pl-8 relative z-40">
      
      {/* Wrapper to push everything to the bottom */}
      <div className="mt-auto flex flex-col gap-4 w-full max-w-[280px] mx-auto lg:mx-0">
        
        {/* Speed Card */}
        {speedVisible && (
          <div className="w-full backdrop-blur-md bg-white/30 dark:bg-black/40 rounded-sm p-4 border border-white/40 dark:border-white/10 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="text-gray-900 dark:text-white" size={16} />
              <h3 className="text-[10px] font-semibold tracking-widest text-gray-900 dark:text-white uppercase">
                Rotation Speed
              </h3>
            </div>
            <div className="flex gap-2">
              {[12, 8, 6, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setAutoPlaySpeed(num * 1000)}
                  className={`flex-1 py-1.5 rounded-sm text-xs font-bold transition-all duration-300 ${
                    autoPlaySpeed === num * 1000
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-white/50 dark:bg-black/50 text-gray-800 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/20"
                  }`}
                >
                  {num}s
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Card */}
        {sizeVisible && (
          <div className="w-full backdrop-blur-md bg-white/30 dark:bg-black/40 rounded-sm p-4 border border-white/40 dark:border-white/10 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Type className="text-gray-900 dark:text-white" size={16} />
              <h3 className="text-[10px] font-semibold tracking-widest text-gray-900 dark:text-white uppercase">
                Text Size
              </h3>
            </div>
            <div className="flex gap-2">
              {[
                { id: "sm", label: "A", sizeClass: "text-xs" },
                { id: "md", label: "A", sizeClass: "text-sm" },
                { id: "lg", label: "A", sizeClass: "text-base" },
              ].map((sizeObj) => (
                <button
                  key={sizeObj.id}
                  onClick={() => setFontSize(sizeObj.id)}
                  className={`flex-1 py-1.5 rounded-sm font-serif transition-all duration-300 ${sizeObj.sizeClass} ${
                    fontSize === sizeObj.id
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-white/50 dark:bg-black/50 text-gray-800 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/20"
                  }`}
                >
                  {sizeObj.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* What's New Card */}
        {whatsNewVisible && (
          <div 
            onClick={() => setExpanded(true)}
            className="w-full backdrop-blur-md bg-white/30 dark:bg-black/40 rounded-sm p-5 border border-white/40 dark:border-white/10 shadow-lg cursor-pointer hover:bg-white/40 dark:hover:bg-black/50 transition-colors duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase">
                What's New!
              </h3>
              <ArrowUpRight size={14} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">
                {versions[0].date}
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                {versions[0].title}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Full Screen Overlay (GSAP) via Portal */}
      {createPortal(
        <div 
          ref={overlayRef} 
          className="fixed inset-0 z-[99999] invisible opacity-0 bg-gray-50 dark:bg-[#09090b] flex flex-col overflow-hidden"
        >
          {/* Header / Nav */}
          <div className="expanded-item w-full px-6 py-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-white/10">
                <Bell className="text-gray-900 dark:text-white" size={20} />
              </div>
              <span className="text-sm font-bold tracking-widest uppercase text-gray-900 dark:text-white">
                Release Notes
              </span>
            </div>

            <div 
              className="flex gap-3 items-center cursor-pointer group"
              onClick={() => setExpanded(false)}
            >
              <span className="text-gray-900 dark:text-white font-sans uppercase text-xs font-bold tracking-widest group-hover:opacity-70 transition-opacity">
                Close
              </span>
              <div className="p-2 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-colors">
                <X size={20} className="text-gray-900 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto h-full overflow-hidden">
            
            {/* Sidebar: Versions Nav */}
            <div className="expanded-item w-full md:w-64 lg:w-80 border-r border-gray-200 dark:border-white/10 p-6 md:p-8 overflow-y-auto custom-scrollbar flex flex-col gap-4">
              <h4 className="text-[10px] font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-2">
                Versions
              </h4>
              {versions.map((v) => (
                <div 
                  key={v.id}
                  onClick={() => setActiveVersionId(v.id)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className={`p-2 rounded-full transition-colors ${
                    activeVersionId === v.id 
                      ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md"
                      : "bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-white/10"
                  }`}>
                    <List size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xs font-bold tracking-widest uppercase transition-colors ${
                      activeVersionId === v.id ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    }`}>
                      {v.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Area: Active Version Details */}
            <div className="expanded-item flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto custom-scrollbar relative">
              <div ref={contentRef} className="max-w-3xl mx-auto flex flex-col">
                
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                    {activeVersion.date}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 dark:text-white mb-8 leading-tight">
                  {activeVersion.title}
                </h1>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {activeVersion.desc}
                  </p>

                  <h3 className="text-sm font-bold tracking-widest text-gray-900 dark:text-white uppercase mb-6 flex items-center gap-2">
                    <Bell size={16} /> Key Features
                  </h3>
                  
                  <ul className="flex flex-col gap-4">
                    {activeVersion.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 size={18} className="text-gray-900 dark:text-white" />
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default HeroControls;
