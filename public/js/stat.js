function draw_chart(chart_type, chart_data) {

  var config = {
    type: chart_type,
    data: {
      datasets: [{
        data: chart_data,
        backgroundColor: ["#4F5C2F", "#89A04F", "#B2C485", "#CADBAB", "#AAB683", "#909779", "#737764"],
        label: 'The number of the meal\'s order'
      }],
      labels: ['Kotiruoka 1.', 'Kotiruoka 2.', 'Kasvisruoka', 'Kasviskeitto', 'Leipälounas', 'Leipälounas', 'Jälkiruoka']
    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
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
