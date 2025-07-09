import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { collections } from '../data/mockData';
import { Album, Image } from '../types';
import { Link } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  type: 'album' | 'image';
  album?: Album;
  image?: Image;
  collectionName?: string;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const queryLower = query.toLowerCase();

    collections.forEach(collection => {
      collection.albums.forEach(album => {
        // Search in album names
        if (album.name.toLowerCase().includes(queryLower)) {
          searchResults.push({
            type: 'album',
            album,
            collectionName: collection.name
          });
        }

        // Search in image titles
        album.images.forEach(image => {
          if (image.title?.toLowerCase().includes(queryLower)) {
            searchResults.push({
              type: 'image',
              image,
              album,
              collectionName: collection.name
            });
          }
        });
      });
    });

    setResults(searchResults.slice(0, 10)); // Limit to 10 results
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-semibold text-gray-900">Search Albums & Images</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search albums, images..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          {query.length >= 2 && (
            <div className="max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      {result.type === 'album' && result.album && (
                        <>
                          <img
                            src={result.album.coverImage}
                            alt={result.album.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/collections/${result.album.collectionId}/albums/${result.album.id}`}
                              className="block hover:text-yellow-600 transition-colors"
                              onClick={onClose}
                            >
                              <h3 className="font-medium text-gray-900 truncate">
                                {result.album.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Album in {result.collectionName}
                              </p>
                            </Link>
                          </div>
                        </>
                      )}
                      {result.type === 'image' && result.image && result.album && (
                        <>
                          <img
                            src={result.image.url}
                            alt={result.image.title || 'Image'}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/collections/${result.album.collectionId}/albums/${result.album.id}`}
                              className="block hover:text-yellow-600 transition-colors"
                              onClick={onClose}
                            >
                              <h3 className="font-medium text-gray-900 truncate">
                                {result.image.title || 'Untitled'}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Image in {result.album.name} • {result.collectionName}
                              </p>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}

          {query.length < 2 && (
            <div className="text-center py-8 text-gray-500">
              Type at least 2 characters to search
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;