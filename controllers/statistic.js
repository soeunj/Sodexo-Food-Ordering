const bodyParser = require('body-parser');
var {
  mongoose
} = require('../db/database');
var {
  Order
} = require('../models/order');
var datefunction = require('../date');
var month_date = {
  0:31,
  1:28,
  2:31,
  3:30,
  4:31,
  5:30,
  6:31,
  8:31,
  9:30,
  10:31,
  11:30,
  12:31
}
/*
This function is to show today's order data.
It generates a graph which shows today's order data about each menus.
*/
exports.todayStatistic = function(req, res, next){
  let today_date = new Date();
  //after 2 pm, the statistics is about next day order.
  if(today_date.getHours() >= 14){
    today_date.setDate(today_date.getDate() + 1);
  }
  Order.aggregate([{
      $match: {
        orderingfooddate: {
          '$gte':new Date(today_date.getFullYear(), today_date.getMonth(), today_date.getDate()),
          '$lte':new Date(today_date.getFullYear(), today_date.getMonth(), today_date.getDate()+1)
        }
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
  ], function(err, result){
    if(err) throw err;
    //console.log(result);
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
