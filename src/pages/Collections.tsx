import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Collection, PaginationMeta } from '../types';
import Pagination from '../components/Pagination';

const Collections: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const result = await apiService.getCollections(currentPage);
        if (result && result.data) {
          setCollections(result.data as Collection[]);
          setPaginationMeta(result.meta);
        } else {
          setError('Failed to load collections');
        }
      } catch (err) {
        setError('Failed to load collections');
        console.error('Error loading collections:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading collections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => setCurrentPage(1)} 
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight mb-6">
            Our Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collections, each crafted with meticulous attention to detail and timeless appeal.
          </p>
        </div>

        {collections.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-700 text-xl">No collections available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.id}`}
                  className="group block bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-gold-300"
                >
                  <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                    <img
                      src={collection.coverImage}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-gold-600 transition-colors">
                      {collection.name}
                    </h3>
                    {collection.description && (
                      <p className="text-gray-600 text-base leading-relaxed mb-5 h-20 overflow-hidden text-ellipsis">
                        {collection.description}
                      </p>
                    )}
                    <div className="flex items-center justify-end">
                      <span className="text-base font-semibold text-gold-600 group-hover:text-gold-700 flex items-center">
                        View Collection
                        <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {paginationMeta && paginationMeta.last_page > 1 && (
              <div className="mt-16 md:mt-20 mb-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={paginationMeta.last_page}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Collections;