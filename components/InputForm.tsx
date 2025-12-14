import React, { useState } from 'react';
import { RouteData, TransportMode, UserRole } from '../types';
import { Ship, Plane, Truck, Calendar, MapPin, Box, UserCircle } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: RouteData) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<RouteData>({
    originCountry: '',
    originPort: '',
    destCountry: '',
    destPort: '',
    transportMode: TransportMode.SEA,
    cargoType: '',
    shipmentDate: new Date().toISOString().split('T')[0],
    userRole: UserRole.LOGISTICS_MANAGER,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Ship className="h-6 w-6 text-blue-400" />
          Route Configuration
        </h2>
        <p className="text-slate-400 mt-1">Enter shipment details for AI risk prediction</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Origin Section */}
        <div className="space-y-4">
          <h3 className="text-blue-400 font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Origin
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Country</label>
              <input
                required
                type="text"
                name="originCountry"
                value={formData.originCountry}
                onChange={handleChange}
                placeholder="e.g. China"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Port / City</label>
              <input
                required
                type="text"
                name="originPort"
                value={formData.originPort}
                onChange={handleChange}
                placeholder="e.g. Shanghai"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Destination Section */}
        <div className="space-y-4">
          <h3 className="text-teal-400 font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Destination
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Country</label>
              <input
                required
                type="text"
                name="destCountry"
                value={formData.destCountry}
                onChange={handleChange}
                placeholder="e.g. USA"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none placeholder:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Port / City</label>
              <input
                required
                type="text"
                name="destPort"
                value={formData.destPort}
                onChange={handleChange}
                placeholder="e.g. Long Beach"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="space-y-4 md:col-span-2 pt-4 border-t border-slate-700">
           <h3 className="text-purple-400 font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
            <Box className="h-4 w-4" /> Shipment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="block text-sm text-slate-400 mb-1">Transport Mode</label>
              <div className="relative">
                <select
                  name="transportMode"
                  value={formData.transportMode}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none appearance-none"
                >
                  <option value={TransportMode.SEA}>Sea Freight</option>
                  <option value={TransportMode.AIR}>Air Freight</option>
                  <option value={TransportMode.LAND}>Land / Rail</option>
                </select>
                <div className="absolute right-3 top-2.5 pointer-events-none text-slate-400">
                  {formData.transportMode === TransportMode.SEA && <Ship className="h-5 w-5" />}
                  {formData.transportMode === TransportMode.AIR && <Plane className="h-5 w-5" />}
                  {formData.transportMode === TransportMode.LAND && <Truck className="h-5 w-5" />}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Cargo Type</label>
              <input
                required
                type="text"
                name="cargoType"
                value={formData.cargoType}
                onChange={handleChange}
                placeholder="e.g. Electronics, Perishables"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Estimated Date</label>
              <div className="relative">
                <input
                  required
                  type="date"
                  name="shipmentDate"
                  value={formData.shipmentDate}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

             <div>
              <label className="block text-sm text-slate-400 mb-1">Your Role</label>
              <div className="relative">
                <select
                  name="userRole"
                  value={formData.userRole}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none appearance-none"
                >
                  <option value={UserRole.LOGISTICS_MANAGER}>Logistics Manager / Forwarder</option>
                  <option value={UserRole.IMPORTER_EXPORTER}>Importer / Exporter</option>
                </select>
                <UserCircle className="absolute right-3 top-2.5 h-5 w-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-lg font-bold text-lg tracking-wide shadow-lg transition-all transform hover:-translate-y-0.5
              ${isLoading 
                ? 'bg-slate-600 cursor-not-allowed text-slate-400' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-900/50'
              }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Global Routes...
              </span>
            ) : (
              'Analyze Risks & Predict Delays'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};