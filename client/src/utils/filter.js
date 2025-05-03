export const generateRecommendations = (formData, apiData, getRegionCode, generateExplanation) => {
    if (!apiData || !apiData.data) return [];
    let filtered = [...apiData.data];
  
    if (formData.region) {
      filtered = filtered.filter(gpu => gpu.region === getRegionCode(formData.region));
    }
  
    if (formData.workloadType === 'training') {
      filtered.sort((a, b) => {
        const aGB = parseInt(a.gpu_description.match(/\d+GB/)[0]);
        const bGB = parseInt(b.gpu_description.match(/\d+GB/)[0]);
        return bGB - aGB;
      });
    } else {
      filtered.sort((a, b) => a.price_per_hour - b.price_per_hour);
    }
  
    if (formData.budget) {
      filtered = filtered.filter(gpu => gpu.price_per_month <= parseFloat(formData.budget));
    }
  
    return filtered.map(gpu => ({
      ...gpu,
      explanation: generateExplanation(gpu, formData.workloadType)
    }));
  };
  
  export const generateExplanation = (gpu, workloadType) => {
    if (workloadType === 'training') {
      if (gpu.resource_class.includes('h100')) {
        return 'Recommended for large-scale training with transformers or diffusion models. Best for datasets >1TB.';
      } else if (gpu.resource_class.includes('a100')) {
        return 'Great for medium to large training jobs with good memory bandwidth.';
      } else if (gpu.resource_class.includes('a30')) {
        return 'Cost-effective for smaller training jobs.';
      }
      return 'Entry-level GPU for small models or prototyping.';
    } else {
      if (gpu.resource_class.includes('a10g')) {
        return 'Optimized for inference with good throughput-to-cost ratio.';
      } else if (gpu.resource_class.includes('a30')) {
        return 'Balanced inference performance.';
      }
      return 'High-performance GPU for latency-sensitive inference.';
    }
  };
  