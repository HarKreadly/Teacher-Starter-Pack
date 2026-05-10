import { Link } from 'react-router-dom';
import { FiArrowRight, FiSearch, FiBook, FiActivity, FiEdit, FiFileText } from 'react-icons/fi';
import SplitText from '../components/common/SplitText';
import { motion } from 'framer-motion';

const features = [
  { name: 'Lesson Plans', icon: FiBook, path: '/lesson-plans', description: 'Comprehensive guides for your next class.' },
  { name: 'Warm-Ups', icon: FiActivity, path: '/warm-ups', description: 'Engaging activities to start the day right.' },
  { name: 'Exercises', icon: FiEdit, path: '/exercises', description: 'Practice materials for all levels.' },
  { name: 'Assessments', icon: FiFileText, path: '/assessments', description: 'Quizzes and tests to measure progress.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const Home = () => {
  return (
    <div className="relative w-full min-h-screen bg-background text-foreground overflow-hidden font-sans transition-colors duration-1000">
      
      {/* Cinematic Layer 1: Abstract Gradient Blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-muted to-background dark:from-zinc-900/50 dark:to-background rounded-full blur-3xl" style={{ willChange: "transform, opacity" }}></div>
      </motion.div>

      {/* Layer 3: Vignette Effect */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,1)_100%)] pointer-events-none transition-all duration-500"></div>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grid grid-cols-1 min-h-screen pt-32 pb-10 px-4 md:px-8 lg:px-16 items-center"
      >
        
        <div className="text-center max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-8 border border-border shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            New cinematic features released!
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-8">
            <SplitText 
              text="The Modern Toolset for" 
              tag="h1" 
              className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight block"
            />
            <SplitText 
              text="Exceptional Educators" 
              tag="span" 
              delay={300}
              className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground to-foreground tracking-tight block mt-2"
            />
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover thousands of metadata-driven lesson plans, warm-ups, and assessments. Now with a beautifully cinematic interface.
          </motion.p>
          
          {/* Main Search Bar in Hero */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto bg-card p-2 rounded-2xl shadow-xl border border-border flex items-center mb-12">
            <div className="pl-4 text-muted-foreground">
              <FiSearch size={24} />
            </div>
            <input 
              type="text" 
              placeholder="Search for 'Present Simple' or '9th Grade'..." 
              className="flex-grow bg-transparent border-none focus:ring-0 text-foreground px-4 py-3 placeholder-muted-foreground outline-none"
            />
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
              Search
            </button>
          </motion.div>
        </div>

      </motion.div>

      {/* Quick Categories */}
      <section className="relative z-10 py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Explore by Category</h2>
            <p className="text-muted-foreground">Find exactly what you need with our structured resource collections.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <Link to={feature.path} className="block group bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-foreground mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.name}</h3>
                  <p className="text-muted-foreground mb-6 text-sm">{feature.description}</p>
                  <div className="flex items-center text-foreground font-medium text-sm group-hover:gap-2 transition-all">
                    Browse {feature.name} <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
