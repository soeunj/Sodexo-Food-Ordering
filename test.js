var datefunction = require('./date');
var d = new Date();
let startOfMonth = datefunction.thisMonthStartDay("thismonth");
let endOfMonth = datefunction.thisMonthEndDay("thismonth");

console.log(startOfMonth);
let range_min = new Date(startOfMonth.getFullYear(),startOfMonth.getMonth(),startOfMonth.getDate());
console.log(range_min);
let range_min1 = new Date(startOfMonth.getFullYear(),startOfMonth.getMonth(),startOfMonth.getDate()+1);
console.log(range_min1.toString());
