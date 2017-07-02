const express = require('express');

const router = express.Router();

const bookController = require('../controllers/books');
const customerController = require('../controllers/customers');

router.get('/', bookController.find);
router.post('/', bookController.create);
router.put('/:isbn', bookController.update);
router.delete('/:isbn', bookController.delete);

router.get('/', customerController.find);
router.post('/', customerController.create);
router.put('/:memberId', customerController.update);
router.delete('/:memberId', customerController.delete);

module.exports = router;
