var currentWeekNumber = require('current-week-number');
var moment = require('moment');
const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();

var day_number = {
  "mon": 1,
  "tue": 2,
  "wed": 3,
  "thu": 4,
  "fri": 5
};
var _day_number = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
var month_number = {"jan":01,
"feb":02,
"mar":03,
"apr":04,
"may":05,
"jun":06,
"jul":07,
"aug":08,
"sep":09,
"oct":10,
"nov":11,
"dec":12};


exports.date_to_string = function(date) {
  if (date < 10) date = '0' + date;
  return date;
}
exports.thisDate = function(clickday){
  var day_difference = 0;
  if(clickday != "today"){
    var today_day = new Date().getDay();
    day_difference = day_number[clickday] - today_day;
  }
  var _today = new Date(year, month, day);
  var _clickday = new Date(_today.getTime()+(day_difference*1000*60*60*24));
  return _clickday;
}

exports.thisMonthStartDay = function(month){
  let startOfMonth;
  if(month == "thismonth"){
    startOfMonth = moment().startOf('month').toDate();
  }
  else{
    startOfMonth = moment(year+'-'+month_number[month]+'-01').startOf('month').toDate();
  }
  return startOfMonth;
}
exports.thisMonthEndDay = function(month){
  let endOfMonth;
  if(month == "thismonth"){
    endOfMonth = moment().endOf('month').toDate();
  }
  else{
    endOfMonth = moment(year+'-'+month_number[month]+'-01').endOf('month').toDate();
  }
  return endOfMonth;
}
exports.clickDayOfMenu = function(click) {
  if (click == 'mon') {
    return "MONDAY MENU"
  } else if (click == 'tue') {
    return "TUESDAY MENU"
  } else if (click == 'wed') {
    return "WEDNESDAY MENU"
  } else if (click == 'thu') {
    return "THURSDAY MENU"
  } else if (click == 'fri') {
    return "FRIDAY MENU"
  } else {
    return "TODAY MENU"
  }
}
