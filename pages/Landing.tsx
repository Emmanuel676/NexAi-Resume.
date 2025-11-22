import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, CheckCircle, UploadCloud, BarChart2 } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';

const Landing: React.FC = () => {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(heroTextRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subTextRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Background Gradient Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1 mb-6 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-semibold">
            Powered by Google Gemini 2.5 Flash
          </div>
          
          <h1 ref={heroTextRef} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
            Is your Résumé <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-accent">
              ATS Ready?
            </span>
          </h1>
          
          <p ref={subTextRef} className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Get a detailed AI analysis, beat the applicant tracking systems, and land your dream job with data-driven insights.
          </p>
          
          <div ref={ctaRef} className="flex justify-center gap-4">
            <Link to="/upload" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-brand-blue px-8 font-medium text-white transition-all duration-300 hover:bg-brand-blue/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-gray-900">
              <span className="mr-2">Analyze My Résumé</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 -z-10 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-brand-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard delay={0.1}>
              <div className="h-12 w-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                <UploadCloud className="w-6 h-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Parsing</h3>
              <p className="text-gray-400">Drag & drop PDF or DOCX files. Our AI extracts experience, skills, and education instantly.</p>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <div className="h-12 w-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                <BarChart2 className="w-6 h-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">ATS Scoring</h3>
              <p className="text-gray-400">See exactly how algorithms view your profile with a precise match score against any job description.</p>
            </AnimatedCard>

            <AnimatedCard delay={0.5}>
              <div className="h-12 w-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Rewrites</h3>
              <p className="text-gray-400">One-click improvements for your summary and bullet points to increase impact.</p>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;