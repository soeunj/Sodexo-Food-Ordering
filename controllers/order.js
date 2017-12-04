const bodyParser = require('body-parser');
var {
  mongoose
} = require('../db/database');
var {
  OrderList
} = require('../models/orderlist');
var orderfunc = require('../orderfunction');

exports.orderList = function(req, res, next) {
  OrderList.find({}, function(err, orderlist) {
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
  });
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
