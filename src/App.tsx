import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mystery from './pages/Mystery';
import Videos from './pages/Videos';
import Salvation from './pages/Salvation';
import Testimony from './pages/Testimony';
import BibleStudies from './pages/BibleStudies';
import Library from './pages/Library';
import Contact from './pages/Contact';
import LiveStudy from './pages/LiveStudy';
import { motion, AnimatePresence } from 'motion/react';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/salvation" element={<Salvation />} />
                <Route path="/testimony" element={<Testimony />} />
                <Route path="/mystery" element={<Mystery />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/studies" element={<BibleStudies />} />
                <Route path="/library" element={<Library />} />
                <Route path="/live-study" element={<LiveStudy />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
