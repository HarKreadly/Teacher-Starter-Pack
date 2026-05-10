import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";

const GalleryModal = ({ gallery, onClose, onImageClick }) => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial Appearance
    tl.fromTo(
      bgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )
    .fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    )
    .fromTo(
      ".gallery-image",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, stagger: 0.05, duration: 0.4 },
      "-=0.3"
    );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (!gallery) return null;

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center p-4 md:p-12">
      {/* Backdrop */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl cursor-pointer"
        onClick={onClose}
      />

      {/* Main Container */}
      <div 
        ref={contentRef}
        className="relative w-full max-w-6xl h-full flex flex-col pointer-events-none"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pointer-events-auto">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{gallery.title}</h2>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                    {gallery.category} • {gallery.year}
                </span>
            </div>
            
            <button 
                onClick={onClose}
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
                <X size={24} />
            </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto pr-2 pointer-events-auto custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-12">
                {gallery.images.map((img, index) => (
                    <div 
                        key={index}
                        className="gallery-image relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10"
                        onClick={() => onImageClick(img, index)}
                    >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
                        <img 
                            src={img} 
                            alt={`Gallery item ${index}`}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                         {/* View Overlay */}
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <span className="bg-black/60 text-white text-xs uppercase font-bold px-3 py-1.5 rounded-full backdrop-blur-md">
                                Expand
                            </span>
                         </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
