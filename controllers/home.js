exports.homePage = function(req, res, next){
  res.render('index.ejs',{
    data: "",
    dayofmenu: "",
    date: "",
    type: "index",
    month: "",
    year: ""
  });
};
