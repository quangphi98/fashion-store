let accessToken = localStorage.getItem('accessToken');
$(document).on('click', '.delete', function(){
    let idProduct = $(this).attr('id');
    document.querySelector('.popup_confirm').style.display = "block";
    $('#no').click(function(){
    document.querySelector('.popup_confirm').style.display = "none";
    })
    $('#yes').click(async function(){
        console.log(idProduct);
        await $.ajax({
            url: `https://p-nestjs-ecommerce.onrender.com/api/v1/products/${idProduct}`,
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