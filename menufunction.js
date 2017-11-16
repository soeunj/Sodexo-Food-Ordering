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
var month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var thisweek_date = [];
exports.date_to_string = function(date) {
  if (date < 10) date = '0' + date;
  return date;
}
date_to_string = function(date) {
  if (date < 10) date = '0' + date;
  return date;
}
exports.forTodayMenu = function() {
  var date = date_to_string(day);
  var _month = date_to_string(month + 1);
  var today_date = year + '-' + _month + '-' + date;
  console.log(today_date);
  return today_date;
}

function thisweek() {
  let today = new Date().getDay();
  let today_date = tome();
  for (let i = 0; i <= 6; i++) {
    let difference_between_today_and_i = i - today;
    if (i == today) {
      thisweek_date.push(today_date);
    } else if ((day + difference_between_today_and_i) > month_day[month]) {
      let _month = month + 2;
      let _year = year;
      if (_month > 11) {
        _year = year + 1;
        _month = '01';
      }
      thisweek_date.push(_year + '-' + _month + '-0' + (day + difference_between_today_and_i - month_day[month]));
    } else if ((day + difference_between_today_and_i) <= 0) {
      let _month = month;
      let _year = year;
      if (_month == 0) {
        _year = year - 1;
        _month = '12';
      }
      thisweek_date.push(_year + '-' + _month + '-' + (month_day[month] + day - difference_between_today_and_i));
    } else {
      let _day = date_to_string(day + difference_between_today_and_i);
      let _month = date_to_string(month + 1);
      thisweek_date.push(year + '-' + _month + '-' + _day);
    }
  }
}
exports.get_thisweek = function(){
  thisweek();
  console.log(thisweek_date);
  return thisweek_date;
}
function tome() {
  var date = date_to_string(day);
  var _month = date_to_string(month + 1);
  var today_date = year + '-' + _month + '-' + date;
  return today_date;
}
exports.clickDayOfMenu = function(click) {
  console.log(click);
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
exports.forMenuFetch = function(clickday) {
  console.log(thisweek_date[day_number[clickday]]);
  return thisweek_date[day_number[clickday]];
}
