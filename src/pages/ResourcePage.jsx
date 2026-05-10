import { useState, useMemo } from 'react';
import FilterSidebar from '../components/filters/FilterSidebar';
import ResourceCard from '../components/common/ResourceCard';
import { FiSearch, FiSliders } from 'react-icons/fi';

const ResourcePage = ({ title, description, filterConfig, resources }) => {
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleFilterChange = (categoryId, value) => {
    setActiveFilters(prev => {
      const current = prev[categoryId] || [];
      if (current.includes(value)) {
        return { ...prev, [categoryId]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [categoryId]: [...current, value] };
      }
    });
  };

  const handleResetFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
  };

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      for (const category in activeFilters) {
        if (activeFilters[category].length > 0) {
          const resourceValue = resource[category];
          if (Array.isArray(resourceValue)) {
            const hasMatch = activeFilters[category].some(v => resourceValue.includes(v));
            if (!hasMatch) return false;
          } else {
            if (!activeFilters[category].includes(resourceValue)) return false;
          }
        }
      }
      return true;
    });
  }, [resources, activeFilters, searchQuery]);

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      {/* Header section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filters Toggle */}
        <button 
          className="lg:hidden flex items-center justify-center gap-2 w-full py-3 bg-card rounded-xl font-bold uppercase tracking-wider text-sm text-foreground border border-border shadow-sm"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <FiSliders size={18} /> Filters
        </button>

        {/* Sidebar */}
        <div className={`lg:w-1/4 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar 
            config={filterConfig}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Results */}
        <div className="lg:w-3/4">
          
          {/* Top Bar: Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            <div className="relative w-full md:w-[400px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch size={18} className="text-muted-foreground" />
              </div>
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-colors outline-none shadow-sm font-medium"
              />
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground font-bold tracking-widest uppercase text-[10px]">Sort by:</span>
              <select className="bg-transparent border-none text-foreground font-bold focus:ring-0 cursor-pointer outline-none">
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-6 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
            Showing <span className="text-foreground">{filteredResources.length}</span> resources
          </div>

          {/* Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card border border-border rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-foreground tracking-tight mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
              <button 
                onClick={handleResetFilters}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity font-bold uppercase tracking-wider text-xs shadow-md"
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
