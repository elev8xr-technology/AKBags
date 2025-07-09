import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '../data/mockData';

const Albums: React.FC = () => {
  // Flatten all albums from all collections
  const allAlbums = collections.flatMap(collection => 
    collection.albums.map(album => ({
      ...album,
      collectionName: collection.name
    }))
  );

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allAlbums.map((album) => (
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
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {album.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {album.collectionName}
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

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-serif font-bold text-gray-900 mb-2">
                {collections.length}
              </div>
              <div className="text-gray-600">Collections</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-gray-900 mb-2">
                {allAlbums.length}
              </div>
              <div className="text-gray-600">Albums</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-gray-900 mb-2">
                {allAlbums.reduce((total, album) => total + album.images.length, 0)}
              </div>
              <div className="text-gray-600">Images</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Albums;