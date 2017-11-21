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
      console.log(orderlist[i]['count']);
      var newOrder = new Order({
        menu: orderlist[i]['menu'],
        date: new Date,
        orderingfooddate: orderlist[i]['date'],
        count: orderlist[i]['count']
      });
      newOrder.save().then((doc) => {
        console.log(JSON.stringify(doc, undefined, 2));
        OrderList.remove({}, function(err) {
          if (err) throw err;
          console.log("success to drop");
        });
      }, (e) => {
        console.log('Unable to order');
      });
    }
  });
}

exports.addMenuToOrderList = function(clickmenu) {
  var menu = clickmenu['id'].toString().split('_')[0];
  OrderList.findOneAndUpdate({
    menu: clickmenu['id'].toString().split('_')[0],
    date: clickmenu['id'].toString().split('_')[1].slice(0, 15)
  }, {
    $inc: {
      count: +1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    if (!result) {
      var newOrderList = new OrderList({
        date: clickmenu['id'].toString().split('_')[1].slice(0, 15),
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
exports.changeCount = function(confirmOrderList) {
  OrderList.update({_id:confirmOrderList['id']}, { $set: { count: confirmOrderList['count'] }}, function(err, updatedOrderlist){
    if(err) throw err;
    console.log(updatedOrderlist);
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
