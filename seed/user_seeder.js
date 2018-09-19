const seeder = require('mongoose-seed');
const faker = require('faker');

let items = [];
let myArray = ['admin', 'client'];
for (i = 0; i < 15; i++) {
    items.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        role: myArray[Math.floor(Math.random() * myArray.length)]
    })
}

let data = [{
    'model': 'User',
    'documents': items
}]

// connect mongodb
seeder.connect('mongodb://localhost/shop', function() {
    seeder.loadModels([
        '../models/User' // load mongoose model 
    ]);
    seeder.clearModels(['User'], function() {
        seeder.populateModels(data, function() {
            seeder.disconnect();
        });
    });
});