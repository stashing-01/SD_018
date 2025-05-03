// client/src/utils/api.js
import axios from 'axios'; // This line causes the error because axios is not installed

const API_URL = 'http://localhost:3001/api';

export const fetchRecommendations = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/recommend`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.messages || 'Failed to fetch recommendations');
  }
};