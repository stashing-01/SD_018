import axios from 'axios';

export const fetchGPUData = async (regionCode) => {
  const response = await axios.get('https://customer.acecloudhosting.com/api/v1/pricing', {
    params: {
      is_gpu: true,
      resource: 'instances',
      region: regionCode
    }
  });
  return response.data;
};

export const getRegionCode = (region) => {
  const regionMap = {
    'india': 'ap-south-mum-1',
    'usa': 'us-east-1',
    'europe': 'eu-central-1'
  };
  return regionMap[region] || 'ap-south-mum-1';
};
