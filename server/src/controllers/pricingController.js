// backend/src/controllers/pricingController.js
const { fetchGpuPricing } = require('../utils/apiClient');
const fs = require('fs');
const mockData = JSON.parse(fs.readFileSync('./src/data/mock-pricing.json'));

exports.getPricing = async (req, res) => {
  try {
    const region = req.query.region || 'ap-south-mum-1';
    const data = await fetchGpuPricing(region);
    const validInstances = data.filter(
      (instance) => instance.price_per_hour > 0 && instance.price_per_month > 0
    );
    if (!validInstances.length) {
      return res.status(404).json({ error: 'No valid GPU instances found' });
    }
    res.json(validInstances);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: true,
      messages: error.response?.data?.messages || 'Failed to fetch GPU pricing',
    });
  }
};