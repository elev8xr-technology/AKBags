import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Collection, Album, PaginationMeta } from '../types';
import Pagination from '../components/Pagination';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CollectionDetail: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);

  useEffect(() => {
    const fetchCollectionData = async () => {
      if (!collectionId) return;

      try {
        setLoading(true);
        // Fetch collection details first
        const collectionData = await apiService.getCollection(collectionId);
        if (!collectionData) {
          setError('Collection not found');
          setLoading(false);
          return;
        }
        setCollection(collectionData);

        // Then fetch the paginated albums for the collection
        const albumsResult = await apiService.getCollectionAlbums(collectionId, currentPage);
        if (albumsResult && albumsResult.data) {
          setAlbums(albumsResult.data as Album[]);
          setPaginationMeta(albumsResult.meta);
        } else {
          setError('Failed to load albums for this collection');
        }

      } catch (err) {
        setError('Failed to load collection details');
        console.error('Error loading collection details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [collectionId, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 flex flex-col items-center justify-center text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mb-4"></div>
        <p className="text-lg font-serif text-gray-700">Loading Collection...</p>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif font-bold text-red-600 mb-4">
          {error || 'Collection Not Found'}
        </h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the collection you're looking for.
        </p>
        <Link
          to="/collections"
          className="inline-flex items-center px-6 py-3 bg-gold-600 text-white font-bold rounded-lg hover:bg-gold-700 transition-colors duration-300 shadow-md"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen animate-fade-in pt-28">
      {/* Hero Section */}
      <section 
        className="relative bg-gray-900 bg-cover bg-center text-white py-20 sm:py-24 md:py-32"
        style={{ backgroundImage: `url(${collection.coverImage || 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Link
              to="/collections"
              className="inline-flex items-center text-gold-300 hover:text-white transition-colors group"
            >
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Collections
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-4">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              {collection.description}
            </p>
          )}
        </div>
      </section>

      {/* Albums Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 md:mb-12 text-center">
            Albums in this Collection
          </h2>
          {albums.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No albums available in this collection yet.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {albums.map((album) => (
                  <Link
                    key={album.id}
                    to={`/collections/${collection.id}/albums/${album.id}`}
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
              {paginationMeta && paginationMeta.total > 0 && (
                <div className="mt-12 md:mt-16 mb-12">
                  {/* Stats Section */}
                  <div className="max-w-xs mx-auto bg-cream-100/60 rounded-xl shadow-md p-6 mb-12 border border-gray-200/80">
                    <div className="text-center">
                        <p className="text-3xl sm:text-4xl font-serif font-bold text-gold-600 mb-2">
                          {paginationMeta.total}
                        </p>
                        <p className="text-md text-gray-700 font-semibold uppercase tracking-wider">Total Albums</p>
                    </div>
                  </div>

                  {paginationMeta.last_page > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={paginationMeta.last_page}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CollectionDetail;