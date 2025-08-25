import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import AkLogo from '../../AKlogo.png';

interface HeaderProps {
  onSearchToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchToggle }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/collections', label: 'Collections' },
    { path: '/albums', label: 'Albums' },
  ];

  return (
    <header className={`fixed top-0 w-full border-b border-black/10 z-50 transition-all duration-300 ${mobileMenuOpen ? 'bg-cream-50' : 'bg-cream-50/80 backdrop-blur-lg'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img src={AkLogo} alt="AKBag Logo" className="h-14" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-base font-medium transition-colors hover:text-gold-600 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-gold-500 after:transition-transform after:duration-300 after:ease-in-out after:transform ${
                  location.pathname === item.path 
                    ? 'text-gold-600 after:scale-x-100'
                    : 'text-gray-700 after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search and Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onSearchToggle}
              className="p-2 text-gray-800 hover:text-gold-600 rounded-full hover:bg-gold-100/50 transition-colors"
              aria-label="Search"
            >
              <Search size={22} />
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-800 hover:text-gold-600 rounded-full hover:bg-gold-100/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-cream-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 pt-20">
          <nav className="flex flex-col space-y-6">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xl font-medium transition-colors hover:text-gold-600 ${
                  location.pathname === item.path ? 'text-gold-600' : 'text-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;