const express = require('express');

const router = express.Router();

const transactionController = require('../controllers/transactions');

router.get('/', transactionController.find);
router.post('/', transactionController.create);
router.put('/:transactionId', transactionController.update);
router.delete('/:transactionId', transactionController.delete);

module.exports = router;
