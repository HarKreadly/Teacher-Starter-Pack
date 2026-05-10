import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Linkedin, 
  Instagram, 
  Github, 
  ArrowRight, 
  Square, 
  Circle,
  Hash,
  Activity,
  Terminal,
  Cpu,
  ShieldCheck
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Home", path: "/", sub: "System Root", id: "01" },
  { name: "About", path: "/about", sub: "Core Profile", id: "02" },
  { name: "Skills", path: "/skills", sub: "Capabilities", id: "03" },
  { name: "Projects", path: "/projects", sub: "Archive", id: "04" },
  { name: "Settings", path: "/settings", sub: "Calibration", id: "05" },
  { name: "Contact", path: "/contact", sub: "Connection", id: "06" },
];

const MenuModal = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const sliceVariants = {
    closed: {
      clipPath: "inset(0 0 100% 0)",
      transition: {
        duration: 0.6,
        ease: [0.77, 0, 0.175, 1],
        delay: 0.2
      }
    },
    open: (i) => ({
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: 0.8,
        ease: [0.77, 0, 0.175, 1],
        delay: i * 0.1,
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          
          {/* Cinematic Shutter Slices */}
          {[1, 2].map((_, i) => (
            <motion.div
              key={`menu-slice-${i}`}
              custom={i}
              variants={sliceVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`absolute inset-0 pointer-events-none ${
                i === 0 ? "bg-zinc-950/90" : "bg-black/95"
              } ${i === 0 ? "z-[101]" : "z-[102]"}`}
            />
          ))}

          {/* Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[103] backdrop-blur-2xl pointer-events-none"
          />

          {/* Content Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
            transition={{ delay: 0.4 }}
            className="relative z-[110] w-full h-full flex flex-col p-8 lg:p-16 max-w-[1600px] mx-auto font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Top Bar */}
            <header className="flex justify-between items-start w-full mb-12">
               <div className="flex items-center gap-6">
                  <div className="flex flex-col gap-1">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-[11px] font-black tracking-[0.4em] uppercase text-white">System Navigation</span>
                     </div>
                     <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-600">Site Build 3.1.2 // Root Access Active</span>
                  </div>
               </div>
               
               <button
                  onClick={onClose}
                  className="flex items-center gap-4 py-3 px-8 rounded-sm rounded-br-2xl bg-white/5 hover:bg-white hover:text-black transition-all border border-white/10 group shadow-2xl"
               >
                  <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Close Module</span>
                  <X size={18} className="group-hover:rotate-90 transition-transform duration-500" />
               </button>
            </header>

            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
               
               {/* Left: System Diagnostics (Cinematic Decor) */}
               <div className="hidden lg:flex lg:col-span-4 flex-col gap-10">
                  <div className="space-y-6">
                     <div className="flex items-center gap-4 text-zinc-500">
                        <Terminal size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Status Report</span>
                     </div>
                     <div className="space-y-4">
                        {[
                           { label: "Latency", val: "12ms", icon: Activity },
                           { label: "Core Link", val: "Stable", icon: Cpu },
                           { label: "Security", val: "Encrypted", icon: ShieldCheck },
                        ].map((stat, i) => (
                           <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + (i * 0.1) }}
                              className="flex items-center justify-between p-4 bg-white/5 rounded-sm rounded-br-xl border border-white/5"
                           >
                              <div className="flex items-center gap-3">
                                 <stat.icon size={12} className="text-zinc-600" />
                                 <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{stat.label}</span>
                              </div>
                              <span className="text-[9px] font-black uppercase tracking-widest text-white">{stat.val}</span>
                           </motion.div>
                        ))}
                     </div>
                  </div>
                  
                  <div className="mt-auto p-6 border-l border-white/10">
                     <p className="text-[11px] font-bold leading-relaxed text-zinc-500 uppercase tracking-widest">
                        Navigation is restricted to <br/> verified sectors. Select a <br/> destination to jump.
                     </p>
                  </div>
               </div>

               {/* Right: Premium Menu Links */}
               <nav className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {menuItems.map((item, i) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (i * 0.05), type: "spring", damping: 20 }}
                      >
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={`
                            relative group flex items-center justify-between p-8 rounded-sm rounded-br-[3rem] border transition-all duration-700 overflow-hidden
                            ${isActive 
                              ? "bg-white text-black border-white shadow-[0_20px_80px_rgba(255,255,255,0.15)]" 
                              : "bg-white/5 text-white border-white/5 hover:bg-white/10 hover:border-white/20"
                            }
                          `}
                        >
                          {/* Background Scanning Effect (Hover Only) */}
                          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full" />

                          <div className="flex items-center gap-8 relative z-10">
                            <span className={`text-[11px] font-black tracking-tighter ${isActive ? "opacity-30" : "opacity-15 group-hover:opacity-40"} transition-opacity`}>
                               {item.id}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-3xl font-black tracking-tighter uppercase leading-none mb-1 group-hover:translate-x-2 transition-transform duration-500">
                                 {item.name}
                              </span>
                              <span className={`text-[9px] font-bold tracking-[0.3em] uppercase ${isActive ? "opacity-60" : "opacity-30 group-hover:opacity-100"} transition-all`}>
                                {item.sub}
                              </span>
                            </div>
                          </div>

                          <div className={`relative z-10 transition-all duration-700 ${isActive ? "opacity-100" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}`}>
                            <ArrowRight size={24} strokeWidth={3} />
                          </div>

                          {/* Active Corner Accent */}
                          {isActive && (
                            <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-black rounded-full" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
               </nav>
            </div>

            {/* Bottom Footer */}
            <footer className="mt-auto pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-8">
               <div className="flex items-center gap-12">
                  {[
                     { Icon: Linkedin, label: "LinkedIn" },
                     { Icon: Instagram, label: "Instagram" },
                     { Icon: Github, label: "GitHub" }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ scale: 1.1, color: "#fff" }}
                      className="flex items-center gap-3 text-zinc-500 transition-colors group"
                    >
                      <social.Icon size={16} />
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">{social.label}</span>
                    </motion.a>
                  ))}
               </div>
               
               <div className="flex flex-col items-end gap-1 opacity-40">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white">HarKreadly System</span>
                  <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                    2026 // Distributed Protocol // Cinematic Build 3.1.2
                  </span>
               </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;
