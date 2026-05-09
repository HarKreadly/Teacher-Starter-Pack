import { Link } from 'react-router-dom';

const MegaMenu = ({ category, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-xl z-40 transition-all duration-300">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
              Explore {category}
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={`/${category.toLowerCase()}/new`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Newly Added</Link></li>
              <li><Link to={`/${category.toLowerCase()}/popular`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Most Popular</Link></li>
              <li><Link to={`/${category.toLowerCase()}/trending`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Trending Now</Link></li>
              <li><Link to={`/${category.toLowerCase()}/free`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Free Resources</Link></li>
            </ul>
          </div>

          {/* By Level */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
              By Level
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={`/${category.toLowerCase()}/level/middle`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Middle School (7th-9th)</Link></li>
              <li><Link to={`/${category.toLowerCase()}/level/high`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">High School (Core-2nd Bac)</Link></li>
              <li><Link to={`/${category.toLowerCase()}/level/beginner`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Beginner</Link></li>
              <li><Link to={`/${category.toLowerCase()}/level/advanced`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Advanced</Link></li>
            </ul>
          </div>

          {/* By Topic */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
              By Topic
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={`/${category.toLowerCase()}/topic/grammar`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Grammar</Link></li>
              <li><Link to={`/${category.toLowerCase()}/topic/vocabulary`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Vocabulary</Link></li>
              <li><Link to={`/${category.toLowerCase()}/topic/reading`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Reading</Link></li>
              <li><Link to={`/${category.toLowerCase()}/topic/speaking`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Speaking</Link></li>
            </ul>
          </div>

          {/* Featured/Promo Area */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Featured {category}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2">
              Check out our highly-rated comprehensive pack for this month to save prep time.
            </p>
            <Link to={`/${category.toLowerCase()}/featured`} className="text-xs font-medium text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors inline-block">
              View Featured
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
