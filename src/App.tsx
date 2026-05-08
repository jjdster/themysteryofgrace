import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthProvider';
import { SearchProvider } from './lib/SearchProvider';
import Navigation from './components/Navigation';
import Search from './pages/Search';
import Links from './pages/Links';
import Mystery from './pages/Mystery';
import ProphecyMysteryStudy from './pages/ProphecyMysteryStudy';
import Videos from './pages/Videos';
import Library from './pages/Library';
import StudyCenter from './pages/StudyCenter';

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <div className="min-h-screen bg-white md:pt-16 pb-16 md:pb-0">
          <Navigation />
          <Routes>
            <Route path="/" element={<Mystery />} />
            <Route path="/library" element={<Library />} />
            <Route path="/study" element={<StudyCenter />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/search" element={<Search />} />
            <Route path="/links" element={<Links />} />
            <Route path="/mystery" element={<Mystery />} />
            <Route path="/prophecy-mystery" element={<ProphecyMysteryStudy />} />
          </Routes>
        </div>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
