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
/*function today_draw_chart_1(orderdata, type) {
  let _data = [0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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
        label: "The number of today's meal order"
      }],
      labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
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
}*/
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
