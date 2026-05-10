import { Link } from 'react-router-dom';

const MegaMenu = ({ category, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-background border-b border-border shadow-xl z-40 transition-all duration-300">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Explore {category}
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={`/${category.toLowerCase()}/new`} className="text-muted-foreground hover:text-foreground transition-colors">Newly Added</Link></li>
              <li><Link to={`/${category.toLowerCase()}/popular`} className="text-muted-foreground hover:text-foreground transition-colors">Most Popular</Link></li>
              <li><Link to={`/${category.toLowerCase()}/trending`} className="text-muted-foreground hover:text-foreground transition-colors">Trending Now</Link></li>
              <li><Link to={`/${category.toLowerCase()}/free`} className="text-muted-foreground hover:text-foreground transition-colors">Free Resources</Link></li>
            </ul>
          </div>

          {/* By Level */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              By Level
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={`/${category.toLowerCase()}/level/middle`} className="text-muted-foreground hover:text-foreground transition-colors">Middle School (7th-9th)</Link></li>
              <li><Link to={`/${category.toLowerCase()}/level/high`} className="text-muted-foreground hover:text-foreground transition-colors">High School (Core-2nd Bac)</Link></li>
              <li><Link to={`/${category.toLowerCase()}/level/beginner`} className="text-muted-foreground hover:text-foreground transition-colors">Beginner</Link></li>
              <li><Link to={`/${category.toLowerCase()}/level/advanced`} className="text-muted-foreground hover:text-foreground transition-colors">Advanced</Link></li>
            </ul>
          </div>

          {/* By Topic */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              By Topic
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={`/${category.toLowerCase()}/topic/grammar`} className="text-muted-foreground hover:text-foreground transition-colors">Grammar</Link></li>
              <li><Link to={`/${category.toLowerCase()}/topic/vocabulary`} className="text-muted-foreground hover:text-foreground transition-colors">Vocabulary</Link></li>
              <li><Link to={`/${category.toLowerCase()}/topic/reading`} className="text-muted-foreground hover:text-foreground transition-colors">Reading</Link></li>
              <li><Link to={`/${category.toLowerCase()}/topic/speaking`} className="text-muted-foreground hover:text-foreground transition-colors">Speaking</Link></li>
            </ul>
          </div>

          {/* Featured/Promo Area */}
          <div className="bg-muted p-6 rounded-xl border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Featured {category}
            </h3>
            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
              Check out our highly-rated comprehensive pack for this month to save prep time.
            </p>
            <Link to={`/${category.toLowerCase()}/featured`} className="text-xs font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity inline-block">
              View Featured
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
