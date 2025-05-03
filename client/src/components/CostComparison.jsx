// frontend/src/components/CostComparison.jsx
import React from 'react';
import ExplanationPanel from './ExplanationPanel';

function CostComparison({ recommendations }) {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {recommendations.map((rec, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
          <h3>{rec.gpu_description}</h3>
          <p>vCPUs: {rec.vcpus}</p>
          <p>RAM: {rec.ram}GB</p>
          <p>Hourly: ${rec.price_per_hour}</p>
          <p>Monthly: ${rec.price_per_month}</p>
          <p>Spot: ${rec.price_per_spot}</p>
          {rec.price_per_hour === 0 ? (
            <button onClick={() => alert('Your request has been submitted.')}>
              Request
            </button>
          ) : null}
          {/* Add ExplanationPanel here */}
          <ExplanationPanel recommendation={rec} />
        </div>
      ))}
    </div>
  );
}

export default CostComparison;