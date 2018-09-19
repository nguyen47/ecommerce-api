const seeder = require('mongoose-seed');
const faker = require('faker');

let items = [];
for (i = 0; i < 15; i++) {
    items.push({
        name: faker.commerce.productName(),
    })
}

let data = [{
    'model': 'Category',
    'documents': items
}]

// connect mongodb
seeder.connect('mongodb://localhost/shop', function() {
    seeder.loadModels([
        '../models/Category' // load mongoose model 
    ]);
    seeder.clearModels(['Category'], function() {
        seeder.populateModels(data, function() {
            seeder.disconnect();
        });
    });
});