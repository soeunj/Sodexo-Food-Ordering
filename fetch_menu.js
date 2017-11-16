var request = require("request");
var {
  mongoose
} = require('./db/database');
var {
  Menu
} = require('./models/menu');
var menufunc = require('./menufunction');
var menu_category = {
  'Kotiruoka 1.': 'Home Food1',
  'Kotiruoka 2.': 'Home Food2',
  'Vegaani': 'Vegetable Diet',
  'Kasviskeitto': 'Vegetable Soup',
  'Erikoislounas': 'Special Lunch',
  'Leipälounas': 'Bread Lunch',
  'Jälkiruoka': 'Dessert'
};
var menu_category_number = {
  'Kotiruoka 1.': 1,
  'Kotiruoka 2.': 2,
  'Vegaani': 3,
  'Kasviskeitto': 4,
  'Erikoislounas': 5,
  'Leipälounas': 6,
  'Jälkiruoka': 7
};
//if there is no data about request date
//fetch data from url and save
var day_today = new Date().getDay();
if (day_today >= 1 && day_today <= 5) {
  var today = menufunc.forTodayMenu();
  var thisweek_date = menufunc.get_thisweek();
  Menu.find({
    date: today
  }, function(err, menus) {
    if (err) throw err;
    if (menus.length == 0) {
      for (let j = 1; j <=5; j++) {
        var date_splited = thisweek_date[j].toString().split('-');
        var url = "https://www.sodexo.fi/ruokalistat/output/daily_json/16365/" + date_splited[0] + "/" + date_splited[1] + "/" + date_splited[2] + "/fi";
        request({
          url: url,
          json: true
        }, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            //console.log(body); // Print the json response
            var json = body['courses'];
            for (let i = 0; i < json.length; i++) {
              var newMenu = new Menu({
                number: menu_category_number[json[i].category],
                date: thisweek_date[j],
                menu: menu_category[json[i].category],
                title_fi: json[i].title_fi,
                title_en: json[i].title_en,
                desc_fi: json[i].desc_fi,
                desc_en: json[i].desc_en,
                price: json[i].price
              }).save();
            }
          }
        });
      }
    }
  })
}
/*
var url = "https://www.sodexo.fi/ruokalistat/output/daily_json/16365/2017/11/16/fi";
request({
  url: url,
  json: true
}, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    //console.log(body); // Print the json response
    var json = body['courses'];
    for (let i = 0; i < json.length; i++) {
      var newMenu = new Menu({
        number: menu_category_number[json[i].category],
        date: '2017-11-16',
        menu: menu_category[json[i].category],
        title_fi: json[i].title_fi,
        title_en: json[i].title_en,
        desc_fi: json[i].desc_fi,
        desc_en: json[i].desc_en,
        price: json[i].price
      }).save();
    }
  }
});
var url1 = "https://www.sodexo.fi/ruokalistat/output/daily_json/16365/2017/11/17/fi";
request({
  url: url,
  json: true
}, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    //console.log(body); // Print the json response
    var json = body['courses'];
    for (let i = 0; i < json.length; i++) {
      var newMenu = new Menu({
        number: menu_category_number[json[i].category],
        date: '2017-11-17',
        menu: menu_category[json[i].category],
        title_fi: json[i].title_fi,
        title_en: json[i].title_en,
        desc_fi: json[i].desc_fi,
        desc_en: json[i].desc_en,
        price: json[i].price
      }).save();
    }
  }
});
var url2 = "https://www.sodexo.fi/ruokalistat/output/daily_json/16365/2017/11/15/fi";
request({
  url: url,
  json: true
}, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    //console.log(body); // Print the json response
    var json = body['courses'];
    for (let i = 0; i < json.length; i++) {
      var newMenu = new Menu({
        number: menu_category_number[json[i].category],
        date: '2017-11-15',
        menu: menu_category[json[i].category],
        title_fi: json[i].title_fi,
        title_en: json[i].title_en,
        desc_fi: json[i].desc_fi,
        desc_en: json[i].desc_en,
        price: json[i].price
      }).save();
    }
  }
});
var url3 = "https://www.sodexo.fi/ruokalistat/output/daily_json/16365/2017/11/14/fi";
request({
  url: url,
  json: true
}, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    //console.log(body); // Print the json response
    var json = body['courses'];
    for (let i = 0; i < json.length; i++) {
      var newMenu = new Menu({
        number: menu_category_number[json[i].category],
        date: '2017-11-14',
        menu: menu_category[json[i].category],
        title_fi: json[i].title_fi,
        title_en: json[i].title_en,
        desc_fi: json[i].desc_fi,
        desc_en: json[i].desc_en,
        price: json[i].price
      }).save();
    }
  }
});
var url3 = "https://www.sodexo.fi/ruokalistat/output/daily_json/16365/2017/11/13/fi";
request({
  url: url,
  json: true
}, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    //console.log(body); // Print the json response
    var json = body['courses'];
    for (let i = 0; i < json.length; i++) {
      var newMenu = new Menu({
        number: menu_category_number[json[i].category],
        date: '2017-11-13',
        menu: menu_category[json[i].category],
        title_fi: json[i].title_fi,
        title_en: json[i].title_en,
        desc_fi: json[i].desc_fi,
        desc_en: json[i].desc_en,
        price: json[i].price
      }).save();
    }
  }
});
*/
