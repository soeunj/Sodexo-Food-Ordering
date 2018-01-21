const request = require("request-promise");
const date = require('./date');

/*
This variable is to change proper month format for url.
'getMonth()'' libarary returns 0 to 11. But, the month format is 01, 02, or something like this.
Therefor, we need to add plus one and if the month is less than 10, add '0' character in front of the month.
*/
var num_month = {
  0 : "01",
  1 : "02",
  2 : "03",
  3 : "04",
  4: "05",
  5: "06",
  6 : "07",
  7 : "08",
  8 : "09",
  9 : "10",
  10 : "11",
  11 : "12"
}
/*
This function is to change proper date format for url.
'getDate()' library returns date like 1 to 30 or 31. But, the date format for ulr is 01, 02, and so on.
Therefore, if the date is less than 10, we need to add '0' character in front of the date.
*/
function change_date(date){
  if (date < 10){
    return '0'+date;
  }
  else{
    return date;
  }
}
/*
This function is to fetch menu from Sodexo page.
clickday is Monday, Tuesday, Wednesday, Thursday, or Friday and date.thisDate function generates actual date.
Using this date_splited, make url and fetch menu data. After that, return the data as Json format.
*/
exports.fetch_menu = function(clickday){
  console.log(new Date());
  var date_splited = date.thisDate(clickday);
  var url = "https://www.sodexo.fi/ruokalistat/output/daily_json/16365/" + date_splited.getFullYear() + "/" + num_month[date_splited.getMonth()] + "/" + change_date(date_splited.getDate()) + "/fi";
  var a = date_splited.getDate();
  return request(url).then(body => {
    console.log(url);
      let responseJSON = JSON.parse(body);
      return responseJSON['courses'];
  });
}
