/*
var mongoose = require('mongoose');
var {Menu} = require('./models/menu');

mongoose.connect('mongodb://localhost:27017/foodorder');

var date = '2017-11-06';

var newMenu1 = new Menu({
  date: '2017-11-06',
  menu: 'Home Food1',
  fidescription: 'Sweet&sour porsasta ja täysjyväriisiä',
  endescription: 'Pork sweet&sour and fullgrain rice',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu1.save();
var newMenu2 = new Menu({
  date: '2017-11-07',
  menu: 'Home Food1',
  fidescription: 'Keitettyjä nakkeja, sipuli-kermakastiketta ja perunasosetta sis porsaanlihaa, maito, sulfiitti',
  endescription: 'Boiled sausages, onion and cream sauce and mashed potatoes inc milk, sulfits, pork meat',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu2.save();
var newMenu3 = new Menu({
  date: '2017-11-08',
  menu: 'Home Food1',
  fidescription: 'Metsäsienikeittoa sis vehnä, maito, selleri',
  endescription: 'Wild mushroom soup inc wheat, milk, celery',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu3.save();
var newMenu4 = new Menu({
  date: '2017-11-09',
  menu: 'Home Food1',
  fidescription: 'Mannapuuroa, marjakeittoa ja juustoa sis maito, vehnä',
  endescription: 'Semolina porridge, berry soup and cheese inc milk, wheat',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu4.save();
var newMenu5 = new Menu({
  date: '2017-11-10',
  menu: 'Home Food1',
  fidescription: 'Tomaattisilakoita ja keitettyä perunaasis sulfiitti, kala',
  endescription: 'Tomato Baltic herring and boiled potatoes inc sulfits, fish',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu5.save();


var newMenu1 = new Menu({
  date: '2017-11-06',
  menu: 'Home Food2',
  fidescription: 'Lohi-pennevuokaa sis vehnä, maito',
  endescription: 'Pasta casserole with salmon inc wheat, milk',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu1.save();
var newMenu2 = new Menu({
  date: '2017-11-07',
  menu: 'Home Food2',
  fidescription: 'Sitruunabroileria ja täysjyväriisiä sis maito, selleri',
  endescription: 'Lemon chicken with whole grain rice inc milk, celery',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu2.save();
var newMenu3 = new Menu({
  date: '2017-11-08',
  menu: 'Home Food2',
  fidescription: 'Karjalan paistia, keitettyä perunaa ja puolukkaa sis sian lihaa',
  endescription: 'Karelian stew, boiled potatoes and lingonberries inc pork meat',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu3.save();
var newMenu4 = new Menu({
  date: '2017-11-09',
  menu: 'Home Food2',
  fidescription: 'Lihapullat tomaattikastikkeessa ja täysjväpastaa sis soija, vehnä',
  endescription: 'Meatballs in tomato sauce and whole grain pasta inc soy, wheat',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu4.save();
var newMenu5 = new Menu({
  date: '2017-11-10',
  menu: 'Home Food2',
  fidescription: 'Yrtti-valkosipulitäytetty broilerpihvi, timjami-omenakastiketta ja täysjyväriisiä sis vehnä, maito, kananmuna, selleri',
  endescription: 'Chicken steak with herb and garlic filling, thyme and apple sauce and whole grain rice inc wheat, milk, egg, celery',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu5.save();

var newMenu1 = new Menu({
  date: '2017-11-06',
  menu: 'Vegetable Diet',
  fidescription: 'VEGAANI Falafel-pyörykät , korianteri-soijajogurttikastiketta ja täysjyväriisiä sis soija',
  endescription: 'VEGAN Falafel balls with coriander and soy yoghurt sauce and whole grain rice inc soy',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu1.save();
var newMenu2 = new Menu({
  date: '2017-11-07',
  menu: 'Vegetable Diet',
  fidescription: 'VEGAN Punajuuri-spelttipihvit, piparjuurimajoneesia ja täysjyväriisiäsis vehnä, sinappi',
  endescription: 'VEGAN Beetroot and spelt patties, mayonnaise with horseradish, whole grain rice inc wheat, mustard',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu2.save();
var newMenu3 = new Menu({
  date: '2017-11-08',
  menu: 'Vegetable Diet',
  fidescription: 'VEGAN Punajuuri-soijavuokaa sis ruis, selleri, soija, vehnä',
  endescription: 'VEGAN Beetroot and soy casserole inc rye, celery, soy, wheat',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu3.save();
var newMenu4 = new Menu({
  date: '2017-11-09',
  menu: 'Vegetable Diet',
  fidescription: 'VEGAN Vegaanipyöryköitä mango-kookoskastikkeessa ja täysjyväriisiä sis vehnä, selleri, soija',
  endescription: 'VEGAN Vegan balls in mango-coconutsauce with whole grain rice inc wheat, celery, soy',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu4.save();
var newMenu5 = new Menu({
  date: '2017-11-10',
  menu: 'Vegetable Diet',
  fidescription: 'VEGAN Juusto-paprikapizza sis vehnä, valkosipuli',
  endescription: 'VEGAN Cheese and bell pepper pizza inc wheat, garlic',
  price:'2,60 €/ 5.21 €/ 6,59 €'
});
newMenu5.save();


var newMenu1 = new Menu({
  date: '2017-11-06',
  menu: 'Vegetable Soup',
  fidescription: 'Kesäkurpitsa-vuohenjuustokeitto sis maito, selleri',
  endescription: 'Zuccini soup with coath cheese inc milk, celery',
  price:'1,33 €/ 3,57 €/ 6,22 €'
});
newMenu1.save();
var newMenu2 = new Menu({
  date: '2017-11-07',
  menu: 'Vegetable Soup',
  fidescription: 'Juuressosekeittoa sis maito, selleri',
  endescription: 'Pureed root vegetable soup inc milk, celery',
  price:'1,33 €/ 3,57 €/ 6,22 €'
});
newMenu2.save();
//var newMenu3 = new Menu({
//  date: '2017-11-08',
//  menu: 'Vegetable Soup',
//  fidescription: 'VEGAN Punajuuri-soijavuokaa sis ruis, selleri, soija, vehnä',
//  endescription: 'VEGAN Beetroot and soy casserole inc rye, celery, soy, wheat',
//  price:'1,33 €/ 3,57 €/ 6,22 €'
//});
//newMenu3.save();
var newMenu4 = new Menu({
  date: '2017-11-09',
  menu: 'Vegetable Soup',
  fidescription: 'Paprika-tuorejuustokeittoa sis selleri, maito',
  endescription: 'Bell pepper and cream cheese soup inc celery, milk',
  price:'1,33 €/ 3,57 €/ 6,22 €'
});
newMenu4.save();
var newMenu5 = new Menu({
  date: '2017-11-10',
  menu: 'Vegetable Soup',
  fidescription: 'Juustoista kasviskeittoa sis maito, selleri',
  endescription: 'Cheesy vegetable soup inc milk, celery',
  price:'1,33 €/ 3,57 €/ 6,22 €'
});
newMenu5.save();

var newMenu1 = new Menu({
  date: '2017-11-06',
  menu: 'Special Lunch',
  fidescription: 'Wienin leike,sitruunaa ja kaprista,juurespyrettä sis vehnä, kala',
  endescription: 'Wiener snitchel and root vegetable pure inc wheat,fish',
  price:'4,05 €/ 6,58 €/ 7,67 €'
});
newMenu1.save();
var newMenu2 = new Menu({
  date: '2017-11-07',
  menu: 'Special Lunch',
  fidescription: 'Paahtopaistia, punaviinikastiketta, paahdettua perunaa ja sipulia sis sulfiitti',
  endescription: 'Roast beef, red wine sauce, roasted potatoes and onion inc sulfits',
  price:'4,05 €/ 6,58 €/ 7,67 €'
});
newMenu2.save();
//var newMenu3 = new Menu({
//  date: '2017-11-08',
//  menu: 'Vegetable Soup',
//  fidescription: 'VEGAN Punajuuri-soijavuokaa sis ruis, selleri, soija, vehnä',
//  endescription: 'VEGAN Beetroot and soy casserole inc rye, celery, soy, wheat',
//  price:'4,05 €/ 6,58 €/ 7,67 €'
//});
//newMenu3.save();
var newMenu4 = new Menu({
  date: '2017-11-09',
  menu: 'Special Lunch',
  fidescription: 'Parmesankuorrutettua kalaa, Välimeren kasviksia ja ryppyperunoita sis maito, cashew-pähkinä, kala, seesamin siemen, soija',
  endescription: 'Fish coated with parmesan, Mediterranean vegetables and wrinkled potatoes inc milk, cashew-nuts, fish, sesamiseeds, soy',
  price:'4,05 €/ 6,58 €/ 7,67 €'
});
newMenu4.save();
var newMenu5 = new Menu({
  date: '2017-11-10',
  menu: 'Special Lunch',
  fidescription: 'Suolaisenmakeaa porsaankylkeä, papupaistosta ja lohkoperunoitasis kala, valkosipuli',
  endescription: 'Salty-sweet pork rib, bean hash and potato wedges inc fish, garlic',
  price:'4,05 €/ 6,58 €/ 7,67 €'
});
newMenu5.save();

var newMenu1 = new Menu({
  date: '2017-11-06',
  menu: 'Bread Lunch',
  fidescription: 'PATONKI tomaatti-mozzarellatäytteellä sis vehnä, maito, cashew-pähkinä ( pesto)',
  endescription: 'Baguette with tomato and mozzarella inc wheat, milk, cashew-nuts (pesto)',
  price:'1,84 €/ 4,22 €/ 6,59 €'
});
newMenu1.save();
var newMenu2 = new Menu({
  date: '2017-11-07',
  menu: 'Bread Lunch',
  fidescription: 'Patonki BBQ- broilertäytteellä sis vehnä, kananmuna, sinappi, soija, selleri',
  endescription: 'Baguette filled with BBQ chicken inc Wheat, egg, mustard, soy, celery',
  price:'1,84 €/ 4,22 €/ 6,59 €'
});
newMenu2.save();
//var newMenu3 = new Menu({
//  date: '2017-11-08',
//  menu: 'Vegetable Soup',
//  fidescription: 'VEGAN Punajuuri-soijavuokaa sis ruis, selleri, soija, vehnä',
//  endescription: 'VEGAN Beetroot and soy casserole inc rye, celery, soy, wheat',
//  price:'4,05 €/ 6,58 €/ 7,67 €'
//});
//newMenu3.save();
var newMenu4 = new Menu({
  date: '2017-11-09',
  menu: 'Bread Lunch',
  fidescription: 'Patonki BBQ- kalkkunatäytteellä sis kananmuna, sinappi, soija, vehnä, selleri',
  endescription: 'Baguette filled with BBQ turkey inc egg, mustard, soy, wheat, celery',
  price:'1,84 €/ 4,22 €/ 6,59 €'
});
newMenu4.save();
var newMenu5 = new Menu({
  date: '2017-11-10',
  menu: 'Bread Lunch',
  fidescription: 'Patonki kinkku-juustotäytteellä sis vehnä, maito',
  endescription: 'Baguette filled with ham and cheese inc wheat, milk',
  price:'1,84 €/ 4,22 €/ 6,59 €'
});
newMenu5.save();

var newMenu1 = new Menu({
  date: '2017-11-06',
  menu: 'Dessert',
  fidescription: 'Mansikka-basilika smoothie sis maito',
  endescription: 'Smoothie with strawberry and basil inc milk',
  price:'1,33 €/ 3,57 €/ 6,22 €'
});
newMenu1.save();
var newMenu2 = new Menu({
  date: '2017-11-07',
  menu: 'Dessert',
  fidescription: 'Ruusunmarjakiisseliä',
  endescription: 'Rose hip kissel',
  price:'1,33 €/ 3,57 €/ 6,22 €'
});
newMenu2.save();
var newMenu3 = new Menu({
  date: '2017-11-08',
  menu: 'Dessert',
  fidescription: 'Marjarahka sis maito',
  endescription: 'Quark with berries inc milk',
  price:'1,33 €/ 3,57 €/ 6,22 €'
});
newMenu3.save();
var newMenu4 = new Menu({
  date: '2017-11-09',
  menu: 'Dessert',
  fidescription: 'Ahvenanmaan pannukakkua sis maito, vehnä, kananmuna',
  endescription: 'Åland pancake inc milk, wheat, egg',
  price:'1,33 €/ 3,57 €/ 6,22 €'
});
newMenu4.save();
var newMenu5 = new Menu({
  date: '2017-11-10',
  menu: 'Dessert',
  fidescription: 'Turkkilaista jugurttia, hunajaa ja mysliä sis maito, vehnä, kaura, ohra',
  endescription: 'Turkish yoghurt, honey and muesli inc milk, wheat, oat, barley',
  price:'1,33 €/ 3,57 €/ 6,22 €'
});
newMenu5.save();
*/
