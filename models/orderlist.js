var mongoose = require('mongoose');

var OrderList = mongoose.model('OrderList',{
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
