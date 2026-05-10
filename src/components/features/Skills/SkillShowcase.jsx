import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { 
  Heart, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Zap,
  X
} from "lucide-react";

// Helper to generate consistent mock data based on the clicked skill's title
const getSkillMockData = (title) => {
  const hash = title?.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) || 100;
  const score = 65 + (hash % 30); // Generates a score between 65 and 95
  
  return {
    domain: ["Frontend", "Backend", "Design", "DevOps"][hash % 4],
    experience: `${1 + (hash % 5)}+ Years`,
    projects: `${10 + (hash % 20)} Completed`,
    score: score,
    decimals: ".50",
    related: ["JavaScript", "React", "Node.js", "Figma", "UI/UX", "API"].sort(() => 0.5 - Math.random()).slice(0, 5),
    expMatch: score - 5,
    skillMatch: score + 4,
    reqMatch: score - 10,
  };
};

const SkillShowcase = ({ skill, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  
  // Accordion state
  const [openSections, setOpenSections] = useState({
    description: true,
    capabilities: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle GSAP Entry and Exit animations
  useEffect(() => {
    if (skill && !isClosing) {
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(modalRef.current, 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [skill, isClosing]);

  const handleClose = () => {
    setIsClosing(true);
    gsap.to(modalRef.current, { 
      y: 30, opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" 
    });
    gsap.to(overlayRef.current, { 
      opacity: 0, duration: 0.3, ease: "power2.in", delay: 0.1, 
      onComplete: () => {
        setIsClosing(false);
        onClose();
      } 
    });
  };

  if (!skill) return null;

  const data = getSkillMockData(skill.title);
  const Icon = skill.icon;
  const totalBars = 60;
  const filledBars = Math.floor((data.score / 100) * totalBars);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 md:p-10"
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-white w-full max-w-[900px] max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="p-8 md:p-10 flex flex-col gap-6">
          
          {/* --- Header --- */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-[#0a0a0a] dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center text-3xl shadow-md">
                {Icon && <Icon />}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{skill.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{data.domain} Ecosystem</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors">
                <Heart size={20} />
              </button>
              <button 
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center gap-2"
              >
                <X size={16} /> Close
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-[#0a0a0a] dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-black dark:hover:bg-slate-200 transition-colors shadow-md">
                View Projects <span>›</span>
              </button>
            </div>
          </div>

          {/* --- Meta Data Grid & Tags --- */}
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Meta Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl p-6">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Core Tech</p>
                <p className="text-sm font-semibold">{skill.title}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Domain Role</p>
                <p className="text-sm font-semibold">{data.domain} Eng.</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Competency</p>
                <p className="text-sm font-semibold">Expert Level</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Location</p>
                <p className="text-sm font-semibold">Sydney, AU</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Status</p>
                <p className="text-sm font-semibold">Active Use</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Experience</p>
                <p className="text-sm font-semibold">{data.experience}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Applied In</p>
                <p className="text-sm font-semibold">{data.projects}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Mentorship</p>
                <p className="text-sm font-semibold">Available</p>
              </div>
            </div>

            {/* Tags / Related Skills */}
            <div className="w-full md:w-64 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-[#0a0a0a]">
              <p className="text-xs text-slate-400 font-medium mb-3">Related Stack</p>
              <div className="flex flex-wrap gap-2">
                {data.related.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800/30"
                  >
                    <Check size={10} strokeWidth={3} /> {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* --- Score Section --- */}
          <div className="border border-slate-100 dark:border-slate-800 rounded-2xl p-6 bg-white dark:bg-[#0a0a0a] shadow-sm flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Mastery Score</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                <Zap size={14} className="text-purple-500" /> Optimize
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {data.score}
                </span>
                <span className="text-sm font-semibold text-slate-400">
                  {data.decimals} <span className="font-normal text-slate-300 dark:text-slate-600">of 100</span>
                </span>
              </div>

              {/* Vertical Bar Chart Graphic */}
              <div className="flex-1 flex items-center h-8 gap-[2px]">
                {Array.from({ length: totalBars }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 h-full rounded-sm ${
                      i < filledBars 
                        ? 'bg-gradient-to-b from-purple-500 to-pink-400' 
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                    style={{ 
                      opacity: i < filledBars ? 1 - (i * 0.01) : 1,
                      height: i % 3 === 0 ? '100%' : i % 2 === 0 ? '80%' : '60%' 
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Score Breakdowns */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-2">
              <div className="w-1/3 pr-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{data.expMatch}%</span>
                  <span className="text-xs font-medium text-slate-400 pb-1">Practical Use</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${data.expMatch}%` }} />
                </div>
              </div>
              
              <div className="w-1/3 px-4 border-l border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{data.skillMatch}%</span>
                  <span className="text-xs font-medium text-slate-400 pb-1">Theoretical</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${data.skillMatch}%` }} />
                </div>
              </div>

              <div className="w-1/3 pl-4 border-l border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{data.reqMatch}%</span>
                  <span className="text-xs font-medium text-slate-400 pb-1">Architecture</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${data.reqMatch}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* --- Accordions --- */}
          <div className="flex flex-col gap-4 pb-4">
            
            {/* Description Accordion */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0a]">
              <button 
                onClick={() => toggleSection('description')}
                className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-[#0a0a0a] hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Skill Overview</h4>
                {openSections.description ? <ChevronUp size={18} className="text-slate-400"/> : <ChevronDown size={18} className="text-slate-400"/>}
              </button>
              
              {openSections.description && (
                <div className="px-6 pb-6 pt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                  <p>{skill.desc}</p>
                  <p className="mt-3">
                    Leveraging {skill.title} allows for robust, scalable, and highly performant applications. This competency involves understanding the underlying mechanisms, best practices, and ecosystem tooling to deliver production-ready software.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillShowcase;