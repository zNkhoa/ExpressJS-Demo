const Product = require('../models/product.model');

module.exports.search = async (req, res) => {
    let q = req.query.q;
    const products = await Product.find();
    let mathchedProduct = products.filter( product => 
        product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);

    res.render('products/index', {
        products: mathchedProduct
    });
}

module.exports.product = async (req, res) => {
	const page = parseInt(req.query.page) || 1; //n
	const perPage = 8; //x

	await Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            Product.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('products/index', {
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
}