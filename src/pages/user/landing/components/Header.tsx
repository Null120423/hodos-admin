import React from 'react';
import { Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-sky-500 mr-2" />
            <span className="text-xl font-bold text-gray-900">HCM Travel AI</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-sky-500 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-sky-500 transition-colors">How It Works</a>
            <a href="#demo" className="text-gray-700 hover:text-sky-500 transition-colors">Demo</a>
            <a href="#contact" className="text-gray-700 hover:text-sky-500 transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
              Get the App
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-sky-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-sky-500">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-sky-500">How It Works</a>
              <a href="#demo" className="block px-3 py-2 text-gray-700 hover:text-sky-500">Demo</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-sky-500">Contact</a>
              <button className="w-full bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors mt-2">
                Get the App
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;