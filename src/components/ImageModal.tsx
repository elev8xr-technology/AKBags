import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Image, Album, Collection } from '../types';

interface ImageModalProps {
  image: Image;
  album?: Album;
  collection?: Collection;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  image,
  album,
  collection,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (onPrevious && hasPrevious) onPrevious();
          break;
        case 'ArrowRight':
          if (onNext && hasNext) onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious, hasNext, hasPrevious]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Navigation Buttons */}
        {onPrevious && hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {onNext && hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Image Container */}
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="relative max-w-full max-h-[80vh] mb-6 flex items-center justify-center">
            <img
              src={image.url}
              alt={image.title || 'Image'}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              style={{ objectFit: 'contain', objectPosition: 'center', width: '100%', margin: 'auto' }}
            />
          </div>

          {/* Image Info */}
          <div className="text-center text-white max-w-2xl">
            {image.title && (
              <h2 className="text-2xl font-serif font-semibold mb-2">{image.title}</h2>
            )}
            <div className="text-gray-300 space-y-1">
              {album && <p className="text-lg">{album.name}</p>}
              {collection && <p className="text-sm opacity-75">{collection.name}</p>}
            </div>
          </div>
        </div>

        {/* Click outside to close */}
        <div
          className="absolute inset-0 -z-10"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default ImageModal;