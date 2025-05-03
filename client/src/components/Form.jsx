import React from 'react';

export default function Form({ formData, handleInputChange, handleSubmit, isLoading }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Workload Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Model Type</label>
          <select name="modelType" value={formData.modelType} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="">Select Model Type</option>
            <option value="llm">Large Language Model (LLM)</option>
            <option value="vision">Computer Vision</option>
            <option value="diffusion">Diffusion Model</option>
            <option value="multimodal">Multimodal</option>
            <option value="other">Other</option>
          </select>
        </div>
        {/* Dataset Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dataset Size</label>
          <select name="datasetSize" value={formData.datasetSize} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="">Select Dataset Size</option>
            <option value="small">Small (&lt; 10 GB)</option>
            <option value="medium">Medium (10-100 GB)</option>
            <option value="large">Large (100 GB - 1 TB)</option>
            <option value="xlarge">Extra Large (&gt; 1 TB)</option>
          </select>
        </div>
        {/* Workload Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Workload Type</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input type="radio" name="workloadType" value="training" checked={formData.workloadType === 'training'} onChange={handleInputChange} />
              <span className="ml-2">Training</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="workloadType" value="inference" checked={formData.workloadType === 'inference'} onChange={handleInputChange} />
              <span className="ml-2">Inference</span>
            </label>
          </div>
        </div>
        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget (USD)</label>
          <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} placeholder="e.g., 2000" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        {/* Region */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Region</label>
          <select name="region" value={formData.region} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="">Select Region</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="europe">Europe</option>
          </select>
        </div>
      </div>
      <button onClick={handleSubmit} className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Recommendations'}
      </button>
    </div>
  );
}
