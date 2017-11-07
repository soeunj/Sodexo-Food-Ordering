var mongoose = require('mongoose');

var Menu = mongoose.model('menu',{
  date:{
    type: String
  },
  menu:{
    type: String,
    required: true
  },
  fidescription:{
    type: String,
  },
  endescription:{
    type: String,
  },
  price:{
    type: String,
    required: true
  }
});

module.exports = {Menu};
