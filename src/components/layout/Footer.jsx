import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-zinc-900 font-bold text-lg">W</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">warmedia</span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              Empowering educators with premium, metadata-driven lesson plans, warm-ups, and assessments for a modern classroom.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/lesson-plans" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Lesson Plans</Link></li>
              <li><Link to="/warm-ups" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Warm-Ups</Link></li>
              <li><Link to="/exercises" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Exercises</Link></li>
              <li><Link to="/assessments" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Assessments</Link></li>
              <li><Link to="/textbooks" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Textbooks</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Warmedia. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {/* Social icons can go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
