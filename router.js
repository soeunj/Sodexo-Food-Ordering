const Home = require('./controllers/home')
const MenuOrder = require('./controllers/menuorder');
const Order = require('./controllers/order');
const Statistic = require('./controllers/statistic');

module.exports = function(app) {
    app.get('/', Home.homePage);
    app.get('/menu', MenuOrder.todayMenu);
    app.post('/menu', MenuOrder.menuToOrderList);
    app.get('/menu/:id', MenuOrder.eachdayMenu);
    app.get('/order', MenuOrder.orderList);
    app.post('/confirmcount', MenuOrder.confirmCount);
    app.post('/delete', MenuOrder.deleteOrder);
    app.get('/submitorder', MenuOrder.submitOrder);
    app.get('/statistic', Statistic.todayStatistic);
    app.get('/statistic/:id', Statistic.otherStatistic);
};
