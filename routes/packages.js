const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const auth = require('../middleware/auth');

router.post('/', auth, packageController.createPackage);
router.post('/withdraw', auth, packageController.withdrawEarnings);
router.get('/', auth, packageController.getPackages);

module.exports = router; 