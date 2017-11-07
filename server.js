const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/database');
var {Menu} = require('./models/menu');
var {Order} = require('./models/order');
var {OrderList} = require('./models/orderlist');
var func = require('./orderfunction');
var menufunc = require('./menufunction');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index.ejs');
});
app.get('/menu', (req, res) => {
  var today = menufunc.forTodayMenu();
  console.log(today);
  Menu.find({date:today}, function(err, menus) {
    if (err) throw err;
    console.log(menus);
    res.render('menu.ejs', { menus: menus });
  });
});
app.get('/menu/:id', (req,res) =>{
  var id = req.params.id;
  var date = menufunc.forMenuFetch(id);
  Menu.find({date:date}, function(err, menus) {
    if (err) throw err;
    res.render('menu.ejs', { menus: menus });
  });
})
app.get('/order', (req, res) => {
  OrderList.find({}, function(err, orderlist) {
    if (err) throw err;
    res.render('order.ejs', { orderlist: orderlist });
  });
});
app.get('/statistic', (req, res) => {
  res.render('statistic.ejs');
});

app.post('/menu', (req,res) => {
  func.addMenuToOrderList(req.body);
  res.send(req.body);
})

app.post('/minus', (req, res) => {
  func.decreaseCount(req.body);
  OrderList.find({}, function(err, orderlist) {
    if (err) throw err;
    res.json({ orderlist: orderlist });
  });
})

app.post('/plus', (req, res) => {
  func.increaseCount(req.body);
  OrderList.find({}, function(err, orderlist) {
    if (err) throw err;
    res.json({ orderlist: orderlist });
  });
})

app.post('/delete', (req, res) => {
  func.deleteMenuToOrderList(req.body);
  OrderList.find({}, function(err, orderlist) {
    if (err) throw err;
    res.json({ orderlist: orderlist });
  });
})

app.get('/submitorder', (req, res) => {
  func.submitOrder();
  res.send();
})
app.listen(3000, () => {
	console.log('Started on port 3000');
});
