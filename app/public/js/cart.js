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
  $('.value-plus').on('click', function(){
    var divUpd = $(this).parent().find('.value'), newVal = parseInt(divUpd.text(), 10)+1;
    divUpd.text(newVal);
    $.ajax({
      url: '/cart/plus/' + $('.quantity_item').attr('id'),
      type: 'get',
      success: function(response){
          var total = $('.total1');
          total.html('');
          response.items.forEach(function(item){
            var price = parseInt(item.price) * newVal;
              total.append('\
                <li>' + item.name + '<i>-</i> <span id="'+ item.id + '">$' + price + '</span></li>\
                <li>Total <i>-</i> <span>$' + response.total + '</span></li>\
                ')

            });
      }
    });
  });

  $('.value-minus').on('click', function(){
    alert("click");
    var divUpd = $(this).parent().find('.value'), newVal = parseInt(divUpd.text(), 10)-1;
      if(newVal>=1) divUpd.text(newVal);
    $.ajax({
      url: '/cart/minus/' + $('.quantity_item').attr('id'),
      type: 'get',
      success: function(response){
          var total = $('.total1');
          total.html('');
          response.items.forEach(function(item){
            if(newVal > 0){
              var price = parseInt(item.price) * newVal;
              total.append('\
                <li>' + item.name + '<i>-</i> <span id="'+ item.id + '">$' + price + '</span></li>\
                <li>Total <i>-</i> <span>$' + response.total + '</span></li>\
                ')
            }
            else{
              var tbody = $('.checkout-right');
              tbody.html('');
              var title = $('.title');
              title.html('');
              title.append('\
                <h3>Your shopping cart contains: <span>0 Product</span></h3>\
                ')
            }

          var cart = $('.total');
          cart.html('');
          cart.append('\
            <span class="simpleCart_total"></span><span id="simpleCart_quantity" class="simpleCart_quantity">0</span> item</div>\
            <img src="' +  response.url + '/images/bag.png" alt="" />\
            <p><a href="javascript:;" class="simpleCart_empty">Empty Cart</a></p>\
            ')
          });


      }
    });
  });

});
