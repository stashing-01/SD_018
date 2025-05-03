// frontend/src/pages/App.jsx
import React, { useState } from 'react';
import WorkloadForm from './components/WorkloadForm';
import CostComparison from './components/CostComparison';
import { fetchRecommendations } from './utils/api';
import './styles/App.css';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    setRecommendations([]);
    try {
      // const response = await fetchRecommendations(formData);
      // setRecommendations(response.data);
      // setError('');
      const data = await fetchRecommendations(formData);
      setRecommendations(data || []);
    } catch (error) {
      setError(error.response?.data?.messages || 'Error fetching recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>GPU Cost Optimizer</h1>
      <WorkloadForm onSubmit={handleFormSubmit} />
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {recommendations && recommendations.length > 0 && (
        <div>
          <h2>Recommendations</h2>
          {recommendations.map((rec, index) => (
            <div key={index}>
              <p>
                [{rec.gpu_description}] [vCPUs: {rec.vcpus}] [RAM: {rec.ram}GB] [Hourly: ${rec.price_per_hour}] [Monthly: ${rec.price_per_month}]
              </p>
              <p>Why {rec.gpu_description}? {rec.explanation}</p>
            </div>
          ))}
          {/* Add CostComparison component here
          <CostComparison recommendations={recommendations} /> */}
        </div>
      )}
    </div>
  );
}

export default App;