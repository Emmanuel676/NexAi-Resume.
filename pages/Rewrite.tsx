import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { rewriteSection } from '../services/gemini';
import { motion } from 'framer-motion';
import { RefreshCw, Copy, ArrowRight, Check } from 'lucide-react';

const Rewrite: React.FC = () => {
  const { analysis } = useApp();
  const [inputText, setInputText] = useState("");
  const [rewrittenText, setRewrittenText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRewrite = async () => {
    if (!inputText) return;
    setIsLoading(true);
    try {
       const result = await rewriteSection(
         inputText, 
         "Make it punchy, results-oriented, and use strong action verbs."
       );
       setRewrittenText(result);
    } catch (e) {
       console.error(e);
    } finally {
       setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-brand-dark">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">AI Résumé Rewriter</h1>
          <p className="text-gray-400">Paste a bullet point or section below to optimize it instantly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Side */}
          <div className="bg-brand-soft p-6 rounded-xl border border-slate-700">
            <label className="block text-sm font-bold text-white mb-4">Original Text</label>
            <textarea
              className="w-full h-64 bg-brand-dark border border-slate-600 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue resize-none"
              placeholder="Paste a resume bullet point here... e.g. 'Responsible for sales management'"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={handleRewrite}
              disabled={isLoading || !inputText}
              className="mt-4 w-full bg-brand-blue disabled:opacity-50 hover:bg-brand-blue/90 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
            >
               {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
               {isLoading ? "Optimizing..." : "Rewrite with AI"}
            </button>
          </div>

          {/* Output Side */}
          <div className="bg-brand-soft p-6 rounded-xl border border-slate-700 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 z-10">
                {rewrittenText && (
                   <button 
                     onClick={handleCopy}
                     className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition"
                     title="Copy to clipboard"
                   >
                      {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                   </button>
                )}
             </div>
             <label className="block text-sm font-bold text-brand-blue mb-4">Optimized Version</label>
             <div className="w-full h-64 bg-brand-dark/50 border border-slate-600/50 rounded-lg p-4 text-gray-300 overflow-y-auto">
               {rewrittenText ? (
                 <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre-wrap leading-relaxed"
                 >
                   {rewrittenText}
                 </motion.p>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-gray-600">
                    <ArrowRight className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-sm">Result will appear here</p>
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Suggestions based on analysis */}
        {analysis && analysis.weaknesses.length > 0 && (
           <div className="mt-12">
              <h3 className="text-xl font-bold text-white mb-4">Suggestions from your analysis</h3>
              <div className="grid gap-3">
                 {analysis.weaknesses.slice(0, 3).map((weakness, idx) => (
                    <div key={idx} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
                       <span className="text-gray-300 text-sm">{weakness}</span>
                       <button 
                         onClick={() => setInputText(`Rewrite this to address: ${weakness}`)}
                         className="text-brand-blue text-xs hover:underline"
                       >
                          Fix this
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default Rewrite;