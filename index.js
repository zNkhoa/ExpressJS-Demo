require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth.middleware');
const productRoutes = require('./routes/product.route');
const cartRoutes = require('./routes/cart.route');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const apiProductRoute = require('./api/routes/product.route');
const apiUserRoute = require('./api/routes/user.route');

const port = 3000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
	
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(session({
	secret: 'mysupersecret', 
	resave: false, 
	saveUninitialized: false,
	store: new mongoStore({ mongooseConnection: mongoose.connection }),
	cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use( (req, res, next) => {
	res.locals.session = req.session;
	next();
});

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/api/products', apiProductRoute);
app.use('/api/users', apiUserRoute);

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));