import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

const CVModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <div className="space-y-12">
              {/* Title */}
              <h3 className="text-sm uppercase tracking-[0.3em] text-center text-gray-500 font-sans">
                Download CV
              </h3>

              {/* Download Links */}
              <div className="flex flex-col gap-6 min-w-[400px]">
                <a
                  href="#"
                  className="group flex items-center gap-4 px-8 py-6 backdrop-blur-sm bg-gray-100/50 dark:bg-white/10 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/20 transition-all duration-300"
                >
                  <span className="font-sans uppercase text-xs font-bold tracking-widest text-gray-900 dark:text-white">
                    English Version
                  </span>
                  <Download
                    size={16}
                    className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors ml-auto"
                  />
                </a>
                <a
                  href="#"
                  className="group flex items-center gap-4 px-8 py-6 backdrop-blur-sm bg-gray-100/50 dark:bg-white/10 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/20 transition-all duration-300"
                >
                  <span className="font-sans uppercase text-xs font-bold tracking-widest text-gray-900 dark:text-white">
                    French Version
                  </span>
                  <Download
                    size={16}
                    className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors ml-auto"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVModal;
