import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center py-24">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-gray-900 mb-6">
            AKBag
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting exceptional leather goods with timeless elegance and uncompromising quality
          </p>
          <Link
            to="/collections"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-colors group"
          >
            Explore Collections
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                Premium Materials
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Only the finest leather and hardware, selected for durability and beauty
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                Expert Craftsmanship
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Handcrafted by skilled artisans with decades of experience
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                Timeless Design
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Classic styles that transcend trends and improve with age
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-6">
            Discover Your Perfect Companion
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our carefully curated collections and find the bag that will accompany you through life's journey
          </p>
          <Link
            to="/collections"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 text-lg font-medium rounded-full hover:bg-gray-100 transition-colors group"
          >
            View Collections
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;