export interface Image {
  id: string;
  url: string;
  title?: string;
  alt?: string;
}

export interface Album {
  id: string;
  name: string;
  coverImage: string;
  images: Image[];
  collectionId: string;
  collectionName?: string;
}

export interface Collection {
  id: string;
  name: string;
  coverImage: string;
  description?: string;
  albums: Album[];
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}