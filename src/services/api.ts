const BASE_URL = 'https://akbag.elev8xr.com/api';
const STORAGE_URL = 'https://akbag.elev8xr.com/storage';

// API Response Types
export interface ApiCollection {
  id: number;
  name: string;
  description?: string;
  slug: string;
  albums?: ApiAlbum[];
}

export interface ApiAlbum {
  id: number;
  title: string;
  description?: string;
  slug: string;
  collection_id: number;
  cover_image?: string;
  images?: ApiImage[];
}

export interface ApiImage {
  id: number;
  title?: string;
  image_path?: string;
  path?: string;
  url?: string;
  filename?: string;
  image_url?: string;
  album_id: number;
}

// Transform API data to frontend types
export const transformCollection = (apiCollection: ApiCollection) => {
  // Check if apiCollection exists and has required properties
  if (!apiCollection || !apiCollection.id || !apiCollection.name) {
    return null;
  }

  return {
    id: apiCollection.id.toString(),
    name: apiCollection.name,
    description: apiCollection.description || '',
    coverImage: apiCollection.albums?.[0]?.images?.[0]
      ? transformImage(apiCollection.albums[0].images[0]).url
      : 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    albums: apiCollection.albums?.map(transformAlbum) || []
  };
};

export const transformAlbum = (apiAlbum: ApiAlbum) => {
  const transformed = {
    id: apiAlbum.id.toString(),
    name: apiAlbum.title,
    coverImage: apiAlbum.cover_image
      ? `${STORAGE_URL}/${apiAlbum.cover_image}`
      : apiAlbum.images?.[0]
        ? transformImage(apiAlbum.images[0]).url
        : 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    collectionId: apiAlbum.collection_id.toString(),
    images: apiAlbum.images?.map(transformImage) || []
  };
  return transformed;
};

export const transformImage = (apiImage: ApiImage) => {
  // Try to find the image path from various possible field names
  // Prioritize image_url since that's what the API actually returns
  const imagePath = apiImage.image_url || apiImage.image_path || apiImage.path || apiImage.url || apiImage.filename;

  // Check if we found a valid image path
  if (!imagePath) {
    console.warn('No image path found for image:', apiImage);
    return {
      id: apiImage.id.toString(),
      url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: apiImage.title || '',
      alt: apiImage.title || 'Product image'
    };
  }

  // If the path already includes the full URL, use it as is
  if (imagePath.startsWith('http')) {
    return {
      id: apiImage.id.toString(),
      url: imagePath,
      title: apiImage.title || '',
      alt: apiImage.title || 'Product image'
    };
  }

  // Otherwise, construct the URL with the storage base
  return {
    id: apiImage.id.toString(),
    url: `${STORAGE_URL}/${imagePath}`,
    title: apiImage.title || '',
    alt: apiImage.title || 'Product image'
  };
};

// API Service Functions
export const apiService = {
  // Collections
  async getCollections() {
    try {
      const response = await fetch(`${BASE_URL}/collections`);
      if (!response.ok) throw new Error('Failed to fetch collections');
      const json = await response.json();
      const data: ApiCollection[] = json.data;

      // Fetch albums for each collection
      const collectionsWithAlbums = await Promise.all(
        data.map(async (collection) => {
          try {
            const albumsResponse = await fetch(`${BASE_URL}/collections/${collection.id}/albums`);
            let albums: ApiAlbum[] = [];
            if (albumsResponse.ok) {
              const albumsJson = await albumsResponse.json();
              albums = albumsJson.data;

              // Fetch images for each album
              const albumsWithImages = await Promise.all(
                albums.map(async (album) => {
                  try {
                    const imagesResponse = await fetch(`${BASE_URL}/collections/${collection.id}/albums/${album.id}`);
                    if (imagesResponse.ok) {
                      const imagesJson = await imagesResponse.json();
                      const albumWithImages = imagesJson.data;
                      return albumWithImages;
                    } else {
                      console.warn(`Failed to fetch images for album ${album.id}:`, imagesResponse.status);
                      return album;
                    }
                  } catch (error) {
                    console.error(`Error fetching images for album ${album.id}:`, error);
                    return album;
                  }
                })
              );

              return {
                ...collection,
                albums: albumsWithImages
              };
            } else {
              console.warn(`Failed to fetch albums for collection ${collection.id}:`, albumsResponse.status);
            }
            return {
              ...collection,
              albums: albums
            };
          } catch (error) {
            console.error(`Error fetching albums for collection ${collection.id}:`, error);
            return {
              ...collection,
              albums: []
            };
          }
        })
      );

      // Handle case where API returns single object instead of array
      if (Array.isArray(collectionsWithAlbums)) {
        return collectionsWithAlbums.map(transformCollection).filter(collection => collection !== null);
      } else if (collectionsWithAlbums && typeof collectionsWithAlbums === 'object') {
        const transformed = transformCollection(collectionsWithAlbums as ApiCollection);
        return transformed ? [transformed] : [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching collections:', error);
      return [];
    }
  },

  async getCollection(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/collections/${id}`);
      if (!response.ok) throw new Error('Failed to fetch collection');
      const json = await response.json();
      const data: ApiCollection = json.data;

      // Fetch albums for this collection
      const albumsResponse = await fetch(`${BASE_URL}/collections/${id}/albums`);
      let albums: ApiAlbum[] = [];
      if (albumsResponse.ok) {
        const albumsJson = await albumsResponse.json();
        albums = albumsJson.data;

        // Fetch images for each album
        const albumsWithImages = await Promise.all(
          albums.map(async (album) => {
            try {
              const imagesResponse = await fetch(`${BASE_URL}/collections/${id}/albums/${album.id}`);
              if (imagesResponse.ok) {
                const imagesJson = await imagesResponse.json();
                const albumWithImages = imagesJson.data;
                return albumWithImages;
              } else {
                console.warn(`Failed to fetch images for album ${album.id}:`, imagesResponse.status);
                return album;
              }
            } catch (error) {
              console.error(`Error fetching images for album ${album.id}:`, error);
              return album;
            }
          })
        );

        // Create a collection object with albums
        const collectionWithAlbums: ApiCollection = {
          ...data,
          albums: albumsWithImages
        };

        return transformCollection(collectionWithAlbums);
      }

      // Create a collection object with albums
      const collectionWithAlbums: ApiCollection = {
        ...data,
        albums: albums
      };

      return transformCollection(collectionWithAlbums);
    } catch (error) {
      console.error('Error fetching collection:', error);
      return null;
    }
  },

  async getCollectionAlbums(collectionId: string) {
    try {
      const response = await fetch(`${BASE_URL}/collections/${collectionId}/albums`);
      if (!response.ok) throw new Error('Failed to fetch collection albums');
      const json = await response.json();
      const data: ApiAlbum[] = json.data;

      // Fetch images for each album
      const albumsWithImages = await Promise.all(
        data.map(async (album) => {
          try {
            const imagesResponse = await fetch(`${BASE_URL}/collections/${collectionId}/albums/${album.id}`);
            if (imagesResponse.ok) {
              const imagesJson = await imagesResponse.json();
              const albumWithImages = imagesJson.data;
              return albumWithImages;
            } else {
              console.warn(`Failed to fetch images for album ${album.id}:`, imagesResponse.status);
              return album;
            }
          } catch (error) {
            console.error(`Error fetching images for album ${album.id}:`, error);
            return album;
          }
        })
      );

      return albumsWithImages.map(transformAlbum);
    } catch (error) {
      console.error('Error fetching collection albums:', error);
      return [];
    }
  },

  async getCollectionAlbum(collectionId: string, albumId: string) {
    try {
      const response = await fetch(`${BASE_URL}/collections/${collectionId}/albums/${albumId}`);
      if (!response.ok) throw new Error('Failed to fetch album');
      const json = await response.json();
      const data: ApiAlbum = json.data;
      return transformAlbum(data);
    } catch (error) {
      console.error('Error fetching album:', error);
      return null;
    }
  },

  // Albums
  async getAllAlbums() {
    try {
      const response = await fetch(`${BASE_URL}/albums`);
      if (!response.ok) throw new Error('Failed to fetch albums');
      const json = await response.json();
      const data: ApiAlbum[] = json.data;

      // Fetch images for each album
      const albumsWithImages = await Promise.all(
        data.map(async (album) => {
          try {
            const imagesResponse = await fetch(`${BASE_URL}/collections/${album.collection_id}/albums/${album.id}`);
            if (imagesResponse.ok) {
              const imagesJson = await imagesResponse.json();
              const albumWithImages = imagesJson.data;
              return albumWithImages;
            } else {
              console.warn(`Failed to fetch images for album ${album.id}:`, imagesResponse.status);
              return album;
            }
          } catch (error) {
            console.error(`Error fetching images for album ${album.id}:`, error);
            return album;
          }
        })
      );

      // Handle case where API returns single object instead of array
      if (Array.isArray(albumsWithImages)) {
        return albumsWithImages.map(transformAlbum).filter(album => album !== null);
      } else if (albumsWithImages && typeof albumsWithImages === 'object') {
        const transformed = transformAlbum(albumsWithImages as ApiAlbum);
        return transformed ? [transformed] : [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
      return [];
    }
  },

  async getAlbum(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/albums/${id}`);
      if (!response.ok) throw new Error('Failed to fetch album');
      const json = await response.json();
      const data: ApiAlbum = json.data;
      return transformAlbum(data);
    } catch (error) {
      console.error('Error fetching album:', error);
      return null;
    }
  },

  async getAlbumImages(albumId: string) {
    try {
      const response = await fetch(`${BASE_URL}/albums/${albumId}/images`);
      if (!response.ok) throw new Error('Failed to fetch album images');
      const json = await response.json();
      const data: ApiImage[] = json.data;
      return data.map(transformImage);
    } catch (error) {
      console.error('Error fetching album images:', error);
      return [];
    }
  },

  // Images
  async getAllImages() {
    try {
      const response = await fetch(`${BASE_URL}/images`);
      if (!response.ok) throw new Error('Failed to fetch images');
      const json = await response.json();
      const data: ApiImage[] = json.data;
      return data.map(transformImage);
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  },

  async getImage(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/images/${id}`);
      if (!response.ok) throw new Error('Failed to fetch image');
      const json = await response.json();
      const data: ApiImage = json.data;
      return transformImage(data);
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  }
};
