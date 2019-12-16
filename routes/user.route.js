const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })

router.get('/', controller.index);

router.get('/cookie', (req, res, next) => {
	res.cookie("user-id", 1234);
	res.send("<HELLO></HELLO>")
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.view);

router.post('/create', 
	upload.single('avatar'),
	validate.validateCreate, 
	controller.postCreate
);

router.delete('/delete/:id', controller.delete);

module.exports = router;