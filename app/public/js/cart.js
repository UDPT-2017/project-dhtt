$(document).ready(function(event){
  $('.item_add').on("click", function(){
    $.ajax({
      url: '/addToCart/' + $(this).attr('id'),
      type: 'get',
      contentType: 'application/json',
      data: {quantity: $('.value1 span').text()},
      success: function(result){
        window.location.href='/';
      }
    });
  });
});
