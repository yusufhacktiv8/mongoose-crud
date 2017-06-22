const express = require('express');

const router = express.Router();

const bookController = require('../controllers/books');

router.get('/', bookController.find);
router.post('/', bookController.create);
router.put('/:isbn', bookController.update);
router.delete('/:isbn', bookController.delete);

module.exports = router;
