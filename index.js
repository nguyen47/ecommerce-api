const Joi = require('joi');
const express = require('express');
const app = express();
const categories = require('./routes/categories');
const home = require('./routes/home');
const users = require('./routes/users');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Make public dir for css

// Config route
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/', home);

app.listen(3000, () => {
    console.log('Server running ...');
});