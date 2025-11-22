import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';

import Layout from './components/Layout';
import Landing from './pages/Landing';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import Results from './pages/Results';
import Rewrite from './pages/Rewrite';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/results" element={<Results />} />
        <Route path="/rewrite" element={<Rewrite />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;