const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');
const session = require('express-session');
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
  secret: 'test session',
    resave: false,
    saveUninitialized: true,
    cookie:{
      sessdata:JSON
    }
}));
//app.use(session({
//  secret: 'keyboard cat',
// resave: false,
// saveUninitialized: true
//}));
app.use(function (req, res, next) {
console.log(req.sessionID);
exports.sess = req.session;
  //if (!req.session.views) {
//    req.session.views = {};
  //}

  // get the url pathname
  //var pathname = parseurl(req).pathname;

  // count the views
  //req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  //console.log(req.session.views);*/
  next();
});
router(app);

// Server setup
const port = 3000;
const ip = '0.0.0.0';
const server = http.createServer(app);
server.listen(port, ip);
console.log("Listening on " + ip + ", port " + port);
