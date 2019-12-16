const Product = require('../../models/product.model');

module.exports.product = async (req, res) => {
	let products = await Product.find();
    res.json(products);
}