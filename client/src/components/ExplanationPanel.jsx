// frontend/src/components/ExplanationPanel.jsx
import React from 'react';

function ExplanationPanel({ recommendation }) {
  return (
    <div>
      <h3>Why {recommendation.gpu_description}?</h3>
      <p>{recommendation.explanation}</p>
    </div>
  );
}

export default ExplanationPanel;