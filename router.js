const Home = require('./controllers/home')
const Menu = require('./controllers/menu');
const Order = require('./controllers/order');
const Statistic = require('./controllers/statistic');

module.exports = function(app) {
    app.get('/', Home.homePage); // main page
    app.get('/menu', Menu.todayMenu); // today menu page
    app.post('/menu', Menu.menuToOrderList); // send menu which is clicked to order list
    app.get('/menu/:id', Menu.eachdayMenu); // each day's menu page
    app.get('/order', Order.orderList); // order page which shows order list
    app.post('/confirmcount', Order.confirmCount); // confirm to count which is changed
    app.post('/delete', Order.deleteOrder); // delete a order in order list
    app.get('/submitorder', Order.submitOrder); // complete order
    app.get('/statistic', Statistic.todayStatistic); // today's statistic page
    app.get('/statistic/:id', Statistic.otherStatistic); // other statistic page
};
