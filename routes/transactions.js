const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.get('/', auth, transactionController.getTransactions);
router.post('/', auth, transactionController.addTransaction);

module.exports = router; 