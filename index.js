const mongoose = require('mongoose');
const helmet = require('helmet')
const Joi = require('joi');
const express = require('express');
const app = express();
const categories = require('./routes/categories');
const home = require('./routes/home');
const users = require('./routes/users');

// Connect to Database
mongoose.connect('mongodb://localhost/shop', { useNewUrlParser: true })
    .then(() => console.log('Connect to database sucesssfully'))
    .catch((err) => console.error('Connect to database failed', err));


// Middleware
app.use(express.json());
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Make public dir for css

// Config route
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/', home);

app.listen(3000, () => {
    console.log('Server running ...');
});