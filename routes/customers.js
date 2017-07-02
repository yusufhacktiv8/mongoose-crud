const express = require('express');

const router = express.Router();

const customerController = require('../controllers/customers');

router.get('/', customerController.find);
router.post('/', customerController.create);
router.put('/:memberId', customerController.update);
router.delete('/:memberId', customerController.delete);

module.exports = router;
