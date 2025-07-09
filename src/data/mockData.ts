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
            url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
          },
          {
            id: '1-1-5',
            url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Executive Messenger',
            alt: 'Executive messenger bag'
          },
          {
            id: '1-1-6',
            url: 'https://images.pexels.com/photos/1200562/pexels-photo-1200562.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Executive Tote',
            alt: 'Executive tote bag'
          }
        ]
      },
      {
        id: '1-2',
        name: 'Daily Essentials',
        coverImage: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
        collectionId: '1',
        images: [
          {
            id: '1-2-1',
            url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
          },
          {
            id: '1-2-4',
            url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Weekend Duffle',
            alt: 'Weekend duffle bag'
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
          },
          {
            id: '2-1-4',
            url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Artisan Backpack',
            alt: 'Handcrafted leather backpack'
          },
          {
            id: '2-1-5',
            url: 'https://images.pexels.com/photos/1200562/pexels-photo-1200562.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Heritage Tote',
            alt: 'Heritage leather tote'
          }
        ]
      },
      {
        id: '2-2',
        name: 'Vintage Classics',
        coverImage: 'https://images.pexels.com/photos/1454949/pexels-photo-1454949.jpeg?auto=compress&cs=tinysrgb&w=800',
        collectionId: '2',
        images: [
          {
            id: '2-2-1',
            url: 'https://images.pexels.com/photos/1454949/pexels-photo-1454949.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Vintage Doctor Bag',
            alt: 'Classic doctor bag'
          },
          {
            id: '2-2-2',
            url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Classic Briefcase',
            alt: 'Vintage briefcase'
          },
          {
            id: '2-2-3',
            url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Retro Messenger',
            alt: 'Retro messenger bag'
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
            url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'City Tote',
            alt: 'Urban tote bag'
          },
          {
            id: '3-1-4',
            url: 'https://images.pexels.com/photos/1200562/pexels-photo-1200562.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Street Crossbody',
            alt: 'Street style crossbody'
          }
        ]
      },
      {
        id: '3-2',
        name: 'Tech Forward',
        coverImage: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
        collectionId: '3',
        images: [
          {
            id: '3-2-1',
            url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Smart Briefcase',
            alt: 'Tech-enabled briefcase'
          },
          {
            id: '3-2-2',
            url: 'https://images.pexels.com/photos/1454949/pexels-photo-1454949.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Digital Nomad Pack',
            alt: 'Digital nomad backpack'
          },
          {
            id: '3-2-3',
            url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Laptop Sleeve',
            alt: 'Premium laptop sleeve'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Travel Collection',
    coverImage: 'https://images.pexels.com/photos/1200562/pexels-photo-1200562.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Designed for the modern traveler',
    albums: [
      {
        id: '4-1',
        name: 'Journey Essentials',
        coverImage: 'https://images.pexels.com/photos/1200562/pexels-photo-1200562.jpeg?auto=compress&cs=tinysrgb&w=800',
        collectionId: '4',
        images: [
          {
            id: '4-1-1',
            url: 'https://images.pexels.com/photos/1200562/pexels-photo-1200562.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Travel Duffle',
            alt: 'Luxury travel duffle bag'
          },
          {
            id: '4-1-2',
            url: 'https://images.pexels.com/photos/1454949/pexels-photo-1454949.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Carry-On Companion',
            alt: 'Carry-on travel bag'
          },
          {
            id: '4-1-3',
            url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Travel Organizer',
            alt: 'Travel organizer bag'
          },
          {
            id: '4-1-4',
            url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1200',
            title: 'Weekend Getaway',
            alt: 'Weekend travel bag'
          }
        ]
      }
    ]
  }
];