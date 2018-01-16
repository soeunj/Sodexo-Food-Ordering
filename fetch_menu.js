const request = require("request-promise");
const date = require('./date');
/*
This function is to fetch menu from Sodexo page.
clickday is Monday, Tuesday, Wednesday, Thursday, or Friday and date.thisDate function generates actual date.
Using this date_splited, make url and fetch menu data. After that, return the data as Json format.
*/
exports.fetch_menu = function(clickday){
  var date_splited = date.thisDate(clickday);
  var url = "https://www.sodexo.fi/ruokalistat/output/daily_json/16365/" + date_splited.getFullYear() + "/" + (date_splited.getMonth()+1) + "/" + date_splited.getDate() + "/fi";
  return request(url).then(body => {
      let responseJSON = JSON.parse(body);
      return responseJSON['courses'];
  });
}
