$(document).ready(function(event){
  $('.delete_user').on("click", function(){
    if(confirm('Are you sure?') == true){
        $.ajax({
        url: '/admin/users/' + $(this).data('id'),
        type: 'delete',
        contentType: 'application/json',
        success: function(response){
          var tbody = $('tbody');
          tbody.html('');
          response.users.forEach(function(user){
              tbody.append('\
                <tr>\
                  <td scope="row">' + user.rnum +'</td>\
                  <td>' + user.name+ '</td>\
                  <td>'+ user.email +'</td>\
                  <td>'+ user.phone +'</td>\
                  <td>'+ user.address +'</td>\
                  <td>\
                    <button type="button" class="btn btn-danger delete_category" data-id="' + user.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
            });
          }
        });
      }
  });
  $('#user_search').on("click", function(){
    if($('#string_search').val()){
      $.ajax({
      url: '/admin/users/' + $('#string_search').val(),
      type: 'get',
      contentType: 'application/json',
      success: function(response){
          var tbody = $('tbody');
          tbody.html('');
         response.users.forEach(function(user){
              tbody.append('\
                <tr>\
                  <td scope="row">' + user.rnum +'</td>\
                  <td>' + user.name+ '</td>\
                  <td>'+ user.email +'</td>\
                  <td>'+ user.phone +'</td>\
                  <td>'+ user.address +'</td>\
                  <td>\
                    <button type="button" class="btn btn-danger delete_category" data-id="' + user.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
            });
          }
    });
    }
  });
});
