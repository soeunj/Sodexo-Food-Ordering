var {
  mongoose
} = require('./db/database');
var {
  Order
} = require('./models/order');

Order.find({}, function(err, orderlist) {
  if (err) throw err;
  //console.log(orderlist);
  for(let i=0; i<orderlist.length; i++){
    if(orderlist[i]['orderingfooddate'].includes("Nov")){
    console.log(orderlist[i]['orderingfooddate']);
    }
  }
});
