exports.homePage = function(req, res, next){
  console.log(req.sessionID);
  res.render('index.ejs',{
    data: "",
    dayofmenu: "",
    date: "",
    type: "index",
    month: "",
    year: ""
  });
};
