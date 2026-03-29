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
import Asking from './pages/Asking';
import Contact from './pages/Contact';
import LiveStudy from './pages/LiveStudy';
import Links from './pages/Links';
import BaptismStudy from './pages/BaptismStudy';
import ProphecyMysteryStudy from './pages/ProphecyMysteryStudy';
import { motion, AnimatePresence } from 'motion/react';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
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
                <Route path="/baptism-study" element={<BaptismStudy />} />
                <Route path="/prophecy-mystery-study" element={<ProphecyMysteryStudy />} />
                <Route path="/asking" element={<Asking />} />
                <Route path="/library" element={<Library />} />
                <Route path="/live-study" element={<LiveStudy />} />
                <Route path="/links" element={<Links />} />
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
