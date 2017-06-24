$(document).ready(function(event){
  $('.delete_promotions').on("click", function(){
    if(confirm('Are you sure?') == true){
        $.ajax({
        url: '/admin/promotions/' + $(this).data('id'),
        type: 'delete',
        contentType: 'application/json',
        success: function(response){
          var tbody = $('tbody');
          tbody.html('');
          response.promotions.forEach(function(item){
              tbody.append('\
                <tr>\
                  <td scope="row">' + item.rnum +'</td>\
                  <td>' + item.discount+ '</td>\
                  <td>'+ item.start_date +'</td>\
                  <td>' + item.end_date + '</td>\
                  <td>' + item.merchandise_name + '</td>\
                  <td>\
                    <button type="button" class="btn btn-secondary">Edit</button>\
                    <button type="button" class="btn btn-danger delete_promotions" data-id="' + item.id + '">Delete</button>\
                  </td>\
                </tr>\
                ') 
            });
          }
        });
      }
  });

  $('#promotions_search').on("click", function(){
    if($('#string_search').val()){
      $.ajax({
      url: '/admin/promotions/' + $('#string_search').val(),
      type: 'get',
      contentType: 'application/json',
      data: {type: 'search'},
      success: function(response){
          var tbody = $('tbody');
          tbody.html('');
          response.promotions.forEach(function(item){
              tbody.append('\
                <tr>\
                  <td scope="row">' + item.rnum +'</td>\
                  <td>' + item.discount+ '</td>\
                  <td>'+ item.start_date +'</td>\
                  <td>' + item.end_date + '</td>\
                  <td>' + item.merchandise_name + '</td>\
                  <td>\
                    <button type="button" class="btn btn-secondary">Edit</button>\
                    <button type="button" class="btn btn-danger delete_promotions" data-id="' + item.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
          });
        }
    })
    }
    else{
      window.location.href='/admin/promotions';
    }
  });

  $('#create_promotions').on("click", function(){
    $.ajax({
      url: '/admin/promotions',
      type: 'post',
      data: {discount: $('#discount').val(), start_date: $('#start_date').val(), end_date: $('#end_date').val(), merchandise_id: $('#merchandise_id').val()},
      success: function(result){
        window.location.href='/admin/promotions';
      }
    });
  });
  $('#filter_promotions').on("click", function(){
    $.ajax({
      url: '/admin/promotions/' + $('#merchandise_id').val(),
      type: 'get',
      contentType: 'application/json',
      data: {type: 'filter'},
      success: function(response){
          var tbody = $('tbody');
          tbody.html('');
          response.promotions.forEach(function(item){
              tbody.append('\
                <tr>\
                  <td scope="row">' + item.rnum +'</td>\
                  <td>' + item.discount+ '</td>\
                  <td>'+ item.start_date +'</td>\
                  <td>' + item.end_date + '</td>\
                  <td>' + item.merchandise_name + '</td>\
                  <td>\
                    <button type="button" class="btn btn-secondary">Edit</button>\
                    <button type="button" class="btn btn-danger delete_promotions" data-id="' + item.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
            });
          }
    });
  });
});
