var moment = require('moment');
const year = new Date().getUTCFullYear();
const month = new Date().getUTCMonth();
const day = new Date().getUTCDate();
var day_number = {
  "mon": 1,
  "tue": 2,
  "wed": 3,
  "thu": 4,
  "fri": 5
};
var month_number = {
  "jan": 01,
  "feb": 02,
  "mar": 03,
  "apr": 04,
  "may": 05,
  "jun": 06,
  "jul": 07,
  "aug": 08,
  "sep": 09,
  "oct": 10,
  "nov": 11,
  "dec": 12
};
function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}
/*
This function is to generate actual date from Monday, Tuesday, Wednesday, Thursday, and Friday.
*/
exports.thisDate = function(clickday) {
  var day_difference = 0;
  var _today = new Date(year, month, day);
  var todayDay = new Date().getUTCDay();
  var now_hour = _today.getUTCHours();
  if (clickday =="today" && now_hour < 14 ){
    var finToday = createDateAsUTC(_today);
    return finToday;
  }
  if (clickday == "today" && now_hour >= 14){
    day_difference = 1;
  }
  else if (day_number[clickday] > todayDay){
    day_difference = day_number[clickday] - todayDay;
  }
  else if (day_number[clickday] < todayDay){
    day_difference = 7 - (todayDay - day_number[clickday]);
  }
  var finToday = createDateAsUTC(_today);
  var _clickday = new Date(finToday.getTime() + (day_difference * 1000 * 60 * 60 * 24));
  return _clickday;
}
/*
This function is to calculate current month's start day.
*/
exports.thisMonthStartDay = function(month) {
  let startOfMonth;
  if (month == "thismonth") {
    startOfMonth = moment().startOf('month').toDate();
  } else {
    startOfMonth = moment(year + '-' + month_number[month] + '-01').startOf('month').toDate();
  }
  return startOfMonth;
}
/*
This function is to calculate current month's end day.
*/
exports.thisMonthEndDay = function(month) {
  let endOfMonth;
  if (month == "thismonth") {
    endOfMonth = moment().endOf('month').toDate();
  } else {
    endOfMonth = moment(year + '-' + month_number[month] + '-01').endOf('month').toDate();
  }
  return endOfMonth;
}
