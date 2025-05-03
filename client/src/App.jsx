// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import GPUCard from './components/GPUcard';
import Assistant from './components/Assistant';
import { fetchGPUData, getRegionCode } from './utils/api';
import { generateRecommendations, generateExplanation } from './utils/filter';

export default function App() {
  const [formData, setFormData] = useState({
    modelType: '',
    datasetSize: '',
    workloadType: '',
    budget: '',
    region: ''
  });
  const [apiData, setApiData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const regionCode = getRegionCode(formData.region);
    try {
      const data = await fetchGPUData(regionCode);
      setApiData(data);
      const filtered = generateRecommendations(formData, data, getRegionCode, generateExplanation);
      setRecommendations(filtered);
    } catch (err) {
      console.error('Error fetching data', err);
    }
    setIsLoading(false);
  };

  const handleRequestAccess = (gpu) => {
    setSuccess(gpu.resource_class);
    console.log('Request sent for:', gpu);
  };

  const handleAssistantSubmit = () => {
    setIsStreaming(true);
    setTimeout(() => {
      const reply = `Here's some advice about: "${assistantInput}"... (placeholder)`;
      setAssistantResponse(reply);
      setIsStreaming(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <Form
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((gpu, idx) => (
              <GPUCard
                key={idx}
                gpu={gpu}
                onRequest={handleRequestAccess}
                success={success}
              />
            ))}
          </div>
        )}

        <Assistant
          assistantInput={assistantInput}
          assistantResponse={assistantResponse}
          setAssistantInput={setAssistantInput}
          handleAssistantSubmit={handleAssistantSubmit}
          isStreaming={isStreaming}
        />
      </main>
    </div>
  );
}
