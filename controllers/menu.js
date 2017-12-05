const bodyParser = require('body-parser');
const fetch_menu = require('../fetch_menu');
const date = require('../date');
var {
  mongoose
} = require('../db/database');
var {
  OrderList
} = require('../models/orderlist');

exports.todayMenu = function(req, res, next) {
  fetch_menu.fetch_menu("today").then(menus => {
    res.render('index.ejs', {
      data: menus,
      dayofmenu: 'TODAY MENU',
      date: "today",
      type: "menu",
      month: "",
      year: ""
    });
  }).catch(err => {
    console.log('Got error from fetch_menu', err);
  });
};
function clickDayOfMenu(click) {
  if (click == 'mon') {
    return "MONDAY MENU"
  } else if (click == 'tue') {
    return "TUESDAY MENU"
  } else if (click == 'wed') {
    return "WEDNESDAY MENU"
  } else if (click == 'thu') {
    return "THURSDAY MENU"
  } else if (click == 'fri') {
    return "FRIDAY MENU"
  } else {
    return "TODAY MENU"
  }
}
exports.eachdayMenu = function(req, res, next) {
  var id = req.params.id;
  var dayofmenu = clickDayOfMenu(id);
  fetch_menu.fetch_menu(id).then(menus => {
    res.render('index.ejs', {
      data: menus,
      dayofmenu: dayofmenu,
      date: id,
      type: "menu",
      month: "",
      year: ""
    });
  }).catch(err => {
    console.log('Got error from fetch_menu', err);
  });
};

exports.menuToOrderList = function(req, res, next) {
  let clickmenu = req.body;
  let menu = clickmenu['id'].toString().split('_')[0];
  let add_date = date.thisDate(clickmenu['id'].toString().split('_')[1]);
  OrderList.findOneAndUpdate({
    session:req.sessionID,
    menu:menu,
    date:add_date
  }, {
    $inc: {
      count: +1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    if (!result) {
      var newOrderList = new OrderList({
        session: req.sessionID,
        date: add_date,
        menu: menu,
        count: 1
      });
      newOrderList.save().then((doc) => {
        console.log('=========to orderlist==========');
        console.log(JSON.stringify(doc, undefined, 2));
      }, (e) => {
        console.log('Unable to save menu');
      });
    }
  });
  res.send(req.body);
}
