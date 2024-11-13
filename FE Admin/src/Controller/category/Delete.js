let accessToken = localStorage.getItem('accessToken');
$(document).on('click', '.btn_delete', function(){
    let id = $(this).attr('id');
    document.querySelector('.popup_confirm').style.display = "block";
    $('.btn_no').click(function(){
        document.querySelector('.popup_confirm').style.display = "none";
    })
    $('.btn_yes').click(async function(){
        await $.ajax({
            url: `https://p-nestjs-ecommerce.onrender.com/api/v1/categories/${id}`,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken, // Thêm access token vào header
                'Content-Type': 'application/json',
            },
            success: function(response) {
                document.querySelector('.popup_confirm').style.display = "none";
                alert('Bạn đã xóa thành công');
            },
            error: function(response) {
                console.log(response);
            }
          });
    })
});