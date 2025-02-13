const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const auth = require('../middleware/auth');

router.get('/', auth, portfolioController.getPortfolio);

module.exports = router; 