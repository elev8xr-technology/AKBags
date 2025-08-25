import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Grid3X3 } from 'lucide-react';
import HeroImage from '../../LL.png';
import { apiService } from '../services/api';
import { Collection, Album } from '../types';

const Home: React.FC = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
  const [featuredAlbums, setFeaturedAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCollections, setTotalCollections] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
                // Fetch featured content
        const collectionsResult = await apiService.getCollections(1, 3);
        if (collectionsResult) {
          setCollections(collectionsResult.data as Collection[]);
        }

        const albumsResult = await apiService.getAllAlbums(1, 3);
        if (albumsResult && albumsResult.data) {
          setFeaturedAlbums(albumsResult.data as Album[]);
        }

        // Fetch total counts in parallel
        const [collectionsTotalResult, albumsTotalResult, imagesTotalResult] = await Promise.all([
          apiService.getCollections(1, 1),
          apiService.getAllAlbums(1, 1),
          apiService.getAllImages(1, 1)
        ]);

        if (collectionsTotalResult && collectionsTotalResult.meta) {
          setTotalCollections(collectionsTotalResult.meta.total);
        }

        if (albumsTotalResult && albumsTotalResult.meta) {
          setTotalAlbums(albumsTotalResult.meta.total);
        }

        if (imagesTotalResult && imagesTotalResult.meta) {
          setTotalImages(imagesTotalResult.meta.total);
        }
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
    <div className="min-h-screen bg-cream-50 animate-fade-in pt-20">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center text-white h-[60vh] md:h-[80vh] min-h-[400px] max-h-[700px]"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col items-center justify-end h-full pb-20 sm:pb-24 md:pb-32">
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/collections"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-full hover:bg-gold-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                Explore Collections
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      {featuredCollections.length > 0 && (
        <section className="bg-cream-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
                Featured Collections
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover our most celebrated collections, each telling a unique story of craftsmanship and design.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
              {featuredCollections.map((collection) => (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.id}`}
                  className="group block bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-200/80"
                >
                  <div className="overflow-hidden aspect-video">
                    <img
                      src={collection.coverImage}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-end">
                      <span className="text-base font-semibold text-gold-600 group-hover:text-gold-700 flex items-center">
                        View Collection <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/collections"
                className="inline-flex items-center px-8 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 group text-lg"
              >
                <Grid3X3 size={20} className="mr-3" />
                View All Collections
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Albums Section */}
      {featuredAlbums.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
                Featured Albums
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our curated selection of albums showcasing the finest leather craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
              {featuredAlbums.map((album) => (
                <Link
                  key={`${album.collectionId}-${album.id}`}
                  to={`/collections/${album.collectionId}/albums/${album.id}`}
                  className="group block bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-200/80"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={album.coverImage}
                      alt={album.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gold-700 font-semibold mb-1">
                      {album.collectionName}
                    </p>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-gold-600 transition-colors">
                      {album.name}
                    </h3>
                    <div className="flex items-center justify-end">
                       <span className="text-base font-semibold text-gold-600 group-hover:text-gold-700 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Album <ArrowRight size={16} className="ml-2" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/albums"
                className="inline-flex items-center px-8 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 group text-lg"
              >
                <Eye size={20} className="mr-3" />
                Browse All Albums
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="bg-cream-50 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gold-200/80 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-md">
                 <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                Premium Materials
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                Only the finest leather and hardware, selected for durability and beauty.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gold-200/80 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-md">
                <span className="text-3xl">🛠️</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                Expert Craftsmanship
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                Handcrafted by skilled artisans with decades of experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gold-200/80 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-md">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                Timeless Design
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                Classic styles that transcend trends and improve with age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream-50 rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-200/80">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 text-center sm:divide-x divide-gray-300/70">
              <div className="px-4">
                <p className="text-4xl sm:text-5xl font-serif font-bold text-gold-600 mb-2">
                  {totalCollections}
                </p>
                <p className="text-lg text-gray-700 font-semibold">Collections</p>
              </div>
              <div className="px-4">
                <p className="text-4xl sm:text-5xl font-serif font-bold text-gold-600 mb-2">
                  {totalAlbums}
                </p>
                <p className="text-lg text-gray-700 font-semibold">Albums</p>
              </div>
              <div className="px-4">
                <p className="text-4xl sm:text-5xl font-serif font-bold text-gold-600 mb-2">
                  {totalImages}
                </p>
                <p className="text-lg text-gray-700 font-semibold">Images</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Discover Your Perfect Companion
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Browse our carefully curated collections and find the bag that will accompany you through life's journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collections"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 text-lg font-bold rounded-full hover:bg-gold-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              View Collections
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={22} />
            </Link>
            <Link
              to="/albums"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-400 text-white text-lg font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 group"
            >
              Browse Albums
              <Eye className="ml-3" size={22} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
