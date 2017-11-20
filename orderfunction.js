var {
  mongoose
} = require('./db/database');
var {
  OrderList
} = require('./models/orderlist');
var {
  Order
} = require('./models/order');

exports.submitOrder = function() {
  OrderList.find({}, function(err, orderlist) {
    if (err) throw err;
    for (let i = 0; i < orderlist.length; i++) {
      var newOrder = new Order({
        menu: orderlist[i]['menu'],
        date: new Date,
        orderingfooddate: orderlist[i]['date'],
        count: orderlist[i]['count']
      });
      newOrder.save().then((doc) => {
        console.log(JSON.stringify(doc, undefined, 2));
      }, (e) => {
        console.log('Unable to order');
      });
    }
  });
  OrderList.remove({}, function(err) {
    if (err) throw err;
    console.log("success to drop");
  });
}

exports.addMenuToOrderList = function(clickmenu) {
  var menu = clickmenu['id'].toString().split('_')[0];
  OrderList.findOneAndUpdate({
    menu: clickmenu['id'].toString().split('_')[0],
    date: clickmenu['id'].toString().split('_')[1].slice(0,15)
  }, {
    $inc: {
      count: +1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
      if (!result) {
        var newOrderList = new OrderList({
          date: clickmenu['id'].toString().split('_')[1].slice(0,15),
          menu: clickmenu['id'].toString().split('_')[0],
          count: 1
        });
        newOrderList.save().then((doc) => {
          console.log(JSON.stringify(doc, undefined, 2));
        }, (e) => {
          console.log('Unable to save menu');
        });
      }
  });
}
exports.decreaseCount = function(clickOrderList) {
  var id = clickOrderList['id'];
  OrderList.findOne({
    _id: id
  }, function(err, orderlist) {
    if (err) throw err;
    if (orderlist['count'] <= 1) {
      console.log(orderlist['count']);
      console.log("not available");
    } else {
      OrderList.findOneAndUpdate({
        _id: orderlist['_id']
      }, {
        $inc: {
          count: -1
        }
      }, {
        returnOriginal: false
      }).then((result) => {
        if (!result) {
          return res.status(404).send();
        }
      });
    }
  });
}

exports.increaseCount = function(clickOrderList) {
  var id = clickOrderList['id'];
  OrderList.findOne({
    _id: id
  }, function(err, orderlist) {
    if (err) throw err;
    OrderList.findOneAndUpdate({
      _id: orderlist['_id']
    }, {
      $inc: {
        count: +1
      }
    }, {
      returnOriginal: false
    }).then((result) => {
      if (!result) {
        return res.status(404).send();
      }
    });
  });
}
exports.deleteMenuToOrderList = function(clickOrderList) {
  var id = clickOrderList['id'];
  OrderList.deleteOne({
    _id: id
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  });
}
