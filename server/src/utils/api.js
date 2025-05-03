// frontend/src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchRecommendations = async (data) => {
  return axios.post(`${API_URL}/recommend`, data);
};