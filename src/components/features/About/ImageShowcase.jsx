import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

/**
 * ImageShowcase - A cinematic full-screen modal for viewing timeline images
 * @param {Object} image - The currently selected image data { src, title, year, category }
 * @param {Function} onClose - Handler to close the modal
 * @param {Function} onNext - Handler for next image
 * @param {Function} onPrev - Handler for previous image
 */
const ImageShowcase = ({ image, direction, onClose, onNext, onPrev }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial Appearance (Backdrop)
    if (!gsap.isTweening(bgRef.current)) {
      tl.fromTo(
        bgRef.current,
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(40px)", duration: 1 }
      );
    }
    
    // Directional Premium Transition
    const xMove = direction === "next" ? 40 : -40;

    tl.fromTo(
      imgRef.current,
      { 
        opacity: 0, 
        scale: 0.95, 
        x: xMove,
        filter: "blur(10px)"
      },
      { 
        opacity: 1, 
        scale: 1, 
        x: 0,
        filter: "blur(0px)",
        duration: 0.7, 
        ease: "power2.out" 
      },
      "-=0.6"
    )
    .fromTo(
      ".meta-content",
      { y: 15, opacity: 0, filter: "blur(5px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.05, duration: 0.5 },
      "-=0.4"
    );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [image, direction]); 


  if (!image) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-white/95 dark:bg-black/95 cursor-pointer transition-colors duration-500"
        onClick={onClose}
      />

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12 pointer-events-none"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="pointer-events-auto absolute top-6 right-6 md:top-8 md:right-8 z-50 text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full backdrop-blur-md group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Start Game Aesthetic Elements - Removed Title Card */}
        
        {/* decorative corners */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 w-8 h-8 border-t-2 border-l-2 border-gray-300 dark:border-white/20 pointer-events-none" />
        {/* Top Right removed for Close Button space */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 w-8 h-8 border-b-2 border-l-2 border-gray-300 dark:border-white/20 pointer-events-none" />
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-8 h-8 border-b-2 border-r-2 border-gray-300 dark:border-white/20 pointer-events-none" />

        {/* Image Container */}
        <div className="relative w-full h-[80vh] flex items-center justify-center pointer-events-auto group">
            
            {/* Nav Left */}
            <button 
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 p-4 text-gray-400 dark:text-white/20 hover:text-black dark:hover:text-white transition-all hover:scale-110 z-50 hidden md:block"
            >
                <ChevronLeft size={48} />
            </button>

            {/* Image */}
            <img 
                ref={imgRef}
                src={image.src} 
                alt={image.title}
                className="max-h-full max-w-full object-contain rounded-sm ring-1 ring-black/5 dark:ring-white/10"
            />

            {/* Nav Right */}
             <button 
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 p-4 text-gray-400 dark:text-white/20 hover:text-black dark:hover:text-white transition-all hover:scale-110 z-50 hidden md:block"
            >
                <ChevronRight size={48} />
            </button>

            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pt-24 bg-gradient-to-t from-white/90 via-white/40 dark:from-black/90 dark:via-black/40 to-transparent backdrop-blur-[2px] meta-content text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{image.title}</h2>
                <p className="text-gray-600 dark:text-white/60 max-w-xl mx-auto font-light text-sm md:text-base">{image.description}</p>
            </div>
        </div>

         {/* Mobile Nav */}
           <div className="flex justify-between w-full mt-4 px-4 pointer-events-auto md:hidden meta-content">
                <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="flex items-center gap-2 text-gray-600 dark:text-white/70 bg-white/50 dark:bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
                    <ChevronLeft size={20} /> Prev
                </button>
                <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="flex items-center gap-2 text-gray-600 dark:text-white/70 bg-white/50 dark:bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
                    Next <ChevronRight size={20} />
                </button>
           </div>
      </div>
    </div>
  );
};

export default ImageShowcase;
