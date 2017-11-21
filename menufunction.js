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
var month_number = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

exports.today_chart = function(){
  let chart_today = new Date();
return _day_number[chart_today.getDay()] + ' ' + month_number[chart_today.getMonth()] + ' ' + chart_today.getDate() + ' ' + chart_today.getFullYear();
}
exports.date_to_string = function(date) {
  if (date < 10) date = '0' + date;
  return date;
}
exports.thisDate = function(clickday){
  if(clickday == "today"){
    return new Date();
  }
  var today_day = new Date().getDay();
  var day_difference = day_number[clickday] - today_day;
  var _today = new Date(year, month, day);
  console.log(_today.getTime());
  var _clickday = new Date(_today.getTime()+(day_difference*1000*60*60*24));
  console.log(_clickday);
  return _clickday;
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
