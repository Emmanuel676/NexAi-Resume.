import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-soft py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} NexResume AI. Powered by Google Gemini 2.5 Flash.
        </p>
      </div>
    </footer>
  );
};

export default Footer;