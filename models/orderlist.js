var mongoose = require('mongoose');

var OrderList = mongoose.model('OrderList',{
  session:{
    type:String,
  },
  date:{
    type: Date,
  },
  menu:{
    type: String,
    required: true
  },
  count:{
    type: Number,
    required: true
  },
});

module.exports = {OrderList};
