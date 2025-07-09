import { Collection } from '../types';

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Classic Collection',
    coverImage: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Timeless designs for the modern professional',
    albums: [
      {
        id: '1-1',
        name: 'Executive Series',
        coverImage: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
        collectionId: '1',
        images: [
          {
            id: '1-1-1',
            url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Executive Briefcase - Black',
            alt: 'Black leather executive briefcase'
          },
          {
            id: '1-1-2',
            url: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Executive Briefcase - Brown',
            alt: 'Brown leather executive briefcase'
          },
          {
            id: '1-1-3',
            url: 'https://images.pexels.com/photos/1200562/pexels-photo-1200562.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Executive Portfolio',
            alt: 'Leather portfolio case'
          },
          {
            id: '1-1-4',
            url: 'https://images.pexels.com/photos/1454949/pexels-photo-1454949.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Executive Laptop Bag',
            alt: 'Professional laptop bag'
          }
        ]
      },
      {
        id: '1-2',
        name: 'Daily Essentials',
        coverImage: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800',
        collectionId: '1',
        images: [
          {
            id: '1-2-1',
            url: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Daily Messenger',
            alt: 'Everyday messenger bag'
          },
          {
            id: '1-2-2',
            url: 'https://images.pexels.com/photos/1200562/pexels-photo-1200562.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Casual Tote',
            alt: 'Casual leather tote bag'
          },
          {
            id: '1-2-3',
            url: 'https://images.pexels.com/photos/1454949/pexels-photo-1454949.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Compact Crossbody',
            alt: 'Small crossbody bag'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Heritage Collection',
    coverImage: 'https://images.pexels.com/photos/1200562/pexels-photo-1200562.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Crafted with traditional techniques and premium materials',
    albums: [
      {
        id: '2-1',
        name: 'Artisan Craft',
        coverImage: 'https://images.pexels.com/photos/1200562/pexels-photo-1200562.jpeg?auto=compress&cs=tinysrgb&w=800',
        collectionId: '2',
        images: [
          {
            id: '2-1-1',
            url: 'https://images.pexels.com/photos/1200562/pexels-photo-1200562.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Handcrafted Satchel',
            alt: 'Handmade leather satchel'
          },
          {
            id: '2-1-2',
            url: 'https://images.pexels.com/photos/1454949/pexels-photo-1454949.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Vintage Messenger',
            alt: 'Vintage style messenger bag'
          },
          {
            id: '2-1-3',
            url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Heritage Briefcase',
            alt: 'Traditional leather briefcase'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Urban Collection',
    coverImage: 'https://images.pexels.com/photos/1454949/pexels-photo-1454949.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Modern designs for city living',
    albums: [
      {
        id: '3-1',
        name: 'Street Style',
        coverImage: 'https://images.pexels.com/photos/1454949/pexels-photo-1454949.jpeg?auto=compress&cs=tinysrgb&w=800',
        collectionId: '3',
        images: [
          {
            id: '3-1-1',
            url: 'https://images.pexels.com/photos/1454949/pexels-photo-1454949.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Urban Backpack',
            alt: 'Modern urban backpack'
          },
          {
            id: '3-1-2',
            url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Tech Messenger',
            alt: 'Technology messenger bag'
          },
          {
            id: '3-1-3',
            url: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'City Tote',
            alt: 'Urban tote bag'
          }
        ]
      }
    ]
  }
];