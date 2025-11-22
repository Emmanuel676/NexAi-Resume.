import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, AnalysisResult } from '../types';

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        resumeFile,
        resumeText,
        jobDescription,
        analysis,
        isAnalyzing,
        setResumeFile,
        setResumeText,
        setJobDescription,
        setAnalysis,
        setIsAnalyzing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};