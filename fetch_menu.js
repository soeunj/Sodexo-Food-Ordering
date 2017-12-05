const request = require("request-promise");
const date = require('./date');

exports.fetch_menu = function(clickday){
  var date_splited = date.thisDate(clickday);
  var url = "https://www.sodexo.fi/ruokalistat/output/daily_json/16365/" + date_splited.getFullYear() + "/" + (date_splited.getMonth()+1) + "/" + date_splited.getDate() + "/fi";
  return request(url).then(body => {
      let responseJSON = JSON.parse(body);
      return responseJSON['courses'];
  });
}
