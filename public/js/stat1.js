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
  window.onload = function() {
    var ctx = document.getElementById("myChart").getContext("2d");
    window.myDoughnut = new Chart(ctx, config);
  };
}
