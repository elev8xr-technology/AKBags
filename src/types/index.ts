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
}

export interface Collection {
  id: string;
  name: string;
  coverImage: string;
  description?: string;
  albums: Album[];
}