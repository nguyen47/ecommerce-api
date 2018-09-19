const Category = require('../models/Category');
const Joi = require('joi');
const express = require('express');
const router = express.Router();


router.get('/', async(req, res) => {
    const categories = await Category.find();
    res.send(categories);
});

router.post('/', async(req, res) => {

    // validateCategory return 2 properties: 1/ Error, 2/ Object
    // We can use "Destructre Object" -> { Properties returned }
    const { error } = validateCategory(req.body); // Choose "error" properties when it return from validateCategory

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let category = new Category({
        name: req.body.name
    });

    category = await category.save();

    res.send(category);
});

router.put('/:id', async(req, res) => {

    // const result = validateCategory(req.body);
    // validateCategory return 2 properties: 1/ Error, 2/ Object
    // We can use "Destructre Object" -> { Properties returned }
    const { error } = validateCategory(req.body); // Choose "error" properties when it return from validateCategory

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update directly to DB

    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    })

    if (!category) {
        res.status(404).send('Category not found !');
        return;
    }

    res.send(category);

});

router.delete('/:id', async(req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
        res.status(404).send('Category not found !');
        return;
    }

    res.send(category);
});

router.get('/:id', async(req, res) => {
    const category = await Category.findById(req.params.id);
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