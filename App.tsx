import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { RiskDashboard } from './components/RiskDashboard';
import { RouteData, AnalysisResult, FormState } from './types';
import { analyzeRouteRisk } from './services/geminiService';
import { Globe, ShieldCheck, Cpu } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<FormState>({
    data: {} as RouteData,
    isLoading: false,
    result: null,
    error: null,
  });

  const handleRouteSubmit = async (data: RouteData) => {
    setState(prev => ({ ...prev, data, isLoading: true, error: null, result: null }));
    
    try {
      const result = await analyzeRouteRisk(data);
      setState(prev => ({ ...prev, isLoading: false, result }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message || "An unexpected error occurred." 
      }));
    }
  };

  const handleReset = () => {
    setState({
      data: {} as RouteData,
      isLoading: false,
      result: null,
      error: null
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-12">
      {/* Navigation / Header */}
      <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              LogiRisk AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
             <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <ShieldCheck className="h-4 w-4" /> Risk Analysis
             </div>
             <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <Cpu className="h-4 w-4" /> Prediction Engine
             </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {state.error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center justify-between animate-fade-in">
            <span>{state.error}</span>
            <button onClick={() => setState(s => ({...s, error: null}))} className="text-sm underline hover:text-red-300">Dismiss</button>
          </div>
        )}

        {!state.result ? (
           <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
              <div className="text-center mb-10 max-w-2xl">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                   Intelligent Logistics <br/>
                   <span className="text-blue-500">Risk Prediction</span>
                 </h1>
                 <p className="text-slate-400 text-lg">
                   Leverage AI to analyze global shipping routes, predict delays, and discover the safest transportation strategies in seconds.
                 </p>
              </div>
              <InputForm onSubmit={handleRouteSubmit} isLoading={state.isLoading} />
           </div>
        ) : (
          <RiskDashboard 
            result={state.result} 
            routeData={state.data} 
            onReset={handleReset} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} LogiRisk AI Platform. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
}