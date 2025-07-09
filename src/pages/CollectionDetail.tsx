import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { collections } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';

const CollectionDetail: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const collection = collections.find(c => c.id === collectionId);

  if (!collection) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">Collection Not Found</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collection.albums.map((album) => (
            <Link
              key={album.id}
              to={`/collections/${collection.id}/albums/${album.id}`}
              className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img
                  src={album.coverImage}
                  alt={album.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {album.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {album.images.length} {album.images.length === 1 ? 'Image' : 'Images'}
                  </span>
                  <span className="text-sm font-medium text-yellow-600 group-hover:text-yellow-700">
                    View Album →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;