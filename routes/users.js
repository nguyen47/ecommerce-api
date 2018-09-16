const Joi = require('joi');
const express = require('express');
const router = express.Router();

const users = [{
        id: 1,
        email: 'test1@gmail.com',
        name: 'Test',
        role: 'admin'
    },
    {
        id: 2,
        email: 'test2@gmail.com',
        name: 'Test 2',
        role: 'admin'
    },
    {
        id: 3,
        email: 'test3@gmail.com',
        name: 'Test 3',
        role: 'client'
    },
    {
        id: 4,
        email: 'test4@gmail.com',
        name: 'Test 4',
        role: 'client'
    },
];

router.get('/', (req, res) => {
    res.send(users);
});

router.post('/', (req, res) => {
    const { error } = validateUsers(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = {
        id: users.length + 1,
        email: req.body.email,
        name: req.body.name,
        role: req.body.role

    }
    users.push(user);

    res.send(user);
});

router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send('User not found');
    }
    const { error } = validateUsers(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    user.email = req.body.email;
    user.name = req.body.name;
    user.role = req.body.role;

    res.send(user);
});

router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send('User not found');
    }
    res.send(user);
});

router.delete('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send('User not found');
    }
    const index = users.indexOf(users);

    users.splice(index, 1);

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