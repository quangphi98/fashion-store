//Create category
let accessToken = localStorage.getItem('accessToken');
$(".btn_create").click(async function(){
    if($("#name_Category").val() == '' && $("#decs_Category").val() == '' && $("#img_Category").val() == '')
    {
        console.log("Hãy nhập tất cả thông tin")
    }
    else if ($("#name_Category").val() == ''){
        var name_warnning = document.querySelector(".warnning_name");
        name_warnning.innerHTML = "Tên danh mục không được để trống";
    }  
    else if ($("#name_Category").val() == ''){
        var name_warnning = document.querySelector(".warnning_name");
        name_warnning.innerHTML = "Tên danh mục không được để trống";
    } 
    else if ($("#name_Category").val().charAt(0) !== 'Q' && $("#name_Category").val().charAt(1) !== 'P'){
        var name_warnning = document.querySelector(".warnning_name");
        name_warnning.innerHTML = "Tên danh mục không hợp lệ";
    } 
    else{
        await $.ajax({
            url: urlApiCategory,
            type: 'POST',
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
                $("#name_Category").val('');
                $("#img_Category").val('');
                $("#decs_Category").val('');
                alert('Thêm thành công');
            },
            error: function(response) {
                console.log(response);
            }
          });
    }
  });
