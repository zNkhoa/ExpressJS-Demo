const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
// const validate = require('../validate/user.validate');
// const multer  = require('multer')
// const upload = multer({ dest: './public/uploads/' })

router.get('/', controller.index);

module.exports = router;