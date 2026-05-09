import { useState } from 'react';
import { FiChevronDown, FiFilter, FiX } from 'react-icons/fi';

const FilterSection = ({ title, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 py-4 last:border-0">
      <button 
        className="flex items-center justify-between w-full text-left font-semibold text-sm text-zinc-900 dark:text-white mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer appearance-none w-4 h-4 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-900 checked:bg-zinc-900 dark:checked:bg-white checked:border-zinc-900 dark:checked:border-white transition-colors cursor-pointer"
                  checked={selected.includes(option.value)}
                  onChange={() => onChange(option.value)}
                />
                <svg className="absolute w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 text-white dark:text-zinc-900" viewBox="0 0 14 14" fill="none">
                  <path d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"></path>
                </svg>
              </div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterSidebar = ({ config, activeFilters, onFilterChange, onReset }) => {
  return (
    <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sticky top-24 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-white">
          <FiFilter />
          Filters
        </h2>
        <button 
          onClick={onReset}
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-1">
        {config.map((section) => (
          <FilterSection 
            key={section.id}
            title={section.title}
            options={section.options}
            selected={activeFilters[section.id] || []}
            onChange={(value) => onFilterChange(section.id, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
