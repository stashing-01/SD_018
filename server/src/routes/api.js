const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// GET /api/gpu-pricing: Fetch GPU pricing from AceCloud API
app.get('/api/gpu-pricing', async (req, res) => {
  try {
    const response = await axios.get(
      'https://customer.acecloudhosting.com/api/v1/pricing',
      {
        params: {
          is_gpu: true,
          resource: 'instances',
          region: req.query.region || 'us-east-at-1', // Allow region override
        },
        timeout: 5000,
      }
    );
    const validInstances = response.data.data.filter(
      (instance) => instance.price_per_hour > 0 && instance.price_per_month > 0
    );
    if (!validInstances.length) {
      return res.status(404).json({ error: 'No valid GPU instances found' });
    }
    res.json(validInstances);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.messages || 'Failed to fetch GPU pricing';
    res.status(status).json({ error: true, messages: message });
  }
});

// POST /api/recommend: Generate recommendations based on workload inputs
app.post('/api/recommend', async (req, res) => {
  const { modelType, datasetSize, task, budget, region } = req.body;
  if (!modelType || !datasetSize || !budget || !region) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!['us-east-at-1', 'ap-south-mum-1', 'ap-south-del-1', 'ap-south-noi-1'].includes(region)) {
    return res.status(400).json({ error: 'Invalid region' });
  }
  try {
    const response = await axios.get(
      'https://customer.acecloudhosting.com/api/v1/pricing',
      { params: { is_gpu: true, resource: 'instances', region }, timeout: 5000 }
    );
    let recommendations = response.data.data.filter((instance) => {
      const isBudgetMatch = instance.price_per_month <= budget;
      const isTaskMatch =
        task === 'training'
          ? ['a100', 'l40s'].includes(instance.resource_class)
          : ['a30', 'a2'].includes(instance.resource_class);
      const isDatasetMatch = datasetSize > 100 ? instance.ram >= 64 : instance.ram >= 32;
      return isBudgetMatch && isTaskMatch && isDatasetMatch;
    });
    const knowledgeBase = {
      a100: { description: 'Ideal for large batch training due to 80GB VRAM' },
      a30: { description: 'Cost-effective for inference with 24GB VRAM' },
    };
    recommendations = recommendations
      .map((rec) => ({
        ...rec,
        explanation: knowledgeBase[rec.resource_class]?.description || 'Suitable for your workload.',
      }))
      .sort((a, b) => a.price_per_hour - b.price_per_hour)
      .slice(0, 3);
    if (!recommendations.length) {
      return res.status(404).json({ error: 'No suitable GPU instances found' });
    }
    res.json(recommendations);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.messages || 'Failed to generate recommendations';
    res.status(status).json({ error: true, messages: message });
  }
});

app.listen(3001, () => console.log('Backend on port 3001'));