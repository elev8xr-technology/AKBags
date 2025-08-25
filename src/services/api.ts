import { PaginatedResponse } from '../types';

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
  if (!apiCollection || !apiCollection.id || !apiCollection.name) {
    return null;
  }

  return {
    id: apiCollection.id.toString(),
    name: apiCollection.name,
    description: apiCollection.description || '',
    coverImage: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    albums: apiCollection.albums?.map(transformAlbum) || []
  };
};

export const transformAlbum = (apiAlbum: ApiAlbum) => {
  let coverImageUrl = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';

  if (apiAlbum.cover_image) {
    if (apiAlbum.cover_image.startsWith('http')) {
      coverImageUrl = apiAlbum.cover_image;
    } else {
      coverImageUrl = `${STORAGE_URL}/${apiAlbum.cover_image}`;
    }
  } else if (apiAlbum.images?.[0]) {
    coverImageUrl = transformImage(apiAlbum.images[0]).url;
  }

  const transformed = {
    id: apiAlbum.id.toString(),
    name: apiAlbum.title,
    coverImage: coverImageUrl,
    collectionId: apiAlbum.collection_id.toString(),
    images: apiAlbum.images?.map(transformImage) || [],
  };
  return transformed;
};

export const transformImage = (apiImage: ApiImage) => {
  const imagePath = apiImage.image_url || apiImage.image_path || apiImage.path || apiImage.url || apiImage.filename;

  if (!imagePath) {
    console.warn('No image path found for image:', apiImage);
    return {
      id: apiImage.id.toString(),
      url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: apiImage.title || '',
      alt: apiImage.title || 'Product image'
    };
  }

  if (imagePath.startsWith('http')) {
    return {
      id: apiImage.id.toString(),
      url: imagePath,
      title: apiImage.title || '',
      alt: apiImage.title || 'Product image'
    };
  }

  return {
    id: apiImage.id.toString(),
    url: `${STORAGE_URL}/${imagePath}`,
    title: apiImage.title || '',
    alt: apiImage.title || 'Product image'
  };
};

// API Service Functions
export const apiService = {
  async getCollections(page = 1, perPage = 15) {
    try {
      const response = await fetch(`${BASE_URL}/collections?page=${page}&per_page=${perPage}`);
      if (!response.ok) throw new Error('Failed to fetch collections');
      const json: PaginatedResponse<ApiCollection> = await response.json();
      return {
        data: json.data.map(transformCollection).filter(Boolean),
        meta: json.meta
      };
    } catch (error) {
      console.error('Error fetching collections:', error);
      return null;
    }
  },

  async getCollection(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/collections/${id}`);
      if (!response.ok) throw new Error('Failed to fetch collection');
      const json = await response.json();
      const data: ApiCollection = json.data;

      const albumsResponse = await fetch(`${BASE_URL}/collections/${id}/albums`);
      if (albumsResponse.ok) {
        const albumsJson = await albumsResponse.json();
        data.albums = albumsJson.data;
      }

      return transformCollection(data);
    } catch (error) {
      console.error('Error fetching collection:', error);
      return null;
    }
  },

  async getCollectionAlbums(collectionId: string, page = 1, perPage = 15) {
    try {
      const response = await fetch(`${BASE_URL}/collections/${collectionId}/albums?page=${page}&per_page=${perPage}`);
      if (!response.ok) throw new Error('Failed to fetch collection albums');
      const json: PaginatedResponse<ApiAlbum> = await response.json();
      return {
        data: json.data.map(transformAlbum),
        meta: json.meta
      };
    } catch (error) {
      console.error('Error fetching collection albums:', error);
      return null;
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

  async getAllAlbums(page = 1, perPage = 15) {
    try {
      const response = await fetch(`${BASE_URL}/albums?page=${page}&per_page=${perPage}`);
      if (!response.ok) throw new Error('Failed to fetch albums');
      const json: PaginatedResponse<ApiAlbum> = await response.json();
      return {
        data: json.data.map(transformAlbum),
        meta: json.meta
      };
    } catch (error) {
      console.error('Error fetching albums:', error);
      return null;
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

  async getAlbumImages(albumId: string, page = 1, perPage = 15) {
    try {
      const response = await fetch(`${BASE_URL}/albums/${albumId}/images?page=${page}&per_page=${perPage}`);
      if (!response.ok) throw new Error('Failed to fetch album images');
      const json: PaginatedResponse<ApiImage> = await response.json();
      return {
        data: json.data.map(transformImage),
        meta: json.meta
      };
    } catch (error) {
      console.error('Error fetching album images:', error);
      return null;
    }
  },

  async getAllImages(page = 1, perPage = 15) {
    try {
      const response = await fetch(`${BASE_URL}/images?page=${page}&per_page=${perPage}`);
      if (!response.ok) throw new Error('Failed to fetch images');
      const json: PaginatedResponse<ApiImage> = await response.json();
      return {
        data: json.data.map(transformImage),
        meta: json.meta
      };
    } catch (error) {
      console.error('Error fetching images:', error);
      return null;
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
