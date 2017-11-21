function clickmenu(id) {
  var data = {
    "id": id
  };
  if ((day_num[clickday] > today_day) || (clickday == "TODAY MENU")) {
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
  console.log(data);
  $.ajax({
    type: 'POST',
    url: '/menu',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
      console.log('success to send');
      console.log(data);
      setTimeout(function(){ window.location = '/order'; }, 500);
    }
  });
}
