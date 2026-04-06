import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mystery from './pages/Mystery';
import Videos from './pages/Videos';
import Gospel from './pages/Gospel';
import BibleStudies from './pages/BibleStudies';
import Library from './pages/Library';
import StudyCenter from './pages/StudyCenter';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import Links from './pages/Links';
import MessageBoard from './pages/MessageBoard';
import BaptismStudy from './pages/BaptismStudy';
import ProphecyMysteryStudy from './pages/ProphecyMysteryStudy';
import { motion, AnimatePresence } from 'framer-motion';
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
                <Route path="/gospel" element={<Gospel />} />
                <Route path="/salvation" element={<Gospel />} />
                <Route path="/testimony" element={<Gospel />} />
                <Route path="/mystery" element={<Mystery />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/studies" element={<BibleStudies />} />
                <Route path="/baptism-study" element={<BaptismStudy />} />
                <Route path="/prophecy-mystery-study" element={<ProphecyMysteryStudy />} />
                <Route path="/study-center" element={<StudyCenter />} />
                <Route path="/asking" element={<StudyCenter />} />
                <Route path="/library" element={<Library />} />
                <Route path="/search" element={<StudyCenter />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/live-study" element={<StudyCenter />} />
                <Route path="/links" element={<Links />} />
                <Route path="/community" element={<MessageBoard />} />
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
