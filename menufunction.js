const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();

exports.forTodayMenu = function(){
  var date = day;
  var _month = month+1;
  if(day < 10) date = '0'+day;
  if(_month < 10) _month = '0'+_month;
  var today_date = year+'-'+_month+'-'+date;
  console.log(today_date);
  return today_date;
}

function tome(){
  var date = day;
  var _month = month+1;
  if(day < 10) date = '0'+day;
  if(_month < 10) _month = '0'+_month;
  var today_date = year+'-'+_month+'-'+date;
  console.log(today_date);
  return today_date;
}
exports.clickDayOfMenu = function(click){
  console.log(click);
  if(click == 'mon'){
    return "MONDAY MENU"
  }
  else if(click=='tue'){
    return "TUESDAY MENU"
  }
  else if(click=='wed'){
    return "WEDNESDAY MENU"
  }
  else if(click=='thu'){
    return "THURSDAY MENU"
  }
  else if(click=='fri'){
    return "FRIDAY MENU"
  }
  else{
    return "TODAY MENU"
  }
}
exports.forMenuFetch = function(clickday){
  var today = new Date().getDay();
  var day_number = {"mon":1, "tue":2, "wed":3, "thu":4, "fri":5};
  var month_day = [31,28,31,30,31,30,31,31,30,31,30,31];
  var difference_betweendays = day_number[clickday]-today;
  if(difference_betweendays==0){
      return tome();
    }
    else if((day+difference_betweendays)>month_day[month]){
      var _month = month+2;
      if(_month < 10) _month = '0'+month;
      console.log(year+'-'+_month+'-0'+(day + difference_betweendays - month_day[month]));
      return year+'-'+_month+'-0'+(day + difference_betweendays - month_day[month]);
    }
    else if((day+difference_betweendays)<=0){
      var _month = month;
      if(_month <10) _month = '0'+month;
      console.log(year+'-'+_month+'-'+(month_day[month] + day - difference_betweendays));
      return year+'-'+_month+'-'+(month_day[month] + day - difference_betweendays);
    }
    else{
      var _day = day + difference_betweendays;
      var _month = month+1;
      if(_day < 10) _day = '0'+_day;
      if(_month < 10) _month = '0'+_month;
      console.log(year+'-'+_month+'-'+_day);
      return year+'-'+_month+'-'+_day;
    }
}
