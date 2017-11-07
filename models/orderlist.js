var mongoose = require('mongoose');

var OrderList = mongoose.model('OrderList',{
  date:{
    type: String,
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
