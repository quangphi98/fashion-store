$(document).ready( function(){
    let categoryId = localStorage.getItem('categoryId');  // Retrieve the id
    $.ajax({
        url: `https://p-nestjs-ecommerce.onrender.com/api/v1/categories/${categoryId}`,
        type: 'Get',
        dataType: 'json', // added data type
        success: function(res) {
            var Update_name = document.querySelector('#name_Category');
            var Update_img = document.querySelector('#img_Category');
            var Update_desc = document.querySelector('#decs_Category');

            Update_name.value = res.data.name;
            Update_img.value = res.data.image;
            Update_desc.value = res.data.description;
        }
    })

    $('.btn_update').click(async function(){
        await $.ajax({
            url: `https://p-nestjs-ecommerce.onrender.com/api/v1/categories/${categoryId}`,
            type: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + accessToken, // Thêm access token vào header
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                name: $("#name_Category").val(),
                image: $("#img_Category").val(),
                description: $("#decs_Category").val()
            }),
            success: function(response) {
              var messeage = 'Sửa thành công';
              alert(messeage);
              window.location.href = './List_category.html';
            },
            error: function(response) {
                console.log(response);
            }
          });
    })
});
