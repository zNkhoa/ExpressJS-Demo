const User = require('../models/user.model');

module.exports.login = (req, res) => { 
	res.render('auth/login');
};

module.exports.postLogin = async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	let user = await User.findOne({ email: email });

	if(!user) {
		res.render('auth/login', {
			errors: [
				'User does not exist.'
			],
			values: req.body
		});
		return;
	}

	if(user.password !== password) {
		res.render('auth/login', {
			errors: [
				'Wrong Password'
			],
			values: req.body
		});
		return;
	}

	res.cookie('userId', user._id, {
		signed: true
	});

	res.redirect('/users');
}