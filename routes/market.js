const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

router.get('/overview', marketController.getMarketOverview);

module.exports = router; 