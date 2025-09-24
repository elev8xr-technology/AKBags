import { PaginatedResponse, FeaturedImage } from '../types';

const BASE_URL = 'https://akbag.elev8xr.com/api';
const STORAGE_URL = 'https://akbag.elev8xr.com/storage';

// API Response Types matching our updated backend
export interface ApiCollection {
  id: number;
  name: string;
  description?: string;
  cover_image?: string;
  cover_image_url?: string;
  albums_count?: number;
  albums?: ApiAlbum[];
  created_at?: string;
  updated_at?: string;
}

export interface ApiAlbum {
  id: number;
  title: string;
  description?: string;
  collection_id: number;
  cover_image?: string;
  cover_image_url?: string;
  images_count?: number;
  collection?: ApiCollection;
  images?: ApiImage[];
  created_at?: string;
  updated_at?: string;
}

export interface ApiImage {
  id: number;
  title?: string;
  description?: string;
  image_path?: string;
  image_url?: string;
  original_url?: string;
  album_id: number;
  album?: ApiAlbum;
  created_at?: string;
  updated_at?: string;
}

// Transform API data to frontend types
export const transformCollection = (apiCollection: ApiCollection) => {
  if (!apiCollection || !apiCollection.id || !apiCollection.name) {
    return null;
  }

  // Use cover_image_url if available, otherwise fallback to placeholder
  let coverImageUrl = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';
  
  if (apiCollection.cover_image_url) {
    coverImageUrl = apiCollection.cover_image_url;
  } else if (apiCollection.cover_image) {
    if (apiCollection.cover_image.startsWith('http')) {
      coverImageUrl = apiCollection.cover_image;
    } else {
      coverImageUrl = `${STORAGE_URL}/${apiCollection.cover_image}`;
    }
  }

  return {
    id: apiCollection.id.toString(),
    name: apiCollection.name,
    coverImage: coverImageUrl,
    albums: apiCollection.albums?.map(transformAlbum) || [],
    albums_count: apiCollection.albums_count,
    cover_image_url: apiCollection.cover_image_url,
    created_at: apiCollection.created_at,
    updated_at: apiCollection.updated_at
  };
};

export const transformAlbum = (apiAlbum: ApiAlbum) => {
  let coverImageUrl = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';

  // Use cover_image_url if available, otherwise fallback logic
  if (apiAlbum.cover_image_url) {
    coverImageUrl = apiAlbum.cover_image_url;
  } else if (apiAlbum.cover_image) {
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
    collectionName: apiAlbum.collection?.name,
    images: apiAlbum.images?.map(transformImage) || [],
    images_count: apiAlbum.images_count,
    collection: apiAlbum.collection ? transformCollection(apiAlbum.collection) : undefined,
    created_at: apiAlbum.created_at,
    updated_at: apiAlbum.updated_at
  };
  return transformed;
};

export const transformImage = (apiImage: ApiImage) => {
  const imagePath = apiImage.image_url || apiImage.image_path;

  let imageUrl = 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800';
  
  if (imagePath) {
    if (imagePath.startsWith('http')) {
      imageUrl = imagePath;
    } else {
      imageUrl = `${STORAGE_URL}/${imagePath}`;
    }
  } else {
    console.warn('No image path found for image:', apiImage);
  }

  return {
    id: apiImage.id.toString(),
    url: imageUrl,
    title: apiImage.title || '',
    alt: apiImage.title || 'Product image',
    original_url: apiImage.original_url,
    album_id: apiImage.album_id.toString(),
    // Avoid circular dependency - only include basic album info
    album: apiImage.album ? {
      id: apiImage.album.id.toString(),
      name: apiImage.album.title,
      collection_id: apiImage.album.collection_id.toString()
    } : undefined,
    created_at: apiImage.created_at,
    updated_at: apiImage.updated_at
  };
};

// API Service Functions
export const apiService = {
  async getFeaturedImages(): Promise<FeaturedImage[] | null> {
    try {
      const response = await fetch(`${BASE_URL}/featured-images`);
      if (!response.ok) throw new Error('Failed to fetch featured images');
      const json: { data: FeaturedImage[] } = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching featured images:', error);
      return null;
    }
  },
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
