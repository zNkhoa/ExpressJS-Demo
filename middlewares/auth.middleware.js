const User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
	if(!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}

	let user = await User.findById({ _id: req.signedCookies.userId });
	
	if(!user) {
		res.redirect('/auth/login');
		return;
	}
	console.log(user);
	res.locals.user = user;

	next();
}