import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Grid3X3 } from 'lucide-react';
import { apiService } from '../services/api';
import { Collection } from '../types';

const Home: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const data = await apiService.getCollections();
        setCollections(data);
      } catch (err) {
        setError('Failed to load collections');
        console.error('Error loading collections:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // Get featured collections (first 3)
  const featuredCollections = collections.slice(0, 3);
  
  // Get featured albums from all collections
  const featuredAlbums = collections.flatMap(collection => 
    collection.albums.slice(0, 2).map(album => ({
      ...album,
      collectionName: collection.name
    }))
  ).slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading collections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

      {/* Featured Collections Section */}
      {featuredCollections.length > 0 && (
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                Featured Collections
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our most celebrated collections, each telling a unique story of craftsmanship and design
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {featuredCollections.map((collection) => (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.id}`}
                  className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <img
                      src={collection.coverImage}
                      alt={collection.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {collection.albums.length} {collection.albums.length === 1 ? 'Album' : 'Albums'}
                      </span>
                      <span className="text-sm font-medium text-yellow-600 group-hover:text-yellow-700 flex items-center">
                        View <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/collections"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-full hover:bg-gray-900 hover:text-white transition-colors group"
              >
                <Grid3X3 size={20} className="mr-2" />
                View All Collections
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Featured Albums Section */}
      {featuredAlbums.length > 0 && (
        <div className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                Featured Albums
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our curated selection of albums showcasing the finest leather craftsmanship
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredAlbums.map((album) => (
                <Link
                  key={`${album.collectionId}-${album.id}`}
                  to={`/collections/${album.collectionId}/albums/${album.id}`}
                  className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={album.coverImage}
                      alt={album.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {album.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {album.collectionName}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {album.images.length} {album.images.length === 1 ? 'Image' : 'Images'}
                      </span>
                      <span className="text-sm font-medium text-yellow-600 group-hover:text-yellow-700 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        View Album <ArrowRight size={14} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/albums"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-full hover:bg-gray-900 hover:text-white transition-colors group"
              >
                <Eye size={20} className="mr-2" />
                Browse All Albums
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

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

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  {collections.length}
                </div>
                <div className="text-gray-600">Collections</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  {collections.reduce((total, collection) => total + collection.albums.length, 0)}
                </div>
                <div className="text-gray-600">Albums</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  {collections.reduce((total, collection) => 
                    total + collection.albums.reduce((albumTotal, album) => albumTotal + album.images.length, 0), 0
                  )}
                </div>
                <div className="text-gray-600">Images</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  15+
                </div>
                <div className="text-gray-600">Years Experience</div>
              </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collections"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 text-lg font-medium rounded-full hover:bg-gray-100 transition-colors group"
            >
              View Collections
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              to="/albums"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white text-lg font-medium rounded-full hover:bg-white hover:text-gray-900 transition-colors group"
            >
              Browse Albums
              <Eye className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;