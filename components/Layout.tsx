import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Hide Navbar/Footer on analysis page for immersion
  const isAnalysis = location.pathname === '/analysis';

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark text-white">
      {!isAnalysis && <Navbar />}
      <main className="flex-grow relative">
        {children}
      </main>
      {!isAnalysis && <Footer />}
    </div>
  );
};

export default Layout;