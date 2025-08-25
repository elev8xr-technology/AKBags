import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Album, PaginationMeta } from '../types';
import Pagination from '../components/Pagination';

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const result = await apiService.getAllAlbums(currentPage, 8);
        if (result && result.data) {
          setAlbums(result.data as Album[]);
          setPaginationMeta(result.meta);
        } else {
          setError('Failed to load albums');
        }
      } catch (err) {
        setError('Failed to load albums');
        console.error('Error loading albums:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading albums...</p>
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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            All Albums
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our complete collection of albums showcasing the finest leather craftsmanship
          </p>
        </div>

        {albums.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No albums available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {albums.map((album) => (
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
                      {album.collectionName || 'Unknown Collection'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {album.images.length} {album.images.length === 1 ? 'Image' : 'Images'}
                      </span>
                      <span className="text-sm font-medium text-yellow-600 group-hover:text-yellow-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Album →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {paginationMeta && paginationMeta.last_page > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={paginationMeta.last_page}
                onPageChange={handlePageChange}
              />
            )}

            {/* Stats Section */}
            {paginationMeta && paginationMeta.total > 0 && (
              <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-serif font-bold text-gray-900 mb-2">
                      {new Set(albums.map(album => album.collectionId)).size}
                    </div>
                    <div className="text-gray-600">Collections on this page</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif font-bold text-gray-900 mb-2">
                      {paginationMeta.total}
                    </div>
                    <div className="text-gray-600">Total Albums</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif font-bold text-gray-900 mb-2">
                      {albums.reduce((total, album) => total + album.images.length, 0)}
                    </div>
                    <div className="text-gray-600">Images on this page</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Albums;