# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AKBag is a React-based web gallery application for showcasing leather goods collections. The application displays hierarchical content with Collections containing Albums, and Albums containing Images. It's built as a single-page application with modern web technologies.

## Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2  
- **Routing**: React Router DOM 7.6.3
- **Styling**: Tailwind CSS 3.4.1 with PostCSS
- **Icons**: Lucide React 0.344.0
- **Linting**: ESLint 9.9.1 with TypeScript ESLint

## Development Commands

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## API Integration

The application connects to a REST API at `https://akbag.elev8xr.com/api` with image storage at `https://akbag.elev8xr.com/storage`. The API service layer handles data transformation between API response types and frontend types.

Key API endpoints:
- Collections: `/collections`
- Collection albums: `/collections/{id}/albums`
- All albums: `/albums`
- Album images: `/albums/{id}/images`
- Individual items by ID

## Architecture

### Data Flow
1. **API Layer** (`src/services/api.ts`): Handles API communication and data transformation
2. **Type System** (`src/types/index.ts`): Defines TypeScript interfaces for Image, Album, and Collection
3. **Pages**: Route components that fetch and display data
4. **Components**: Reusable UI components (Header, SearchOverlay, ImageModal, Pagination)

### Key Components
- **App.tsx**: Main application component with routing and global search state
- **Header.tsx**: Navigation header with responsive design and search toggle
- **Pages**: Home, Collections, CollectionDetail, Albums, Album
- **SearchOverlay**: Global search functionality across all content
- **Pagination.tsx**: Reusable pagination component for paginated API responses

### Routing Structure
The application uses nested routing with React Router DOM 7:
```
/ → Home page
/collections → Collections listing page
/albums → All albums listing page
/collections/:collectionId → Collection detail with albums
/collections/:collectionId/albums/:albumId → Album detail with images
```

### Styling System
Uses Tailwind CSS with custom color palette:
- **Beige palette**: 50-900 shades for backgrounds and subtle elements
- **Cream palette**: 50-900 shades for warm accents  
- **Gold palette**: 50-900 shades for highlights and CTAs
- **Typography**: Playfair Display (serif) for headings, Inter (sans) for body text
- **Custom animations**: fade-in, slide-up with keyframes
- **Focus styling**: Gold outline for accessibility
- **Custom scrollbar**: Subtle gray styling for webkit browsers

## Data Transformation

The API returns data in snake_case format which gets transformed to camelCase frontend types:
- `ApiCollection` → `Collection`
- `ApiAlbum` → `Album`  
- `ApiImage` → `Image`

Image URLs are constructed by combining the storage base URL with image paths, with fallback to placeholder images. All transformation functions include null checks and defensive programming.

## Pagination System

The application implements comprehensive pagination support:
- All list endpoints support pagination with `page` and `per_page` parameters
- API responses include `meta` object with pagination information
- Frontend types include `PaginatedResponse<T>` and `PaginationMeta` interfaces
- Pagination component handles navigation and displays current page status

## Error Handling

The application includes comprehensive error handling:
- API request failures with user-friendly error messages
- Image loading failures with automatic fallback to placeholder images
- Loading states for better UX during data fetching
- Console logging for debugging API issues

## Configuration Files

- **TypeScript**: Strict mode enabled with bundler resolution, unused parameters/locals detection
- **ESLint**: React hooks and refresh plugins, TypeScript support with recommended rules
- **Vite**: React plugin with lucide-react optimization exclusion
- **Tailwind**: Custom theme extensions for colors, fonts, animations, and aspect ratios

## Search Engine Blocking

The website is configured to be invisible to search engines and social media crawlers:

### robots.txt
- Located in `public/robots.txt`
- Blocks all user agents with `Disallow: /`
- Specifically targets major search engines: Google, Bing, Yahoo, DuckDuckGo, Baidu, Yandex
- Also blocks social media crawlers: Facebook, Twitter, LinkedIn, WhatsApp

### Meta Tags
- Comprehensive `noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate` directives
- Specific bot targeting for Googlebot, Bingbot, Slurp, DuckDuckBot
- Empty Open Graph and Twitter Card meta tags to prevent social media previews
- All implemented in `index.html`

### Important Notes
- These measures prevent indexing by compliant crawlers but don't guarantee complete invisibility
- Consider additional server-level protections (password protection, IP restrictions) for maximum security
- The site will still be accessible to anyone with the direct URL

## Testing

No testing framework is currently configured. When adding tests, examine the project structure to determine appropriate testing approach.