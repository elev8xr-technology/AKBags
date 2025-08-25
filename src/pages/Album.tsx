import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Album as AlbumType, Collection, Image } from '../types';
import { ArrowLeft, Camera } from 'lucide-react';
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
      <div className="min-h-screen bg-cream-50 pt-32 flex flex-col items-center justify-center text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mb-4"></div>
        <p className="text-lg font-serif text-gray-700">Loading Album...</p>
      </div>
    );
  }

  if (error || !collection || !album) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif font-bold text-red-600 mb-4">
          {error || 'Album Not Found'}
        </h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the album you're looking for.
        </p>
        <Link
          to={collectionId ? `/collections/${collectionId}` : '/collections'}
          className="inline-flex items-center px-6 py-3 bg-gold-600 text-white font-bold rounded-lg hover:bg-gold-700 transition-colors duration-300 shadow-md"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen animate-fade-in">
      {/* Album Header Section */}
      <section 
        className="relative bg-gray-800 bg-cover bg-center text-white py-20 md:py-28"
        style={{ backgroundImage: `url(${album.coverImage || 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to={`/collections/${collection.id}`}
              className="inline-flex items-center text-gold-300 hover:text-white transition-colors group text-sm"
            >
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to {collection.name}
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-3">
              {album.name}
            </h1>
            <p className="text-lg text-gray-300 flex items-center justify-center space-x-2">
              <Camera size={18} />
              <span>{paginationMeta?.total || 0} {paginationMeta?.total === 1 ? 'Image' : 'Images'}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Images Gallery Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length === 0 ? (
            <div className="text-center py-16 bg-cream-100/50 rounded-xl border border-gray-200/80">
                <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">This Album is Empty</h3>
                <p className="text-gray-600">Check back later to see new images.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => handleImageClick(image, index)}
                    className="group relative aspect-w-1 aspect-h-1 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200/60"
                  >
                    <img
                      src={image.url}
                      alt={image.title || 'Album image'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    {image.title && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs font-medium truncate drop-shadow-md">{image.title}</p>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {paginationMeta && paginationMeta.last_page > 1 && (
                <div className="my-16">
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
      </section>

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
  );
};

export default Album;