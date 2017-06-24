$(document).ready(function(event){
  $('#create_category').on("click", function(){
    $.ajax({
      url: '/admin/categories',
      type: 'post',
      data: {name: $('#name').val(), description: $('#description').val() },
      success: function(result){
        window.location.href='/admin/categories';
      }
    });
  });
  $('.delete_category').on("click", function(){
    if(confirm('Are you sure?') == true){
        $.ajax({
        url: '/admin/categories/' + $(this).data('id'),
        type: 'delete',
        contentType: 'application/json',
        success: function(response){
          var tbody = $('tbody');
          tbody.html('');
          response.categories.forEach(function(cate){
              tbody.append('\
                <tr>\
                  <td scope="row">' + cate.rnum +'</td>\
                  <td>' + cate.name+ '</td>\
                  <td>'+ cate.description +'</td>\
                  <td>\
                    <button type="button" class="btn btn-secondary">Edit</button>\
                    <button type="button" class="btn btn-danger delete_category" data-id="' + cate.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
            });
          }
        });
      }
  });

  $('#category_search').on("click", function(){
    if($('#string_search').val()){
      $.ajax({
      url: '/admin/categories/' + $('#string_search').val(),
      type: 'get',
      contentType: 'application/json',
      success: function(response){
          var tbody = $('tbody');
          tbody.html('');
          response.categories.forEach(function(cate){
              tbody.append('\
                <tr>\
                  <td scope="row">' + cate.rnum +'</td>\
                  <td>' + cate.name+ '</td>\
                  <td>'+ cate.description +'</td>\
                  <td>\
                    <button type="button" class="btn btn-secondary">Edit</button>\
                    <button type="button" class="btn btn-danger delete_category" data-id="' + cate.id + '">Delete</button>\
                  </td>\
                </tr>\
                ')
            });
          }
    })
    }
    else{
      window.location.href = '/admin/categories';
    }

  });
});
