import React from 'react';
import { AnalysisResult, RiskLevel, RouteData } from '../types';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  CheckCircle2, 
  Map, 
  Clock, 
  Anchor, 
  ArrowRight,
  ShieldAlert,
  Lightbulb
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface RiskDashboardProps {
  result: AnalysisResult;
  routeData: RouteData;
  onReset: () => void;
}

export const RiskDashboard: React.FC<RiskDashboardProps> = ({ result, routeData, onReset }) => {
  
  const getRiskColor = (level: RiskLevel) => {
    switch(level) {
      case RiskLevel.LOW: return '#10b981'; // emerald-500
      case RiskLevel.MEDIUM: return '#f59e0b'; // amber-500
      case RiskLevel.HIGH: return '#ef4444'; // red-500
      default: return '#64748b';
    }
  };

  const getRiskBg = (level: RiskLevel) => {
    switch(level) {
      case RiskLevel.LOW: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'; 
      case RiskLevel.MEDIUM: return 'bg-amber-500/10 text-amber-400 border-amber-500/20'; 
      case RiskLevel.HIGH: return 'bg-red-500/10 text-red-400 border-red-500/20'; 
      default: return 'bg-slate-700';
    }
  };

  const riskData = [
    { name: 'Risk', value: result.riskScore },
    { name: 'Safety', value: 10 - result.riskScore }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header Bar */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
             <Map className="h-4 w-4" />
             <span>{routeData.originCountry} ({routeData.originPort})</span>
             <ArrowRight className="h-3 w-3" />
             <span>{routeData.destCountry} ({routeData.destPort})</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Route Analysis Report</h1>
          <p className="text-slate-400 text-sm mt-1">Generated for: <span className="text-blue-400 font-medium">{routeData.userRole}</span></p>
        </div>
        <button 
          onClick={onReset}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors border border-slate-600 text-sm font-medium"
        >
          Analyze Another Route
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Key Metrics */}
        <div className="space-y-6">
          
          {/* Risk Score Card */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
            <h3 className="text-slate-400 text-sm font-semibold uppercase mb-4">Overall Risk Score</h3>
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="80%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill={getRiskColor(result.riskLevel)} />
                    <Cell fill="#334155" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className={`text-4xl font-bold block`} style={{ color: getRiskColor(result.riskLevel) }}>
                  {result.riskScore}/10
                </span>
                <span className={`text-sm font-medium px-2 py-0.5 rounded ${getRiskBg(result.riskLevel)}`}>
                  {result.riskLevel} Risk
                </span>
              </div>
            </div>
            
            <div className="mt-2 pt-4 border-t border-slate-700 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-slate-400 text-xs uppercase">Delay Probability</p>
                <p className="text-2xl font-bold text-white mt-1">{result.delayProbability}%</p>
              </div>
              <div className="text-center">
                <p className="text-slate-400 text-xs uppercase">Risk Trend</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {result.riskTrend === 'Increasing' && <TrendingUp className="h-5 w-5 text-red-400" />}
                  {result.riskTrend === 'Decreasing' && <TrendingDown className="h-5 w-5 text-emerald-400" />}
                  {result.riskTrend === 'Stable' && <Minus className="h-5 w-5 text-blue-400" />}
                  <span className="text-lg font-bold text-white">{result.riskTrend}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Insights */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
             <h3 className="text-blue-400 text-sm font-semibold uppercase mb-4 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Recommended Actions
             </h3>
             <ul className="space-y-3">
               {result.actionableInsights.map((insight, idx) => (
                 <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{insight}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Center & Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Executive Summary & Explanation */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
            <h3 className="text-slate-100 font-bold text-lg mb-2">Executive Summary</h3>
            <p className="text-slate-300 leading-relaxed mb-4">{result.executiveSummary}</p>
            
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700">
              <h4 className="text-sm font-semibold text-slate-400 mb-2 uppercase">Analysis for {routeData.userRole}</h4>
              <p className="text-slate-300 text-sm italic">"{result.plainLanguageExplanation}"</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Identified Risks */}
             <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
                <h3 className="text-red-400 text-sm font-semibold uppercase mb-4 flex items-center gap-2">
                   <ShieldAlert className="h-4 w-4" /> Key Risk Factors
                </h3>
                <ul className="space-y-2">
                   {result.riskFactors.map((factor, idx) => (
                     <li key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-700/40 text-sm text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                        {factor}
                     </li>
                   ))}
                </ul>
             </div>

             {/* Recommendation Highlight */}
             <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-6 border border-indigo-500/30 shadow-lg">
                <h3 className="text-indigo-300 text-sm font-semibold uppercase mb-2">Best Strategic Option</h3>
                <p className="text-xl font-bold text-white mb-2">{result.recommendedOption.name}</p>
                <p className="text-indigo-200 text-sm opacity-90">{result.recommendedOption.reason}</p>
             </div>
          </div>

          {/* Alternatives Table */}
          <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
            <div className="p-4 bg-slate-700/50 border-b border-slate-600">
               <h3 className="text-white font-semibold flex items-center gap-2">
                 <Anchor className="h-4 w-4 text-blue-400" /> Route Alternatives
               </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-3">Route / Strategy</th>
                    <th className="px-6 py-3">Time Impact</th>
                    <th className="px-6 py-3">Cost Impact</th>
                    <th className="px-6 py-3">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {result.alternatives.map((alt, idx) => (
                    <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">
                        {alt.name}
                        <div className="text-xs text-slate-500 font-normal mt-0.5">{alt.description}</div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`inline-flex items-center gap-1 ${alt.timeImpact.toLowerCase().includes('faster') ? 'text-emerald-400' : 'text-slate-300'}`}>
                           <Clock className="h-3 w-3" /> {alt.timeImpact}
                         </span>
                      </td>
                      <td className="px-6 py-4">{alt.costImpact}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskBg(alt.riskLevel as RiskLevel)}`}>
                          {alt.riskLevel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};