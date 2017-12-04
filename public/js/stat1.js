function loadstat1(orderdata, month, year) {
  console.log(orderdata);
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
