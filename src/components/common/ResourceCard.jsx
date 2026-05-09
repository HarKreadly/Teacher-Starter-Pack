import { FiDownload, FiEye, FiHeart, FiClock, FiTag } from 'react-icons/fi';

const ResourceCard = ({ resource }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      {/* Thumbnail/Top Area */}
      <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex items-center justify-center">
        {/* Placeholder for actual thumbnail */}
        <div className="text-zinc-400 dark:text-zinc-600 font-medium">
          {resource.format?.toUpperCase() || 'PDF'}
        </div>
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">
          {resource.type?.replace('-', ' ')}
        </div>

        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button className="bg-white text-zinc-900 p-3 rounded-full hover:scale-110 transition-transform shadow-lg" title="Preview">
            <FiEye size={20} />
          </button>
          <button className="bg-white text-zinc-900 p-3 rounded-full hover:scale-110 transition-transform shadow-lg" title="Download">
            <FiDownload size={20} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {resource.level}
          </span>
          <button className="text-zinc-400 hover:text-red-500 transition-colors">
            <FiHeart size={18} />
          </button>
        </div>
        
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 line-clamp-2">
          {resource.title}
        </h3>
        
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 flex-grow">
          {resource.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags?.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs px-2 py-1 rounded-md">
              <FiTag size={10} /> {tag}
            </span>
          ))}
          {resource.tags?.length > 3 && (
            <span className="text-xs text-zinc-500 flex items-center">+{resource.tags.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <FiClock size={14} /> {resource.duration || 'N/A'}
          </span>
          <span className="text-xs font-medium truncate max-w-[120px]">
            By {resource.author}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
