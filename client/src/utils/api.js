// client/src/utils/api.js
import axios from 'axios'; // This line causes the error because axios is not installed

const API_URL = 'http://localhost:3001/api';

export const fetchRecommendations = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/recommend`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.data || response.data.length === 0) {
      throw new Error('No recommendations found');
    }
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('No suitable GPU instances found for your criteria');
    }
    throw new Error(error.response?.data?.messages || 'Failed to fetch recommendations');
  }
};