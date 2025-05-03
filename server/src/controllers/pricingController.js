// backend/src/controllers/pricingController.js
const { fetchGpuPricing } = require('../utils/apiClient');
const fs = require('fs');
const mockData = JSON.parse(fs.readFileSync('./src/data/mock-pricing.json'));
const knowledgeBase = require('../data/knowledgeBase.json');

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

exports.getRecommendations = async (req, res) => {
    if (!req.body) {
        console.log('Request body is undefined');
        return res.status(400).json({ error: 'Request body is missing' });
    }

    const { modelType, datasetSize, task, budget, region } = req.body;
    
    console.log('Received request:', req.body);

    if (!modelType || !datasetSize || !budget || !region) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!['us-east-at-1', 'ap-south-mum-1', 'ap-south-del-1', 'ap-south-noi-1'].includes(region)) {
        return res.status(400).json({ error: 'Invalid region' });
    }

    try {
        const data = await fetchGpuPricing(region);
        let recommendations = data.filter((instance) => {
            const isBudgetMatch = instance.price_per_month <= budget;
            const isTaskMatch =
                task === 'training'
                    ? ['a100', 'l40s'].includes(instance.resource_class)
                    : ['a30', 'a2'].includes(instance.resource_class);
            const isDatasetMatch = datasetSize > 100 ? instance.ram >= 64 : instance.ram >= 32;
            return isBudgetMatch && isTaskMatch && isDatasetMatch;
        });

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
        res.status(error.response?.status || 500).json({
            error: true,
            messages: error.response?.data?.messages || 'Failed to generate recommendations',
        });
    }
};