const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/foodorder');

module.exports = {mongoose};

/*
var newMenu = new Menu({
  menu: 'Vegetable Diet',
  description: 'Nordic Flavours Spinach mushrooms with/milk, egg, wheat/Nordic Flavors Spinach Crêpes/inc milk, egg, wheat',
  price:'2,60 €/5.21 €/6,59 €'
});

newMenu.save().then((doc) => {
  console.log(JSON.stringify(doc,undefined, 2));
}, (e) => {
  console.log('Unable to save menu');
});
*/
