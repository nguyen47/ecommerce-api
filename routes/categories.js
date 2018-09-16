const Joi = require('joi');
const express = require('express');
const router = express.Router();

const categories = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'PC' },
    { id: 3, name: 'Gaming Gear' },
];


router.get('/', (req, res) => {
    res.send(categories);
});

router.post('/', (req, res) => {

    // validateCategory return 2 properties: 1/ Error, 2/ Object
    // We can use "Destructre Object" -> { Properties returned }
    const { error } = validateCategory(req.body); // Choose "error" properties when it return from validateCategory

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const category = {
        id: categories.length + 1,
        name: req.body.name
    };

    console.log(category);

    categories.push(category);

    res.send(category);
});

router.put('/:id', (req, res) => {

    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send('Category not found !');
        return;
    }

    // const result = validateCategory(req.body);
    // validateCategory return 2 properties: 1/ Error, 2/ Object
    // We can use "Destructre Object" -> { Properties returned }
    const { error } = validateCategory(req.body); // Choose "error" properties when it return from validateCategory

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    category.name = req.body.name;

    res.send(category);

});

router.delete('/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send('Category not found !');
        return;
    }

    const index = categories.indexOf(categories);

    categories.splice(index, 1);

    res.send(category);
});

router.get('/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send('Category not found !');
    }
    res.send(category);
});

function validateCategory(category) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(category, schema);
}

module.exports = router;