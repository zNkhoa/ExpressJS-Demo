const Session = require('../models/cart.model');

module.exports = async (req, res, next) => {

	if(!req.signedCookies.sessionId) {
		let sessions = await new Session();

		res.cookie('sessionId', sessions._id, {
			signed: true
		});
		// console.log(sessions);
		sessions.save();
	}

	next();
}