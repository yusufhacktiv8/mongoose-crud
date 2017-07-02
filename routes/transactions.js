const express = require('express');

const router = express.Router();

const transactionController = require('../controllers/transactions');

router.get('/', transactionController.find);
router.post('/', transactionController.create);

module.exports = router;
