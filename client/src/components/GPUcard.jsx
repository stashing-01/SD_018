import React from 'react';
import { Check } from 'lucide-react';

export default function GPUCard({ gpu, onRequest, success }) {
  return (
    <div className="border p-4 rounded-md shadow-sm bg-white">
      <h3 className="text-lg font-bold mb-1">{gpu.resource_class}</h3>
      <p className="text-gray-700">{gpu.gpu_description}</p>
      <p className="text-gray-500 text-sm mb-2">{gpu.explanation}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-indigo-700 font-semibold">${gpu.price_per_month}/month</span>
        <button onClick={() => onRequest(gpu)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md">
          Request Access
        </button>
      </div>
      {success === gpu.resource_class && (
        <div className="text-green-600 text-sm mt-2 flex items-center">
          <Check className="h-4 w-4 mr-1" /> Request sent!
        </div>
      )}
    </div>
  );
}
