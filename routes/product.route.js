const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');

router.get('/', controller.product);

router.get('/search', controller.search);

module.exports = router;