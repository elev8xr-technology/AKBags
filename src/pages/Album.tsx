import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collections } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import { Image } from '../types';

const Album: React.FC = () => {
  const { collectionId, albumId } = useParams<{ collectionId: string; albumId: string }>();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const collection = collections.find(c => c.id === collectionId);
  const album = collection?.albums.find(a => a.id === albumId);

  if (!collection || !album) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">Album Not Found</h1>
          <Link to="/collections" className="text-yellow-600 hover:text-yellow-700">
            ← Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const handleImageClick = (image: Image, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    if (selectedImageIndex < album.images.length - 1) {
      const nextIndex = selectedImageIndex + 1;
      setSelectedImageIndex(nextIndex);
      setSelectedImage(album.images[nextIndex]);
    }
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex > 0) {
      const prevIndex = selectedImageIndex - 1;
      setSelectedImageIndex(prevIndex);
      setSelectedImage(album.images[prevIndex]);
    }
  };

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
            {collection.name} • {album.images.length} {album.images.length === 1 ? 'Image' : 'Images'}
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {album.images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleImageClick(image, index)}
              className="group relative aspect-square bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={image.url}
                alt={image.title || 'Image'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            album={album}
            collection={collection}
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            onNext={handleNextImage}
            onPrevious={handlePreviousImage}
            hasNext={selectedImageIndex < album.images.length - 1}
            hasPrevious={selectedImageIndex > 0}
          />
        )}
      </div>
    </div>
  );
};

export default Album;