import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Collection, Album, PaginationMeta } from '../types';
import Pagination from '../components/Pagination';
import { ArrowLeft } from 'lucide-react';

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
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading collection...</p>
        </div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            {error || 'Collection Not Found'}
          </h1>
          <Link to="/collections" className="text-yellow-600 hover:text-yellow-700">
            ← Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/collections"
          className="inline-flex items-center text-gray-600 hover:text-yellow-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Collections
        </Link>

        {/* Collection Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {collection.description}
            </p>
          )}
        </div>

        {/* Albums Grid */}
        {albums.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No albums available in this collection.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <Link
                  key={album.id}
                  to={`/collections/${collection.id}/albums/${album.id}`}
                  className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="overflow-hidden">
                    <img
                      src={album.coverImage}
                      alt={album.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {album.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-yellow-600 group-hover:text-yellow-700">
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
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionDetail;