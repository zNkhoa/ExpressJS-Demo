// const Session = require('../models/cart.model');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

module.exports.addToCart = (req, res, next) => {
	let productId = req.params.productId;
	let cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, (err, product) => {
		if(err) {
			return res.redirect('/products');
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/products');

	});

}

module.exports.index = (req, res) => {
	if(!req.session.cart){
		return res.render('cart/index', {products: null});
	}
	var cart = new Cart(req.session.cart);
	console.log(cart.generateArray());
	res.render('cart/index', {
		products: cart.generateArray(),
		totalPrice: cart.totalPrice
	});
}