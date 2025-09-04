import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Album, Collection, PaginationMeta } from '../types';
import Pagination from '../components/Pagination';

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch albums and all collections in parallel
        const [albumsResult, collectionsResult] = await Promise.all([
          apiService.getAllAlbums(currentPage, 8),
          apiService.getCollections(1, 100) // Fetch up to 100 collections
        ]);

        if (albumsResult && collectionsResult && albumsResult.data && collectionsResult.data) {
          const collectionsMap = new Map(
            (collectionsResult.data as Collection[]).map(c => [c.id, c.name])
          );

          const albumsWithCollectionNames = (albumsResult.data as Album[]).map(album => ({
            ...album,
            collectionName: collectionsMap.get(album.collectionId) || 'Unknown Collection'
          }));

          setAlbums(albumsWithCollectionNames);
          setPaginationMeta(albumsResult.meta);
        } else {
          setError('Failed to load data');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 flex flex-col items-center justify-center text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mb-4"></div>
        <p className="text-lg font-serif text-gray-700">Loading Albums...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif font-bold text-red-600 mb-4">{error}</h2>
        <p className="text-gray-600 mb-8">We couldn't load the albums. Please try again.</p>
        <button
          onClick={() => setCurrentPage(1)}
          className="inline-flex items-center px-6 py-3 bg-gold-600 text-white font-bold rounded-lg hover:bg-gold-700 transition-colors duration-300 shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight mb-6">
            All Albums
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse through our complete collection of albums, each showcasing the finest leather craftsmanship.
          </p>
        </div>

        {albums.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-700 text-xl">No albums available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
              {albums.map((album) => (
                <Link
                  key={`${album.collectionId}-${album.id}`}
                  to={`/collections/${album.collectionId}/albums/${album.id}`}
                  className="group block bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-gold-300"
                >
                  <div className="relative w-full h-48 sm:h-64 overflow-hidden">
                    <img
                      src={album.coverImage}
                      alt={album.name}
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>
                  <div className="p-3 sm:p-5">
                    <h3 className="text-base sm:text-xl font-serif font-bold text-gray-900 mb-1 sm:mb-2 truncate group-hover:text-gold-600 transition-colors">
                      {album.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 truncate">
                      {album.collectionName || 'Unknown Collection'}
                    </p>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-600 font-medium">
                        {album.images.length} {album.images.length === 1 ? 'Image' : 'Images'}
                      </span>
                      <span className="font-semibold text-gold-600 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View
                        <span className="ml-1.5 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {paginationMeta && paginationMeta.last_page > 1 && (
              <div className="mt-16 md:mt-20 mb-24">
                <Pagination
                  currentPage={currentPage}
                  totalPages={paginationMeta.last_page}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {paginationMeta && paginationMeta.total > 0 && (
              <div className="bg-beige-100/50 rounded-2xl border border-black/10">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center p-6 md:p-10">
                  <div className="md:border-r md:border-black/10 px-4">
                    <div className="text-4xl font-serif font-bold text-gold-700 mb-2">
                      {new Set(albums.map(album => album.collectionId)).size}
                    </div>
                    <div className="text-gray-700 tracking-wide">Collections on Page</div>
                  </div>
                  <div className="mt-8 md:mt-0 md:border-r md:border-black/10 px-4">
                    <div className="text-4xl font-serif font-bold text-gold-700 mb-2">
                      {paginationMeta.total}
                    </div>
                    <div className="text-gray-700 tracking-wide">Total Albums</div>
                  </div>
                  <div className="mt-8 md:mt-0 px-4">
                    <div className="text-4xl font-serif font-bold text-gold-700 mb-2">
                      {albums.reduce((total, album) => total + album.images.length, 0)}
                    </div>
                    <div className="text-gray-700 tracking-wide">Images on Page</div>
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