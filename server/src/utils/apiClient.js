// backend/src/utils/apiClient.js
const axios = require('axios');

exports.fetchGpuPricing = async (region) => {
  try {
    const response = await axios.get('https://customer.acecloudhosting.com/api/v1/pricing', {
      params: { is_gpu: 'true', resource: 'instances', region },
      timeout: 5000,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};