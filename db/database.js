const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost:27017/foodorder');
module.exports = {mongoose};
