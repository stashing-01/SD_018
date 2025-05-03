// frontend/src/components/WorkloadForm.jsx
import React, { useState } from 'react';

function WorkloadForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    modelType: '',
    datasetSize: '',
    task: 'training',
    budget: '',
    region: 'ap-south-mum-1',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.modelType || !formData.datasetSize || !formData.budget) {
      setError('Please fill all required fields');
      return;
    }
    setError('');
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Model Type:
        <input
          value={formData.modelType}
          onChange={(e) => setFormData({ ...formData, modelType: e.target.value })}
          required
        />
      </label>
      <label>
        Dataset Size (GB):
        <input
          type="number"
          value={formData.datasetSize}
          onChange={(e) => setFormData({ ...formData, datasetSize: e.target.value })}
          required
        />
      </label>
      <label>
        Task:
        <select
          value={formData.task}
          onChange={(e) => setFormData({ ...formData, task: e.target.value })}
        >
          <option value="training">Training</option>
          <option value="inference">Inference</option>
        </select>
      </label>
      <label>
        Budget ($/month):
        <input
          type="number"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          required
        />
      </label>
      <label>
        Region:
        <select
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
        >
          <option value="ap-south-mum-1">Mumbai</option>
          <option value="us-east-at-1">US East</option>
          <option value="ap-south-del-1">Delhi</option>
          <option value="ap-south-noi-1">Noida</option>
        </select>
      </label>
      <button type="submit">Get Recommendations</button>
    </form>
  );
}

export default WorkloadForm;