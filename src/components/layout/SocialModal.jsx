import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronDown, FiMail } from "react-icons/fi";
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";

const teamMembers = [
  {
    id: "m1",
    name: "Jane Doe",
    role: "Lead Educator",
    socials: [
      { name: "Instagram", icon: FaInstagram, url: "#" },
      { name: "YouTube", icon: FaYoutube, url: "#" },
      { name: "Email", icon: FiMail, url: "mailto:#" }
    ]
  },
  {
    id: "m2",
    name: "John Smith",
    role: "Technical Director",
    socials: [
      { name: "GitHub", icon: FaGithub, url: "#" },
      { name: "Facebook", icon: FaFacebook, url: "#" },
      { name: "LinkedIn", icon: FaLinkedin, url: "#" }
    ]
  }
];

const SocialModal = ({ isOpen, onClose }) => {
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Optional: reset expanded state when closing
      setTimeout(() => setExpandedId(null), 500);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sliceVariants = {
    closed: {
      clipPath: "circle(0% at 75% 0%)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.2,
      },
    },
    open: (i) => ({
      clipPath: "circle(150% at 75% 0%)",
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 2,
        delay: i * 0.08,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Pie Slices Background */}
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={`social-slice-${i}`}
              custom={i}
              variants={sliceVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`absolute inset-0 pointer-events-none ${
                i === 0
                  ? "bg-zinc-800"
                  : i === 1
                  ? "bg-zinc-950"
                  : "bg-zinc-900"
              } ${i === 0 ? "z-[101]" : i === 1 ? "z-[102]" : "z-[103]"}`}
            />
          ))}

          {/* Content Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-[110] w-full h-full flex flex-col items-center justify-center p-6 font-sans text-white"
          >
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-2 m-8 hover:cursor-pointer bg-white rounded-full text-black hover:text-primary transition-colors z-[120] group"
            >
              <FiX
                size={22}
                className="group-hover:rotate-90 transition-transform duration-500"
              />
            </button>

            {/* List */}
            <div className="flex flex-col gap-6 w-full max-w-lg">
              <span className="m-auto mb-2 text-white/50 uppercase tracking-[0.2em] font-bold text-xs">
                Our Socials
              </span>
              
              {teamMembers.map((member, i) => {
                const isExpanded = expandedId === member.id;

                return (
                  <motion.div
                    key={member.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                      x: -20,
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                    transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                    className={`
                      relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-500
                      ${
                        isExpanded
                          ? "bg-white/10 border-white/30 shadow-2xl"
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                      }
                    `}
                  >
                    {/* Header */}
                    <div 
                      className="flex items-center justify-between p-6 cursor-pointer select-none"
                      onClick={() => toggleExpand(member.id)}
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black opacity-30 tracking-tighter">
                          0{i + 1}
                        </span>
                        <div className="flex flex-col items-start">
                          <span className="text-2xl sm:text-3xl font-bold tracking-tighter uppercase">
                            {member.name}
                          </span>
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 text-zinc-300">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-2 rounded-full transition-colors ${isExpanded ? "bg-white text-black" : "bg-white/10 text-white"}`}
                      >
                        <FiChevronDown size={20} />
                      </motion.div>
                    </div>

                    {/* Expandable Socials List */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-white/10"
                        >
                          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {member.socials.map((social) => {
                              const Icon = social.icon;
                              return (
                                <a
                                  key={social.name}
                                  href={social.url}
                                  className="flex items-center gap-4 p-4 rounded-xl bg-black/30 hover:bg-white hover:text-black transition-colors group"
                                >
                                  <Icon size={20} className="opacity-70 group-hover:opacity-100" />
                                  <span className="font-semibold text-sm uppercase tracking-widest opacity-70 group-hover:opacity-100">
                                    {social.name}
                                  </span>
                                </a>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Mini Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 flex flex-col items-center gap-2"
            >
              <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-zinc-500">
                Connect & Collaborate
              </span>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SocialModal;
