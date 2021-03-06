const bodyParser = require('body-parser');
const fetch_menu = require('../fetch_menu');
var datefunction = require('../date');
var {
  mongoose
} = require('../db/database');
var {
  OrderList
} = require('../models/orderlist');

/*
This function is to show today menu which is fetched from Sodexo page.
*/
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
/*
This function is to show each day's menu except today.
*/
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
/*
This function is to send the menu which is clicked by a user.
When a user wants to order a menu, he or she clicks the menu and it saves the menu associated with sessionID in orderlist database.
This sessionID identifies each user because it doesn't have a login function.
After that, the page is changed to order page.
*/
exports.menuToOrderList = function(req, res, next) {
  let clickmenu = req.body;
  //console.log(clickmenu);
  let menu = clickmenu['id'].toString().split('_')[0];
  let menu_title = clickmenu['id'].toString().split('_')[1];
  let add_date = datefunction.thisDate(clickmenu['id'].toString().split('_')[2]);
  let aadd_date = add_date.toString().slice(0,16);
  //console.log('menu date :'+aadd_date);
  OrderList.findOneAndUpdate({
    session:req.sessionID,
    menutitle:menu_title,
    date:aadd_date
  }, {
    $inc: {
      count: +1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    //console.log(result);
    if (!result) {
      var newOrderList = new OrderList({
        session: req.sessionID,
        date: aadd_date,
        menu: menu,
        menutitle:menu_title,
        count: 1
      });
      newOrderList.save().then((doc) => {
        console.log('=========to orderlist==========');
        console.log(JSON.stringify(doc, undefined, 2));
      }, (e) => {
        console.log(e);
        console.log('Unable to save menu');
      });
    }
  });
  res.send(req.body);
}
