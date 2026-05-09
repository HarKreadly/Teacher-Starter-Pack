import { Link } from 'react-router-dom';
import { FiArrowRight, FiSearch, FiBook, FiActivity, FiEdit, FiFileText } from 'react-icons/fi';

const features = [
  { name: 'Lesson Plans', icon: FiBook, path: '/lesson-plans', description: 'Comprehensive guides for your next class.' },
  { name: 'Warm-Ups', icon: FiActivity, path: '/warm-ups', description: 'Engaging activities to start the day right.' },
  { name: 'Exercises', icon: FiEdit, path: '/exercises', description: 'Practice materials for all levels.' },
  { name: 'Assessments', icon: FiFileText, path: '/assessments', description: 'Quizzes and tests to measure progress.' },
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-zinc-200/50 to-white dark:from-zinc-800/50 dark:to-zinc-900 rounded-full blur-3xl -z-10 opacity-70"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm font-medium mb-8 border border-zinc-200 dark:border-zinc-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            New features just released!
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-8">
            The Modern Toolset for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900 dark:from-zinc-400 dark:to-white">Exceptional Educators</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover thousands of metadata-driven lesson plans, warm-ups, and assessments tailored for every grade and skill level.
          </p>
          
          {/* Main Search Bar in Hero */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 flex items-center mb-12">
            <div className="pl-4 text-zinc-400">
              <FiSearch size={24} />
            </div>
            <input 
              type="text" 
              placeholder="Search for 'Present Simple' or '9th Grade'..." 
              className="flex-grow bg-transparent border-none focus:ring-0 text-zinc-900 dark:text-white px-4 py-3 placeholder-zinc-400 outline-none"
            />
            <button className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-8 py-3 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors">
              Search
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="font-medium">Popular:</span>
            <Link to="/exercises/grammar" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Grammar Exercises</Link>
            <span>&bull;</span>
            <Link to="/warm-ups/speaking" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Speaking Prompts</Link>
            <span>&bull;</span>
            <Link to="/lesson-plans/reading" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Reading Comprehension</Link>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-20 bg-zinc-100/50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Explore by Category</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Find exactly what you need with our structured resource collections.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link key={feature.name} to={feature.path} className="group bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-900 dark:text-white mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{feature.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm">{feature.description}</p>
                <div className="flex items-center text-zinc-900 dark:text-white font-medium text-sm group-hover:gap-2 transition-all">
                  Browse {feature.name} <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
