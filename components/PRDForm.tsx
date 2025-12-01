import React, { useState } from 'react';
import { PRDInputs } from '../types';
import { AlertCircle, Wand2, ArrowLeft } from 'lucide-react';

interface PRDFormProps {
  onSubmit: (data: PRDInputs) => void;
  initialData?: PRDInputs;
  onBack: () => void;
  isLoading: boolean;
}

const PRDForm: React.FC<PRDFormProps> = ({ onSubmit, initialData, onBack, isLoading }) => {
  const [formData, setFormData] = useState<PRDInputs>(initialData || {
    featureName: '',
    pmName: '',
    productContext: '',
    problemStatement: '',
    targetUsers: '',
    objectives: '',
    constraints: '',
    successMetrics: '',
    requirements: '',
    additionalNotes: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error if user starts typing in a required field that was missing
    if (error && ['featureName', 'pmName', 'productContext', 'problemStatement'].includes(name) && value.trim() !== '') {
        setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (
      !formData.featureName.trim() ||
      !formData.pmName.trim() ||
      !formData.productContext.trim() ||
      !formData.problemStatement.trim()
    ) {
      setError('Please fill all required fields before generating your PRD.');
      return;
    }

    setError(null);
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center text-slate-500 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Feature Details</h2>
            <p className="text-indigo-100 mt-1">Tell us about what you're building.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Mandatory Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Mandatory Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Feature Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="featureName"
                    value={formData.featureName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="e.g., Dark Mode"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Product Manager Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pmName"
                    value={formData.pmName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="e.g., Jane Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Product Context <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="productContext"
                  value={formData.productContext}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Describe the product and where this feature fits in."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Problem Statement <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="problemStatement"
                  value={formData.problemStatement}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="What user problem are we solving?"
                />
              </div>
            </div>

            {/* Optional Section */}
            <div className="space-y-6 pt-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold text-slate-900">Optional Details</h3>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">AI will auto-fill if empty</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Target Users / Personas</label>
                  <textarea
                    name="targetUsers"
                    value={formData.targetUsers}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Who is this for?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Objectives / Goals</label>
                  <textarea
                    name="objectives"
                    value={formData.objectives}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="What do we want to achieve?"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Constraints</label>
                  <textarea
                    name="constraints"
                    value={formData.constraints}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Technical or resource limits"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Success Metrics</label>
                  <textarea
                    name="successMetrics"
                    value={formData.successMetrics}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="KPIs to measure success"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Specific Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Any specific functional requirements known upfront?"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Anything else?"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  flex items-center px-8 py-3 rounded-lg text-white font-bold text-lg shadow-lg transition
                  ${isLoading 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transform hover:-translate-y-0.5'
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating PRD...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate PRD
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PRDForm;