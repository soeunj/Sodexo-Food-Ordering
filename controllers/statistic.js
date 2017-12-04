const bodyParser = require('body-parser');
var {
  mongoose
} = require('../db/database');
var {
  Order
} = require('../models/order');
var menufunc = require('../menufunction');

exports.todayStatistic = function(req, res, next) {
  let date = menufunc.thisDate("today");
  Order.aggregate([{
      $match: {
        orderingfooddate: date
      }
    },
    {
      $group: {
        _id: '$menu',
        count: {
          $sum: '$count'
        }
      }
    }
  ], function(err, result) {
    if (err) throw err;
    console.log(result);
    res.render('index.ejs', {
      data: result,
      month: "",
      year: "",
      date: "",
      type: "stat",
      dayofmenu: ""
    });
  });
};
exports.otherStatistic = function(req, res, next) {
  let id = req.params.id;
  let startOfMonth, endOfMonth, month, year;
  startOfMonth = menufunc.thisMonthStartDay(id);
  endOfMonth = menufunc.thisMonthEndDay(id);
  month = startOfMonth.getMonth();
  year = startOfMonth.getFullYear();
  Order.aggregate([{
      $match: {
        orderingfooddate: {
          "$lte": endOfMonth,
          "$gte": startOfMonth
        }
      }
    },
    {
      $group: {
        _id: '$orderingfooddate',
        count: {
          $sum: '$count'
        }
      }
    }
  ], function(err, result) {
    if (err) throw err;
    console.log(result);
    res.render('index.ejs', {
      data: result,
      month: month,
      year: year,
      date: "",
      type: "stat1",
      dayofmenu: ""
    });
  });
};
