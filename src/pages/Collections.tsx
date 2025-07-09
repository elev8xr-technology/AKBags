import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '../data/mockData';

const Collections: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Our Collections
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections, each crafted with meticulous attention to detail and timeless appeal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.id}`}
              className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={collection.coverImage}
                  alt={collection.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {collection.name}
                </h3>
                {collection.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {collection.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {collection.albums.length} {collection.albums.length === 1 ? 'Album' : 'Albums'}
                  </span>
                  <span className="text-sm font-medium text-yellow-600 group-hover:text-yellow-700">
                    View Collection →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;