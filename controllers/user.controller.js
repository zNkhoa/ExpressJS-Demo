const User = require('../models/user.model');

module.exports.index = async (req, res) => { 
	const users = await User.find();
	res.render('users/index', {
		users: users
	});
};

module.exports.search = async (req, res) => {
	let q = req.query.q;
	const users = await User.find();
	let mathchedUser = users.filter( user => 
		user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);

	res.render('users/index', {
		users: mathchedUser
	});
};

module.exports.create = (req, res) => res.render('users/create');

module.exports.view = async (req, res) => {
	let id = req.params.id;
	
	let user = await User.findById({ _id: id });
	res.render('users/view', {
		user: user
	});
};

module.exports.postCreate = async (req, res) => {
	req.body.avatar = req.file.path.slice(7);
	let users = await User.create(req.body);
	res.redirect('/users');

};

module.exports.delete = async (req, res) => {
	let id = req.params.id;
	let users = await User.findByIdAndRemove({ _id: id }, err => {
		if(err) {
			console.log(err);
			res.status(500).send();
		}
		res.status(200).send();
	});
	
	res.redirect('/users');
};

