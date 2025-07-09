import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchOverlay from './components/SearchOverlay';
import Home from './pages/Home';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import Album from './pages/Album';
import Albums from './pages/Albums';

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header onSearchToggle={() => setSearchOpen(!searchOpen)} />
        <SearchOverlay
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/collections/:collectionId" element={<CollectionDetail />} />
          <Route path="/collections/:collectionId/albums/:albumId" element={<Album />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;