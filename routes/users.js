const User = require('../models/User');
const Joi = require('joi');
const express = require('express');
const router = express.Router();


router.get('/', async(req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/', async(req, res) => {
    const { error } = validateUsers(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    });

    user = await user.save();

    res.send(user);
});

router.put('/:id', async(req, res) => {
    const { error } = validateUsers(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }, {
        new: true
    })

    if (!user) {
        res.status(404).send('User not found');
    }

    res.send(user);
});

router.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).send('User not found');
    }
    res.send(user);
});

router.delete('/:id', async(req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
        res.status(404).send('User not found');
    }

    res.send(user);
})

function validateUsers(users) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        role: Joi.valid('admin', 'client').required()
    }

    return Joi.validate(users, schema);
}
module.exports = router;