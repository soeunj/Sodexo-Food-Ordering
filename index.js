const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');
const session = require('express-session');
var MongoStore  = require('connect-mongo')(session);
const app = express();

// default to a 'localhost' configuration:
let connection_string = '127.0.0.1:27017/foodorder';

// DB Setup
mongoose.connect('mongodb://' + connection_string);

// App setup
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({
  secret  : 'secret',
  autoRemove: 'native',
  store   : new MongoStore({mongooseConnection: mongoose.connection })
}));
app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no')); // handle error
  }
  next(); // otherwise continue
});
router(app);

// Server setup
const port = 3000;
const ip = '0.0.0.0';
const server = http.createServer(app);
server.listen(port, ip);
console.log("Listening on " + ip + ", port " + port);
