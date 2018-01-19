var day_number = {
  "today" :today_day,
  "mon": 1,
  "tue": 2,
  "wed": 3,
  "thu": 4,
  "fri": 5
};
function thisDate(clickday) {
  var day_difference = 0;
  var _today = new Date();
  var todayDay = new Date().getDay();
  var now_hour = _today.getHours();
  if (clickday =="today" && now_hour < 14 ){
    return _today;
  }
  if (clickday == "today" && now_hour >= 14){
    day_difference = 1;
  }
  else if (day_number[clickday] > todayDay){
    day_difference = day_number[clickday] - todayDay;
  }
  else if (day_number[clickday] < todayDay){
    day_difference = 7 - (todayDay - day_number[clickday]);
  }
  var _clickday = new Date(_today.getTime() + (day_difference * 1000 * 60 * 60 * 24));
  return _clickday;
}

function clickmenu(click_id) {
  var data = {
    "id": click_id
  };
  var year = new Date().getFullYear();
  var month = new Date().getMonth();
  var day = new Date().getDate();
  var split_id = click_id.split('_')[1];
  var clickdate = thisDate(split_id);
  var clickdate_month = clickdate.getMonth();
  var clickdate_day = clickdate.getDate();
  var clickdate_year = clickdate.getFullYear();
  if( clickdate_year == year && clickdate_month == month && clickdate_day == day && now_hour >= 14){
    alert("It is too late to order. You should order today lunch before 14 o'clock.");
    return 0;
  }
  else{
    sendOrderData(data);
  }
}

function sendOrderData(data) {
  $.ajax({
    type: 'POST',
    url: '/menu',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
      setTimeout(function() {
        console.log('success to send'); window.location = '/order';
      }, 500);
    }
  });
}

function submitOrder(data) {
  if(data.length == 0){
    alert("Your order list is empty.\n Please add menus which you want to order.");
  }
  else if (confirm("Would you like to confirm your order?")) {
    alert("Success to order");
    submitAll();
  }
}

function submitAll() {
  $.get("/submitorder", function(data, status) {
    setTimeout(function() {
      location.reload();
    }, 100);
  });
}

function confirm_count(id) {
  var count_id = id.split('_')[0] + '_count';
  var value_c = document.getElementById(count_id).value;
  if (value_c <= 0) {
    alert("Sorry. The count of the meal should be more than 1.");
    document.getElementById(count_id).value = 1;
    return 0;
  }
  var data = {
    id: id.split('_')[0],
    count: value_c
  }
  $.ajax({
    type: 'POST',
    url: '/confirmcount',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data, status) {
      console.log('success to send');
      setTimeout(function() {
        alert("success to change");
        location.reload();
      }, 100);
    }
  });
}

function delete_order(id) {
  var index = id[6];
  var delete_order = {
    id: data[index]['_id']
  };
  $.ajax({
    type: 'POST',
    url: '/delete',
    data: JSON.stringify(delete_order),
    dataType: 'json',
    contentType: 'application/json',
    success: function() {
      console.log('success to send');
      location.reload();
    }
  });
}


function today_draw_chart(orderdata) {
  let _labels_index = {
    'Kotiruoka 1.': 0,
    'Kotiruoka 2.': 1,
    'Kasvisruoka': 2,
    'Kasviskeitto': 3,
    'Leipälounas': 4,
    'Erikoislounas': 5,
    'Jälkiruoka': 6
  };
  let _data = [0, 0, 0, 0, 0, 0, 0];
  let _max = 0;
  for (let i = 0; i < orderdata.length; i++) {
    var index_label = _labels_index[orderdata[i]['_id']];
    _data[index_label] = orderdata[i]['count'];
    if (orderdata[i]['count'] >= _max){
      _max = orderdata[i]['count'];
    }
  }
  let config = {
    type: 'horizontalBar',
    data: {
      datasets: [{
        data: _data,
        backgroundColor: ["#4F5C2F", "#89A04F", "#B2C485", "#CADBAB", "#AAB683", "#909779", "#737764"]
      }],
      labels: ['Kotiruoka 1.', 'Kotiruoka 2.', 'Kasvisruoka', 'Kasviskeitto', 'Leipälounas', 'Leipälounas', 'Jälkiruoka']
    },
    options: {
      responsive: true,
      legend: {
        display:false
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            max : _max + 10
          }
        }]
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  };
  let ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, config);
}

function eachday_draw_chart(orderdata, _month, _year) {
  let num_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let _data = new Array(),
    _labels = new Array();
  for (let j = 0; j < num_month[_month]; j++) {
    _data.push(0);
    _labels.push(new Date(_year, _month, j + 1));
  }
  for (let i = 0; i < orderdata.length; i++) {
    let arrindex = new Date(orderdata[i]['_id']);
    _data[arrindex.getDate() - 1] = orderdata[i]['count'];
  }
  let config = {
    type: 'line',
    data: {
      datasets: [{
        data: _data,
        backgroundColor: ["#89A04F"],
        label: 'The number of meal orders'
      }],
      labels: _labels
    },
    options: {
      responsive: true,
      animation: {
        animateScale: false,
        animateRotate: true
      },
      scales: {
        yAxes: [{
          ticks:{
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            callback: function(value, index, values) {
              return value.toString().slice(4, 15);
            }
          }
        }]
      }
    }
  };
  let ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, config);
}
