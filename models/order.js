var mongoose = require('mongoose');

var Order = mongoose.model('Order',{
  menu:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  orderingfooddate:{
    type: String,
    required: true
  },
  count:{
    type: Number,
    required: true
  }
});

module.exports = {Order};
