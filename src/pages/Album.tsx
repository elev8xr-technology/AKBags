import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Album as AlbumType, Collection, Image } from '../types';
import { ArrowLeft } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import Pagination from '../components/Pagination';
import { PaginationMeta } from '../types';

const Album: React.FC = () => {
  const { collectionId, albumId } = useParams<{ collectionId: string; albumId: string }>();
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!collectionId || !albumId) return;
      
      try {
        setLoading(true);
        
        const collectionData = await apiService.getCollection(collectionId);
        const albumData = await apiService.getCollectionAlbum(collectionId, albumId);
        setCollection(collectionData);
        setAlbum(albumData);

        const imagesResult = await apiService.getAlbumImages(albumId, currentPage, 30);
        if (imagesResult) {
          setImages(imagesResult.data);
          setPaginationMeta(imagesResult.meta);
        }
      } catch (err) {
        setError('Failed to load album');
        console.error('Error loading album:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionId, albumId, currentPage]);

  const handleImageClick = (image: Image, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleNextImage = () => {
    if (images && selectedImageIndex < images.length - 1) {
      const nextIndex = selectedImageIndex + 1;
      setSelectedImageIndex(nextIndex);
      setSelectedImage(images[nextIndex]);
    }
  };

  const handlePreviousImage = () => {
    if (images && selectedImageIndex > 0) {
      const prevIndex = selectedImageIndex - 1;
      setSelectedImageIndex(prevIndex);
      setSelectedImage(images[prevIndex]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading album...</p>
        </div>
      </div>
    );
  }

  if (error || !collection || !album) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            {error || 'Album Not Found'}
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
          to={`/collections/${collection.id}`}
          className="inline-flex items-center text-gray-600 hover:text-yellow-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to {collection.name}
        </Link>

        {/* Album Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            {album.name}
          </h1>
          <p className="text-lg text-gray-600">
            {collection.name} • {paginationMeta?.total || 0} {paginationMeta?.total === 1 ? 'Image' : 'Images'}
          </p>
        </div>

        {/* Images Grid */}
        {images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No images available in this album.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => handleImageClick(image, index)}
                className="group relative aspect-square bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={image.url}
                  alt={image.title || 'Image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                {image.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium truncate">{image.title}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {paginationMeta && paginationMeta.last_page > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={paginationMeta.last_page}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && album && (
          <ImageModal
            image={selectedImage}
            album={album}
            collection={collection}
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            onNext={handleNextImage}
            onPrevious={handlePreviousImage}
            hasNext={selectedImageIndex < images.length - 1}
            hasPrevious={selectedImageIndex > 0}
          />
        )}
      </div>
    </div>
  );
};

export default Album;