var mongoose = require('mongoose');

var Menu = mongoose.model('menu',{
  number:{
    type: Number
  },
  date:{
    type: String
  },
  menu:{
    type: String,
    required: true
  },
  title_fi:{
    type: String,
  },
  title_en:{
    type: String,
  },
  desc_fi:{
    type:String,
  },
  desc_en:{
    type:String,
  },
  price:{
    type: String,
    required: true
  }
});

module.exports = {Menu};
