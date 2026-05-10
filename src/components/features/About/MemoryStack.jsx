import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Grid, Maximize2 } from "lucide-react";

const MemoryStack = ({ images, onImageClick, onViewGallery }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Safety check
  if (!images || images.length === 0) return null;

  // Limit preview to 3 images for a cleaner look
  const previewImages = images.slice(0, 3);

  return (
    <div ref={ref} className="flex flex-col items-center w-full">
      {/* Static Image List (No Toggle) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="overflow-hidden w-full flex flex-col items-center"
      >
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {previewImages.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden cursor-pointer group/image shadow-sm hover:shadow-lg transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                if (onImageClick) onImageClick(img, index);
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 z-10" />
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover transform transition-transform duration-500"
              />
              
              {/* View Full Overlay on Hover */}
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20">
                <Maximize2 size={16} className="text-white drop-shadow-md" />
             </div>
            </motion.div>
          ))}
        </div>
        
         {/* View Album Button */}
         <button 
            onClick={(e) => {
                e.stopPropagation();
                if (onViewGallery) onViewGallery();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 group/btn"
         >
            <Grid size={14} className="group-hover/btn:scale-110 transition-transform" />
            <span>View Album</span>
         </button>
      </motion.div>
    </div>
  );
};

export default MemoryStack;
