// server/src/routes/api.js
const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');


router.get('/gpu-pricing', pricingController.getPricing);
router.post('/recommend', pricingController.getRecommendations);

module.exports = router;