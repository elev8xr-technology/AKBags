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
  images?: ApiImage[];
}

export interface ApiImage {
  id: number;
  title?: string;
  image_path: string;
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
      ? `${STORAGE_URL}/${apiCollection.albums[0].images[0].image_path}`
      : 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    albums: apiCollection.albums?.map(transformAlbum) || []
  };
};

export const transformAlbum = (apiAlbum: ApiAlbum) => {
  return {
    id: apiAlbum.id.toString(),
    name: apiAlbum.title,
    coverImage: apiAlbum.images?.[0] 
      ? `${STORAGE_URL}/${apiAlbum.images[0].image_path}`
      : 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    collectionId: apiAlbum.collection_id.toString(),
    images: apiAlbum.images?.map(transformImage) || []
  };
};

export const transformImage = (apiImage: ApiImage) => ({
  id: apiImage.id.toString(),
  url: `${STORAGE_URL}/${apiImage.image_path}`,
  title: apiImage.title || '',
  alt: apiImage.title || 'Product image'
});

// API Service Functions
export const apiService = {
  // Collections
  async getCollections() {
    try {
      const response = await fetch(`${BASE_URL}/collections`);
      if (!response.ok) throw new Error('Failed to fetch collections');
      const data: ApiCollection[] = await response.json();
      
      // Handle case where API returns single object instead of array
      if (Array.isArray(data)) {
        return data.map(transformCollection).filter(collection => collection !== null);
      } else if (data && typeof data === 'object') {
        const transformed = transformCollection(data as ApiCollection);
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
      const data: ApiCollection = await response.json();
      return transformCollection(data);
    } catch (error) {
      console.error('Error fetching collection:', error);
      return null;
    }
  },

  async getCollectionAlbums(collectionId: string) {
    try {
      const response = await fetch(`${BASE_URL}/collections/${collectionId}/albums`);
      if (!response.ok) throw new Error('Failed to fetch collection albums');
      const data: ApiAlbum[] = await response.json();
      return data.map(transformAlbum);
    } catch (error) {
      console.error('Error fetching collection albums:', error);
      return [];
    }
  },

  async getCollectionAlbum(collectionId: string, albumId: string) {
    try {
      const response = await fetch(`${BASE_URL}/collections/${collectionId}/albums/${albumId}`);
      if (!response.ok) throw new Error('Failed to fetch album');
      const data: ApiAlbum = await response.json();
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
      const data: ApiAlbum[] = await response.json();
      
      // Handle case where API returns single object instead of array
      if (Array.isArray(data)) {
        return data.map(transformAlbum).filter(album => album !== null);
      } else if (data && typeof data === 'object') {
        const transformed = transformAlbum(data as ApiAlbum);
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
      const data: ApiAlbum = await response.json();
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
      const data: ApiImage[] = await response.json();
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
      const data: ApiImage[] = await response.json();
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
      const data: ApiImage = await response.json();
      return transformImage(data);
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  }
};
  // Check if apiAlbum exists and has required properties
  if (!apiAlbum || !apiAlbum.id || !apiAlbum.title || !apiAlbum.collection_id) {
    return null;
  }
