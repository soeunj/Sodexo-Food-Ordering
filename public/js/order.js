function submitOrder() {
  if (confirm("Would you like to confirm your order?")) {
    alert("Success to order");
  }
}
function submitAll() {
  $.get("/submitorder", function(data, status) {
    setTimeout(function(){ location.reload(); }, 100);
  });
}
function confirm_count(id){
  var count_id = id.split('_')[0]+'_count';
  var value_c = document.getElementById(count_id).value;
  if(value_c <= 0){
    alert("Sorry. The count of the meal should be more than 1.");
    document.getElementById(count_id).value = 1;
    return 0;
  }
  var data={
    id:id.split('_')[0],
    count:value_c
  }
  $.ajax({
    type: 'POST',
    url: '/confirmcount',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data, status) {
      console.log('success to send');
      setTimeout(function(){ alert("success to change"); location.reload(); }, 100);
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
