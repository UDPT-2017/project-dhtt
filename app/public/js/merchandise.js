$(document).ready(function(event){
  $('.delete_merchandise').on("click", function(){
    if(confirm('Are you sure?') == true){
        $.ajax({
        url: '/admin/merchandise/' + $(this).data('id'),
        type: 'delete',
        contentType: 'application/json',
        success: function(response){
          var tbody = $('tbody');
          tbody.html('');
          response.merchandise.forEach(function(item){
              if(item.image){
              tbody.append('\
                <tr>\
                  <td scope="row">' + item.rnum +'</td>\
                  <td>' + item.name+ '</td>\
                  <td>'+ item.description +'</td>\
                  <td>' + item.price + '</td>\
                  <td>'+ item.category_name +'</td>\
                  <td>\
                      <p> <img class = "face2" src="../uploads/' + item.image + '" style="width:200px;height:200px;border:1"> </p></td>\
                  <td>\
                    <button type="button" class="btn btn-secondary">Edit</button>\
                    <button type="button" class="btn btn-danger delete_category" data-id="' + item.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
            }
            else{
              tbody.append('\
                <tr>\
                  <td scope="row">' + item.rnum +'</td>\
                  <td>' + item.name+ '</td>\
                  <td>'+ item.description +'</td>\
                  <td>' + item.price + '</td>\
                  <td>'+ item.category_name +'</td>\
                  <td>\
                    <p> <img class = "face2" src="../images/no-image.png" style="width:200px;height:200px;border:1"> </p></td>\
                  <td>\
                    <button type="button" class="btn btn-secondary">Edit</button>\
                    <button type="button" class="btn btn-danger delete_category" data-id="' + item.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
            }
            });
          }
        });
      }
  });

  $('#merchandise_search').on("click", function(){
    if($('#string_search').val()){
      $.ajax({
      url: '/admin/merchandise/' + $('#string_search').val(),
      type: 'get',
      contentType: 'application/json',
      data: {type: 'search'},
      success: function(response){
          var tbody = $('tbody');
          tbody.html('');
          response.merchandise.forEach(function(item){
            if(item.image){
              tbody.append('\
                <tr>\
                  <td scope="row">' + item.rnum +'</td>\
                  <td>' + item.name+ '</td>\
                  <td>'+ item.description +'</td>\
                  <td>' + item.price + '</td>\
                  <td>'+ item.category_name +'</td>\
                  <td>\
                      <p> <img class = "face2" src="../uploads/' + item.image + '" style="width:200px;height:200px;border:1"> </p></td>\
                  <td>\
                    <button type="button" class="btn btn-secondary">Edit</button>\
                    <button type="button" class="btn btn-danger delete_category" data-id="' + item.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
            }
            else{
              tbody.append('\
                <tr>\
                  <td scope="row">' + item.rnum +'</td>\
                  <td>' + item.name+ '</td>\
                  <td>'+ item.description +'</td>\
                  <td>' + item.price + '</td>\
                  <td>'+ item.category_name +'</td>\
                  <td>\
                    <p> <img class = "face2" src="../images/no-image.png" style="width:200px;height:200px;border:1"> </p></td>\
                  <td>\
                    <button type="button" class="btn btn-secondary">Edit</button>\
                    <button type="button" class="btn btn-danger delete_category" data-id="' + item.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
            }
          });
        }
    })
    }
    else{
      window.location.href='/admin/merchandise';
    }
  });

  $('#create_merchandise').on("click", function(){
    $.ajax({
      url: '/admin/merchandise',
      type: 'post',
      data: {name: $('#name').val(), description: $('#description').val(), price: $('#price').val(), category_id: $('#category_id').val()},
      success: function(result){
        window.location.href='/admin/merchandise';
      }
    });
  });
  $('#filter_merchandise').on("click", function(){
    $.ajax({
      url: '/admin/merchandise/' + $('#category_id').val(),
      type: 'get',
      contentType: 'application/json',
      data: {type: 'filter'},
      success: function(response){
          var tbody = $('tbody');
          tbody.html('');
          response.merchandise.forEach(function(item){
              if(item.image){
              tbody.append('\
                <tr>\
                  <td scope="row">' + item.rnum +'</td>\
                  <td>' + item.name+ '</td>\
                  <td>'+ item.description +'</td>\
                  <td>' + item.price + '</td>\
                  <td>'+ item.category_name +'</td>\
                  <td>\
                      <p> <img class = "face2" src="../uploads/' + item.image + '" style="width:200px;height:200px;border:1"> </p></td>\
                  <td>\
                    <button type="button" class="btn btn-secondary">Edit</button>\
                    <button type="button" class="btn btn-danger delete_category" data-id="' + item.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
            }
            else{
              tbody.append('\
                <tr>\
                  <td scope="row">' + item.rnum +'</td>\
                  <td>' + item.name+ '</td>\
                  <td>'+ item.description +'</td>\
                  <td>' + item.price + '</td>\
                  <td>'+ item.category_name +'</td>\
                  <td>\
                    <p> <img class = "face2" src="../images/no-image.png" style="width:200px;height:200px;border:1"> </p></td>\
                  <td>\
                    <button type="button" class="btn btn-secondary">Edit</button>\
                    <button type="button" class="btn btn-danger delete_category" data-id="' + item.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
            }
            });
          }
    });
  });
});
