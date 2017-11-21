const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

var {
  mongoose
} = require('./db/database');
var {
  Order
} = require('./models/order');
var {
  OrderList
} = require('./models/orderlist');
var func = require('./orderfunction');
var menufunc = require('./menufunction');
var fetch_menu = require('./fetch_menu');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index.ejs');
});
app.get('/menu', (req, res) => {
  fetch_menu.fetch_menu("today").then(menus => {
    var date = menufunc.thisDate("today");
      res.render('menu.ejs', {
        menus: menus,
        dayofmenu: 'TODAY MENU',
        date: date
      });
  }).catch(err => {
      console.log('Got error from fetch_menu', err);
  });
});
app.get('/menu/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  var dayofmenu = menufunc.clickDayOfMenu(id);
  var date = menufunc.thisDate(id);
  console.log(date);
  fetch_menu.fetch_menu(id).then(menus => {
      res.render('menu.ejs', {
        menus: menus,
        dayofmenu: dayofmenu,
        date: date
      });
  }).catch(err => {
      console.log('Got error from fetch_menu', err);
  });
});
app.get('/order', (req, res) => {
  OrderList.find({}, function(err, orderlist) {
    if (err) throw err;
    res.render('order.ejs', {
      orderlist: orderlist
    });
  });
});
app.get('/statistic', (req, res) => {
  let date = menufunc.today_chart();
  Order.aggregate([
    { $match: {orderingfooddate: date } },
    { $group: { _id: '$menu', count: { $sum: '$count'  } } }
  ], function(err, result) {
    if (err) throw err;
    res.render('statistic.ejs', {
      orderdata: result
    });
  });
});

app.post('/menu', (req, res) => {
  func.addMenuToOrderList(req.body);
  res.send(req.body);
});

app.post('/confirmcount', (req, res) => {
  func.changeCount(req.body);
  OrderList.find({}, function(err, orderlist) {
    if (err) throw err;
    res.json({
      orderlist: orderlist
    });
  });
});

app.post('/delete', (req, res) => {
  func.deleteMenuToOrderList(req.body);
  OrderList.find({}, function(err, orderlist) {
    if (err) throw err;
    res.json({
      orderlist: orderlist
    });
  });
});
app.get('/submitorder', (req, res) => {
  func.submitOrder();
  res.send();
});
app.listen(3000, () => {
  console.log('Started on port 3000');
});
