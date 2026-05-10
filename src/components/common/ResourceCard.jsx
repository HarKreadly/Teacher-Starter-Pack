import { FiDownload, FiEye, FiHeart, FiClock, FiTag } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ResourceCard = ({ resource, index = 0 }) => {
  // Use even/odd index to position ribbon left or right like in Portfolio_2 CSS
  const ribbonClass = index % 2 === 0 ? 'card-ribbon--left' : 'card-ribbon--right';

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative bg-card border border-border rounded-xl overflow-visible shadow-sm hover:shadow-2xl transition-shadow duration-300 group flex flex-col h-full timeline-item"
    >
      
      {/* Portfolio_2 Style Card Ribbon */}
      <div className={`card-ribbon ${ribbonClass}`}>
        <span>{resource.level || 'Featured'}</span>
      </div>

      {/* Thumbnail/Top Area */}
      <div className="relative aspect-video bg-muted rounded-t-xl overflow-hidden flex items-center justify-center">
        {/* Placeholder for actual thumbnail */}
        <div className="text-muted-foreground font-medium text-sm tracking-widest uppercase">
          {resource.format || 'PDF'}
        </div>
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-foreground border border-border z-10">
          {resource.type?.replace('-', ' ')}
        </div>

        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
          <motion.button 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="bg-background text-foreground p-3 rounded-full shadow-lg" 
            title="Preview"
          >
            <FiEye size={18} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="bg-background text-foreground p-3 rounded-full shadow-lg" 
            title="Download"
          >
            <FiDownload size={18} />
          </motion.button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            {resource.duration || 'N/A'} MIN
          </span>
          <motion.button 
            whileHover={{ scale: 1.2 }}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <FiHeart size={16} />
          </motion.button>
        </div>
        
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
          {resource.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow leading-relaxed">
          {resource.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags?.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md">
              <FiTag size={10} /> {tag}
            </span>
          ))}
          {resource.tags?.length > 3 && (
            <span className="text-[10px] text-muted-foreground font-bold flex items-center">+{resource.tags.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5 text-xs font-medium">
            <FiClock size={14} /> Created
          </span>
          <span className="text-xs font-medium truncate max-w-[120px]">
            By {resource.author}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
