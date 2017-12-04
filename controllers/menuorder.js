const bodyParser = require('body-parser');
var menufunc = require('../menufunction');
var fetch_menu = require('../fetch_menu');
var orderfunc = require('../orderfunction');
var {
  mongoose
} = require('../db/database');

var session = require('../index');
const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();
var day_number = {
  "mon": 1,
  "tue": 2,
  "wed": 3,
  "thu": 4,
  "fri": 5
};
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
exports.eachdayMenu = function(req, res, next) {
  var id = req.params.id;
  console.log(id);
  var dayofmenu = menufunc.clickDayOfMenu(id);
  fetch_menu.fetch_menu(id).then(menus => {
    console.log(id);
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

function thisDate(clickday) {
  var day_difference = 0;
  if (clickday != "today") {
    var today_day = new Date().getDay();
    day_difference = day_number[clickday] - today_day;
  }
  var _today = new Date(year, month, day);
  var _clickday = new Date(_today.getTime() + (day_difference * 1000 * 60 * 60 * 24));
  return _clickday;
}

exports.menuToOrderList = function(req, res, next) {
  let clickmenu = req.body;
  let this_session = session.sess;
  let menu = clickmenu['id'].toString().split('_')[0];
  let add_date = thisDate(clickmenu['id'].toString().split('_')[1]);
  let save_data = {
    menu: menu,
    date: add_date,
    count: 1
  };

  if (this_session.sessdata != null) {
    this_session.sessdata += ';';
    this_session.sessdata += JSON.stringify(save_data);
  } else {
    this_session.sessdata = JSON.stringify(save_data);
  }
  console.log(this_session.sessdata);
  res.render('index.ejs', {
    data: this_session.sessdata.split(';'),
    dayofmenu: "",
    date: "",
    type: "order",
    month: "",
    year: ""
  });
}
exports.orderList = function(req, res, next) {
  let _this_session = session.sess.sessdata;
  if(_this_session == null){
    _this_session = [];
  }
  else{
    _this_session = session.sess.sessdata.split(';');
  }
  res.render('index.ejs', {
    date: "",
    data: _this_session,
    type: "order",
    dayofmenu: "",
    month: "",
    year: ""
  });
  /*OrderList.find({}, function(err, orderlist) {
    console.log(orderlist);
    if (err) throw err;
    res.render('index.ejs', {
      date: "",
      data: orderlist,
      type: "order",
      dayofmenu: "",
      month: "",
      year: ""
    });
  });*/
};
exports.confirmCount = function(req, res, next) {
  orderfunc.changeCount(req.body);
  OrderList.find({}, function(err, orderlist) {
    if (err) throw err;
    res.json({
      date: "",
      data: orderlist,
      type: "order",
      dayofmenu: "",
      month: "",
      year: ""
    });
  });
};
exports.deleteOrder = function(req, res, next) {
  orderfunc.deleteMenuToOrderList(req.body);
  OrderList.find({}, function(err, orderlist) {
    if (err) throw err;
    res.json({
      date: "",
      data: orderlist,
      type: "order",
      dayofmenu: "",
      month: "",
      year: ""
    });
  });
};
exports.submitOrder = function(req, res, next) {
  orderfunc.submitOrder();
  res.send();
};
