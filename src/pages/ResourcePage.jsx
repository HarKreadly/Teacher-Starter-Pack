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

  // Basic filtering logic
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      // Search query filter
      if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category filters
      for (const category in activeFilters) {
        if (activeFilters[category].length > 0) {
          // If the resource doesn't match ANY of the selected values in this category, filter it out
          // This requires mapping your generic filter category to resource object properties
          // For now, we assume simple matching (e.g., resource[category] === value or value in resource.tags)
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
    <div className="container mx-auto px-6 py-12">
      {/* Header section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">{title}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">{description}</p>
      </div>

      {/* Main content grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filters Toggle */}
        <button 
          className="lg:hidden flex items-center justify-center gap-2 w-full py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-medium text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <FiSliders /> Filters
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
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-zinc-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Sort by:</span>
              <select className="bg-transparent border-none text-zinc-900 dark:text-white font-medium focus:ring-0 cursor-pointer">
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
            Showing <span className="font-semibold text-zinc-900 dark:text-white">{filteredResources.length}</span> resources
          </div>

          {/* Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">No resources found</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Try adjusting your filters or search query.</p>
              <button 
                onClick={handleResetFilters}
                className="mt-6 px-6 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination Placeholder */}
          {filteredResources.length > 0 && (
             <div className="flex justify-center mt-12">
               <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50">Previous</button>
                  <button className="px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium">1</button>
                  <button className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">2</button>
                  <button className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">3</button>
                  <button className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Next</button>
               </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
