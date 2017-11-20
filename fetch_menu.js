var request = require("request-promise");
var menufunc = require('./menufunction');
exports.fetch_menu = function(clickday){
  var date_splited = menufunc.thisDate(clickday);
  var url = "https://www.sodexo.fi/ruokalistat/output/daily_json/16365/" + date_splited.getFullYear() + "/" + (date_splited.getMonth()+1) + "/" + date_splited.getDate() + "/fi";
  return request(url).then(body => {
      let responseJSON = JSON.parse(body);
      return responseJSON['courses'];
  });
}
