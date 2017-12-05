const Home = require('./controllers/home')
const Menu = require('./controllers/menu');
const Order = require('./controllers/order');
const Statistic = require('./controllers/statistic');

module.exports = function(app) {
    app.get('/', Home.homePage);
    app.get('/menu', Menu.todayMenu);
    app.post('/menu', Menu.menuToOrderList);
    app.get('/menu/:id', Menu.eachdayMenu);
    app.get('/order', Order.orderList);
    app.post('/confirmcount', Order.confirmCount);
    app.post('/delete', Order.deleteOrder);
    app.get('/submitorder', Order.submitOrder);
    app.get('/statistic', Statistic.todayStatistic);
    app.get('/statistic/:id', Statistic.otherStatistic);
};
