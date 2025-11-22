import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzeResume } from '../services/gemini';

const steps = [
  "Reading document structure...",
  "Extracting skills & experience...",
  "Comparing against job description...",
  "Calculating ATS score...",
  "Generating actionable insights..."
];

const Analysis: React.FC = () => {
  const navigate = useNavigate();
  const { resumeFile, jobDescription, setAnalysis, setIsAnalyzing } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Convert file to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove Data URL prefix (e.g. "data:application/pdf;base64,")
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  useEffect(() => {
    if (!resumeFile) {
      navigate('/upload');
      return;
    }

    let isMounted = true;
    setIsAnalyzing(true);

    const runAnalysis = async () => {
      try {
        // Animate steps artificially for better UX (users trust slow AI more)
        const stepInterval = setInterval(() => {
          setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 1500);

        const base64 = await fileToBase64(resumeFile);
        // Pass mimeType specifically
        const result = await analyzeResume(base64, resumeFile.type, jobDescription);
        
        clearInterval(stepInterval);

        if (isMounted) {
          setAnalysis(result);
          setIsAnalyzing(false);
          // Small delay to show the final step
          setTimeout(() => navigate('/results'), 500);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Analysis failed. Please ensure your API key is valid and try again.");
        setIsAnalyzing(false);
      }
    };

    runAnalysis();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-brand-dark relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      <div className="max-w-md w-full z-10">
        {error ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-500/10 border border-red-500/50 p-6 rounded-xl text-center"
          >
            <h3 className="text-red-400 font-bold text-xl mb-2">Error</h3>
            <p className="text-gray-300 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/upload')}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Try Again
            </button>
          </motion.div>
        ) : (
          <>
            <div className="flex justify-center mb-8 relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-full border-4 border-brand-soft border-t-brand-blue" />
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Analyzing your profile...
            </h2>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: index <= currentStep ? 1 : 0.3,
                    x: 0,
                    scale: index === currentStep ? 1.02 : 1
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    index === currentStep 
                      ? 'bg-brand-blue/10 border-brand-blue/30 text-white' 
                      : index < currentStep 
                        ? 'bg-green-500/5 border-green-500/20 text-gray-300'
                        : 'bg-transparent border-transparent text-gray-600'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className={`w-5 h-5 rounded-full border-2 ${index === currentStep ? 'border-brand-blue border-t-transparent animate-spin' : 'border-gray-700'}`} />
                  )}
                  <span className="text-sm font-medium">{step}</span>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analysis;