const bodyParser = require('body-parser');
var {
  mongoose
} = require('../db/database');
var {
  Order
} = require('../models/order');
var datefunction = require('../date');
/*
This function is to show today's order data.
It generates a graph which shows today's order data about each menus.
*/
exports.todayStatistic = function(req, res, next) {
  let _date = datefunction.thisDate("today");
  Order.aggregate([{
      $match: {
        orderingfooddate: _date
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
/*
This function is to show each day's order data.
It generates a graph which shows each day's total order data.
*/
exports.otherStatistic = function(req, res, next) {
  let id = req.params.id;
  let startOfMonth, endOfMonth, month, year;
  startOfMonth = datefunction.thisMonthStartDay(id);
  endOfMonth = datefunction.thisMonthEndDay(id);
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
