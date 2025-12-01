import React from 'react';
import { FileText, Zap, Layout, CheckCircle } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onSample: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onSample }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-12 text-center">
        
        {/* Header Section */}
        <div className="space-y-6">
          <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            AI PRD Maker
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
            Create stakeholder-ready Product Requirements Documents in minutes, not hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Create PRD
            </button>
            <button
              onClick={onSample}
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg border border-indigo-200 hover:bg-indigo-50 transition shadow-sm flex items-center justify-center gap-2"
            >
              <Layout className="w-5 h-5" />
              Try a Sample
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              How It Works
            </h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="font-medium text-slate-900">1.</span> Enter product details in the form
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-slate-900">2.</span> AI generates structure & content
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-slate-900">3.</span> Preview formatted document
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-slate-900">4.</span> Download as PDF
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              Why Use It?
            </h3>
             <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-semibold">Speed</span>
                Saves 80% of drafting time
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-semibold">Quality</span>
                Standardizes docs across teams
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-semibold">Clarity</span>
                Includes personas & KPIs automatically
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Hero;