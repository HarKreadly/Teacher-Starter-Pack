import { useEffect, useRef } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      gsap.fromTo(
        card,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group flex flex-col w-[350px] md:w-[500px] shrink-0 snap-center cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden mb-5 bg-zinc-200 dark:bg-zinc-800 shadow-sm transition-colors duration-700">
        <img
          src={
            project.image ||
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
          }
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Hover Description Overlay - Fading Progressive Blur */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden pointer-events-none">
          {/* Glass Panel with Slide-up Animation */}
          <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
            {/* Fading Blur Layer */}
            <div 
              className="absolute inset-0 backdrop-blur-md"
              style={{ maskImage: 'linear-gradient(to top, black, transparent)', WebkitMaskImage: 'linear-gradient(to top, black, transparent)' }}
            />
            
            {/* Gradient & Content Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent p-6 md:p-10 flex flex-col justify-end">
              <div className="translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-150 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <p className="text-zinc-100 text-sm md:text-base leading-relaxed mb-6 font-medium line-clamp-3">
                  {project.description}
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                    View Project
                  </span>
                  <ArrowUpRight size={20} className="text-white/40" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Meta Info */}
      <div className="flex flex-col pl-1">
        <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
          <span>{project.year || "2024"}</span>
          <span className="w-[1px] h-3 bg-zinc-300 dark:bg-zinc-800"></span>
          <span>{project.category || "WEB DEVELOPMENT"}</span>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight transition-colors">
          {project.title}
        </h3>
      </div>
    </div>
  );
};

export default ProjectCard;
