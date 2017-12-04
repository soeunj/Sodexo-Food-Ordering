const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();
function clickmenu(id) {
  var data = {
    "id": id
  };
  let clickday = id.toString().split('_')[1];
  if ((day_num[clickday] > today_day) || (clickday== "today")) {
    sendOrderData(data);
  } else if (day_num[clickday] == today_day) {
    if (now_hour < 14) {
      sendOrderData(data);
    } else {
      alert("It is too late to order. Today's menu should be ordered before 14 o'clock.");
    }
  } else {
    alert("This day is not available to order.");
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
      //console.log('success to send');
      //console.log(data);
      //setTimeout(function(){ window.location = '/order'; }, 500);
    }
  });
}
function submitOrder() {
  if (confirm("Would you like to confirm your order?")) {
    alert("Success to order");
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
function loadstat(orderdata) {
  var html = "";
  html += "<ul class='nav navbar-nav'>";
  html += "<li><a href='/'>HOME<span style='font-size:16px;' class='pull-right hidden-xs glyphicon glyphicon-home'></span></a></li>";
  html += "<li class='dropdown'>";
  html += "<a href='/menu' class='dropdown-toggle' data-toggle='dropdown'>MENU<span class='caret'></span><span style='font-size:16px;' class='pull-right hidden-xs glyphicon glyphicon-cutlery'></span></a>";
  html += "<ul class='dropdown-menu' role='menu'>";
  html += "<li><a href='/menu'>TODAY</a></li>";
  html += "<li><a href='/menu/mon'>MONDAY</a></li>";
  html += "<li><a href='/menu/tue'>TUESDAY</a></li>";
  html += "<li><a href='/menu/wed'>WEDNESDAY</a></li>";
  html += "<li><a href='/menu/thu'>THURSDAY</a></li>";
  html += "<li><a href='/menu/fri'>FRIDAY</a></li>";
  html += "</ul></li>";
  html += "<li><a href='/order'>ORDER<span style='font-size:16px;' class='pull-right hidden-xs glyphicon glyphicon-shopping-cart'></span></a></li>";
  html += "<li class='active dropdown'>";
  html += "<a href='/statistic' class='dropdown-toggle' data-toggle='dropdown'>STATISTIC<span class='caret'></span><span style='font-size:16px;' class='pull-right hidden-xs glyphicon glyphicon-stats'></span></a>";
  html += "<ul class='dropdown-menu' role='menu'>";
  html += "<li><a href='/statistic'>TODAY</a></li><li><a href='/statistic/thismonth'>OTHER</a></li>";
  html += "</ul></li></ul>";
  $('#tab').append(html);
  var html1 = "";
  html1 += "<h2>TODAY'S ORDER</h2><p>This graph shows today's order.</p></br>";
  html1 += "<canvas id='myChart' width='800' height='450'></canvas>";
  $('#main').append(html1);
  today_draw_chart(orderdata);
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
  for (let i = 0; i < orderdata.length; i++) {
    var index_label = _labels_index[orderdata[i]['_id']];
    _data[index_label] = orderdata[i]['count'];
  }
  var config = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: _data,
        backgroundColor: ["#4F5C2F", "#89A04F", "#B2C485", "#CADBAB", "#AAB683", "#909779", "#737764"],
        label: 'Dataset 1'
      }],
      labels: ['Kotiruoka 1.', 'Kotiruoka 2.', 'Kasvisruoka', 'Kasviskeitto', 'Leipälounas', 'Leipälounas', 'Jälkiruoka']
    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  };

  var ctx = document.getElementById("myChart").getContext("2d");
  window.myDoughnut = new Chart(ctx, config);

}

function eachday_draw_chart(orderdata, type, month) {
  let num_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let _data, _labels;
  for (let j = 0; j < num_month[month]; j++) {
    _data.push(0);
    _labels.push(j + 1);
  }
  for (let i = 0; i < orderdata.length; i++) {
    var index_label = _labels_index[orderdata[i]['_id']];
    _data[index_label] = orderdata[i]['count'];
  }
  var config = {
    type: 'line',
    data: {
      datasets: [{
        data: _data,
        backgroundColor: ["#4F5C2F", "#89A04F", "#B2C485", "#CADBAB", "#AAB683", "#909779", "#737764"],
        label: 'Dataset 1'
      }],
      labels: _labels
    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  };
  window.onload = function() {
    var ctx = document.getElementById("myChart").getContext("2d");
    window.myDoughnut = new Chart(ctx, config);
  };
}
function loadstat1(orderdata, month, year) {
  var html = "";
  html += "<ul class='nav navbar-nav'>";
  html += "<li><a href='/'>HOME<span style='font-size:16px;' class='pull-right hidden-xs glyphicon glyphicon-home'></span></a></li>";
  html += "<li class='dropdown'>";
  html += "<a href='/menu' class='dropdown-toggle' data-toggle='dropdown'>MENU<span class='caret'></span><span style='font-size:16px;' class='pull-right hidden-xs glyphicon glyphicon-cutlery'></span></a>";
  html += "<ul class='dropdown-menu' role='menu'>";
  html += "<li><a href='/menu'>TODAY</a></li>";
  html += "<li><a href='/menu/mon'>MONDAY</a></li>";
  html += "<li><a href='/menu/tue'>TUESDAY</a></li>";
  html += "<li><a href='/menu/wed'>WEDNESDAY</a></li>";
  html += "<li><a href='/menu/thu'>THURSDAY</a></li>";
  html += "<li><a href='/menu/fri'>FRIDAY</a></li>";
  html += "</ul></li>";
  html += "<li><a href='/order'>ORDER<span style='font-size:16px;' class='pull-right hidden-xs glyphicon glyphicon-shopping-cart'></span></a></li>";
  html += "<li class='active dropdown'>";
  html += "<a href='/statistic' class='dropdown-toggle' data-toggle='dropdown'>STATISTIC<span class='caret'></span><span style='font-size:16px;' class='pull-right hidden-xs glyphicon glyphicon-stats'></span></a>";
  html += "<ul class='dropdown-menu' role='menu'>";
  html += "<li><a href='/statistic'>TODAY</a></li><li><a href='/statistic/thismonth'>OTHER</a></li>";
  html += "</ul></li></ul>";
  $('#tab').append(html);
  var html1 = "";
  html1 += "<h2>STATISTIC</h2><p>This graph is blahblah.</p></br>";
  html1 += "<div class='dropdown'>";
  html1 += "<button class='btn btn-success dropdown-toggle' type='button' data-toggle='dropdown'>Month<span class='caret'></span></button>";
  html1 += "<ul class='dropdown-menu' role='menu' aria-labelledby='menu1'>";
  html1 += "<li><a href='/statistic/jan'>January</a></li><li><a href='/statistic/feb'>February</a></li><li><a href='/statistic/mar'>March</a></li><li><a href='/statistic/apr'>April</a></li>";
  html1 += "<li><a href='/statistic/may'>May</a></li><li><a href='/statistic/jun'>June</a></li><li><a href='/statistic/jul'>July</a></li><li><a href='/statistic/aug'>August</a></li>";
  html1 += "<li><a href='/statistic/sep'>September</a></li><li><a href='/statistic/oct'>October</a></li><li><a href='/statistic/nov'>November</a></li><li><a href='/statistic/dec'>December</a></li>";
  html1 += "</ul></div><canvas id='myChart' width='800' height='450'></canvas>";
  $('#main').append(html1);
  eachday_draw_chart(orderdata, month, year);
}

function eachday_draw_chart(orderdata, month, year) {
  let num_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let _data = new Array(),
    _labels = new Array();
  for (let j = 0; j < num_month[month]; j++) {
    _data.push(0);
    _labels.push(new Date(year, month, j + 1));
  }
  for (let i = 0; i < orderdata.length; i++) {
    let arrindex = new Date(orderdata[i]['_id']);
    _data[arrindex.getDate() - 1] = orderdata[i]['count'];
  }
  var config = {
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
      legend: {
        position: 'top',
      },
      animation: {
        animateScale: true,
        animateRotate: true
      },
      scales: {
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
    var ctx = document.getElementById("myChart").getContext("2d");
    window.myDoughnut = new Chart(ctx, config);
}
