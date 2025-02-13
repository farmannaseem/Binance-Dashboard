const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');
const auth = require('../middleware/auth');

router.post('/', auth, tradeController.placeOrder);

module.exports = router; 