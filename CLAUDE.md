# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AKBag is a React-based web gallery application for showcasing leather goods collections. The application displays hierarchical content with Collections containing Albums, and Albums containing Images. It's built as a single-page application with modern web technologies and connects to a Laravel-based REST API backend.

## Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2 with React plugin
- **Routing**: React Router DOM 7.6.3 (BrowserRouter with nested routes)
- **Styling**: Tailwind CSS 3.4.1 with PostCSS and custom color palette
- **Icons**: Lucide React 0.344.0
- **Linting**: ESLint 9.9.1 with TypeScript ESLint, React hooks, and refresh plugins
- **Type System**: Strict TypeScript with bundler resolution

## Development Commands

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Run linter (always run before committing)
npm run lint

# Preview production build
npm run preview
```

## API Integration

The application connects to a Laravel-based REST API at `https://akbag.elev8xr.com/api` with image storage at `https://akbag.elev8xr.com/storage`. The API uses Laravel Sanctum for authentication and provides comprehensive CRUD operations with pagination support.

**Key API endpoints:**
- Collections: `/collections` (paginated)
- Collection albums: `/collections/{id}/albums` (paginated)
- All albums: `/albums` (paginated) 
- Album images: `/albums/{id}/images` (paginated)
- Featured images: `/featured-images`
- Individual items accessible by ID

**Authentication:** Laravel Sanctum Bearer Token required for admin operations (CREATE, UPDATE, DELETE)

## Architecture

The application follows a clean, layered architecture with clear separation of concerns:

### Core Data Flow
1. **API Service Layer** (`src/services/api.ts`): Centralizes all API communication with the Laravel backend
   - Handles HTTP requests with proper error handling and fallbacks
   - Transforms snake_case API responses to camelCase frontend types
   - Provides consistent pagination support across all endpoints
   - Implements defensive programming with null checks

2. **Type System** (`src/types/index.ts`): Comprehensive TypeScript interfaces
   - `Image`, `Album`, `Collection` - Core domain models
   - `PaginatedResponse<T>` and `PaginationMeta` - API pagination contracts
   - `FeaturedImage` - Homepage featured content
   - Strict typing throughout with proper null handling

3. **Component Hierarchy**:
   - `App.tsx` - Root component managing global state (search overlay) and routing
   - Pages - Route-level components that orchestrate data fetching and presentation  
   - Components - Reusable UI building blocks with prop interfaces

### Routing Architecture
Uses React Router DOM 7 with nested routes and URL parameters:
```
/ → Home (featured content aggregation)
/collections → Collections listing (paginated)
/albums → All albums listing (paginated)  
/collections/:collectionId → Collection detail with albums
/collections/:collectionId/albums/:albumId → Album with image gallery
```

### State Management Patterns
- **Local Component State**: React `useState` for component-specific state
- **Effect Hooks**: `useEffect` for data fetching with proper cleanup and error handling
- **Global State**: Minimal - only search overlay visibility managed at app level
- **URL State**: Route parameters drive data fetching (collectionId, albumId)

### Styling Architecture
Tailwind CSS with systematic design tokens:
- **Color System**: Custom beige/cream/gold palettes (50-900 shades each)
- **Typography**: Playfair Display (serif) for headings, Inter (sans) for body
- **Animation System**: Custom keyframes (fade-in, slide-up) for smooth interactions
- **Responsive Design**: Mobile-first approach with `sm:`, `md:`, `lg:` breakpoints
- **Component Styling**: Utility-first classes with hover states and transitions

## Data Transformation System

The application implements a comprehensive data transformation layer to bridge API and frontend types:

**API Response Types** (`src/services/api.ts`):
- `ApiCollection`, `ApiAlbum`, `ApiImage` - Mirror Laravel API snake_case structure
- Transformation functions: `transformCollection()`, `transformAlbum()`, `transformImage()`
- **Image URL Construction**: Handles multiple API response formats (image_url, image_path, path, url, filename)
- **Fallback Strategy**: Automatic placeholder images when API data is missing or invalid
- **Defensive Programming**: Null/undefined checks throughout with graceful degradation

**Frontend Types** (`src/types/index.ts`):
- Clean camelCase interfaces optimized for React components
- `PaginatedResponse<T>` wrapper for all list endpoints
- `PaginationMeta` with current_page, total, per_page, etc.

## Error Handling & Loading States

**API-Level Error Handling**:
- Try/catch blocks around all fetch operations
- Graceful degradation with null returns on failures
- Console logging for debugging without user-facing errors

**Component-Level Error Handling**:
- Loading states during data fetching with skeleton UI
- Error boundaries for component-level failures  
- Image onError handlers with automatic fallback to placeholder images
- Retry mechanisms with user-friendly error messages

**User Experience**:
- Loading spinners and skeleton states during data fetching
- Empty state handling when no data is available
- Progressive loading for better perceived performance

## Build Configuration

**Vite Configuration** (`vite.config.ts`):
- React plugin with HMR (Hot Module Replacement)
- Lucide React optimization exclusion to prevent bundling issues
- Development server with proxy capabilities

**TypeScript Configuration**:
- **Strict Mode**: All strict checks enabled including unused variables/parameters  
- **Bundler Resolution**: Modern module resolution for Vite compatibility
- **JSX**: React JSX transform for optimal bundle size

**ESLint Configuration** (`eslint.config.js`):
- TypeScript ESLint integration with recommended rules
- React Hooks plugin for proper hook usage validation
- React Refresh plugin for HMR compatibility

## Key Implementation Details

**Component Architecture Patterns**:
- **Container/Presentation Pattern**: Pages handle data fetching, components handle presentation
- **Prop Interface Design**: Explicit TypeScript interfaces for all component props
- **Event Handling**: Callback props for parent-child communication (e.g., `onSearchToggle`)
- **Responsive Design**: Mobile-first breakpoint system with progressive enhancement

**Image Handling Strategy**:
- Multiple fallback mechanisms for broken/missing images
- Progressive image loading with proper alt text for accessibility
- Responsive images using CSS aspect-ratio and object-fit
- Error handling with automatic fallback to placeholder images

**Performance Optimizations**:
- Parallel API requests using `Promise.all()` for faster data loading
- Lazy loading patterns for images and content
- Minimal re-renders through proper dependency arrays in useEffect
- Efficient CSS classes with Tailwind's utility-first approach

## Search Engine Blocking & Privacy

The application is configured to prevent search engine indexing and social media crawling:

**`public/robots.txt`**: Comprehensive blocking of all major search engines and social crawlers
**HTML Meta Tags**: Multiple `noindex` directives and empty Open Graph tags to prevent social sharing
**Privacy Note**: Site remains accessible via direct URL but won't appear in search results

## Development Workflow

**Before Making Changes**:
1. Understand the hierarchical data structure: Collections → Albums → Images
2. Review the API transformation layer for data flow understanding
3. Check existing component patterns before creating new ones
4. Follow the established Tailwind color palette and animation system

**Code Quality**:
- Always run `npm run lint` before committing changes
- Follow existing TypeScript strict mode patterns
- Maintain defensive programming practices in API calls
- Use existing component patterns for consistency

## Testing

No testing framework is currently configured. When implementing tests, consider the API-dependent nature of most components and mock the `apiService` appropriately.