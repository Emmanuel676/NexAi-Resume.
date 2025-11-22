import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, X, ArrowRight } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';

const Results: React.FC = () => {
  const { analysis } = useApp();
  const navigate = useNavigate();

  if (!analysis) {
    // Redirect if no data (e.g. refresh)
    React.useEffect(() => { navigate('/upload'); }, [navigate]);
    return null;
  }

  const matchData = [
    { name: 'Match', value: analysis.matchScore },
    { name: 'Gap', value: 100 - analysis.matchScore },
  ];

  const atsData = [
    { name: 'Score', value: analysis.atsScore, fill: analysis.atsScore > 70 ? '#22c55e' : '#eab308' },
  ];

  const COLORS = ['#3B82F6', '#1E293B'];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Analysis Report</h1>
            <p className="text-gray-400 mt-1">Role: <span className="text-brand-accent">{analysis.jobTitleDetected || "Candidate"}</span></p>
          </div>
          <div className="flex gap-3">
            <button 
               onClick={() => navigate('/rewrite')}
               className="bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg shadow-brand-blue/20 flex items-center gap-2"
            >
              Rewrite Résumé <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </motion.div>

        {/* Top Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnimatedCard className="flex flex-col items-center justify-center">
            <h3 className="text-gray-400 font-medium mb-4">Job Match Score</h3>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={matchData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {matchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-3xl font-bold">
                    {analysis.matchScore}%
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.1} className="flex flex-col items-center justify-center">
            <h3 className="text-gray-400 font-medium mb-4">ATS Compatibility</h3>
             <div className="h-40 w-full flex items-end justify-center pb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={atsData}>
                     <XAxis dataKey="name" hide />
                     <YAxis domain={[0, 100]} hide />
                     <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#fff' }}
                     />
                     <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
                        <Cell fill={analysis.atsScore > 75 ? '#3B82F6' : analysis.atsScore > 50 ? '#FACC15' : '#EF4444'} />
                     </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
             <p className="text-2xl font-bold text-white">{analysis.atsScore}/100</p>
          </AnimatedCard>

          <AnimatedCard delay={0.2} className="col-span-1 flex flex-col justify-center">
             <h3 className="text-gray-400 font-medium mb-2">Professional Summary</h3>
             <p className="text-sm text-gray-300 leading-relaxed italic border-l-4 border-brand-blue pl-4">
                "{analysis.summary}"
             </p>
          </AnimatedCard>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <AnimatedCard delay={0.3}>
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-bold text-white">Skills Matched</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.skillsFound.map((skill, i) => (
                <span key={i} className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.4}>
             <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-bold text-white">Missing Keywords</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.missingSkills.map((skill, i) => (
                <span key={i} className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </AnimatedCard>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <AnimatedCard delay={0.5}>
              <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Strengths</h3>
              <ul className="space-y-3">
                 {analysis.strengths.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                       <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-brand-blue" />
                       {item}
                    </li>
                 ))}
              </ul>
           </AnimatedCard>
           <AnimatedCard delay={0.6}>
              <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Areas for Improvement</h3>
              <ul className="space-y-3">
                 {analysis.weaknesses.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                       <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-red-500" />
                       {item}
                    </li>
                 ))}
              </ul>
           </AnimatedCard>
        </div>

      </div>
    </div>
  );
};

export default Results;