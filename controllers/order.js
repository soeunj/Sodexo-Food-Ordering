const bodyParser = require('body-parser');
var {
  mongoose
} = require('../db/database');
var {
  OrderList
} = require('../models/orderlist');
var {
  Order
} = require('../models/order');
exports.orderList = function(req, res, next) {
  OrderList.find({session:req.sessionID},function(err, orderlist){
    if(err) throw err;
    res.render('index.ejs',{
      date: "",
      data: orderlist,
      type: "order",
      dayofmenu: "",
      month: "",
      year: ""
    })
  });
};
exports.confirmCount = function(req, res, next) {
  OrderList.update({_id:req.body['id']}, { $set: { count: req.body['count'] }}, function(err, updatedOrderlist){
    if(err) throw err;
    console.log(updatedOrderlist);
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
  });
};
exports.deleteOrder = function(req, res, next) {
  var id = req.body['id'];
  OrderList.deleteOne({
    _id: id
  }).then((results) => {
    console.log("Success to delete");
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
  });
};
exports.submitOrder = function(req, res, next) {
  OrderList.find({session:req.sessionID}, function(err, orderlist) {
    if (err) throw err;
    for (let i = 0; i < orderlist.length; i++) {
      var newOrder = new Order({
        menu: orderlist[i]['menu'],
        date: new Date,
        orderingfooddate: orderlist[i]['date'],
        count: orderlist[i]['count']
      });
      newOrder.save().then((doc) => {
        if (err) throw err;
        console.log("Success to order");
        OrderList.remove({session:req.sessionID}, function(err) {
          if(err) throw err;
        });
      }, (e) => {
        console.log('Unable to order');
      });
    }
  });
  res.send();
};
