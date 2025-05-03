// frontend/src/pages/App.jsx
import React, { useState } from 'react';
import WorkloadForm from '../components/WorkloadForm';
import { fetchRecommendations } from '../utils/api';
import '../styles/App.css';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetchRecommendations(formData);
      setRecommendations(response.data);
      setError('');
    } catch (error) {
      setError(error.response?.data?.messages || 'Error fetching recommendations');
    }
  };

  return (
    <div>
      <h1>GPU Cost Optimizer</h1>
      <WorkloadForm onSubmit={handleFormSubmit} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {recommendations.length > 0 && (
        <div>
          <h2>Recommendations</h2>
          {recommendations.map((rec, index) => (
            <div key={index}>
              <p>GPU: {rec.gpu_description}</p>
              <p>Price: ${rec.price_per_hour}/hr</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;