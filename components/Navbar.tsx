import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Analyze', path: '/upload' },
    { name: 'Results', path: '/results' },
    { name: 'Rewriter', path: '/rewrite' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-lg border-b border-brand-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-brand-blue/10 rounded-lg group-hover:bg-brand-blue/20 transition-colors">
              <Cpu className="w-6 h-6 text-brand-blue" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Nex<span className="text-brand-blue">Resume</span></span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-brand-blue bg-brand-blue/10'
                        : 'text-gray-300 hover:text-white hover:bg-brand-soft'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-brand-soft p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark border-b border-brand-soft"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-brand-soft"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;