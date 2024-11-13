
const urlApiCategory = 'https://p-nestjs-ecommerce.onrender.com/api/v1/categories';
const urlApiLogin = 'https://p-nestjs-ecommerce.onrender.com/api/v1/auth/login'

//Login
$(document).ready(async function(){
    await $.ajax({
        url: urlApiLogin,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            email: 'admin@gmail.com',
            password: '123'
        }),
        success: function(response) {
          console.log(response);
          localStorage.setItem('accessToken',response.data.access_token);
        },
        error: function(response) {
            console.log(response);
        }
      });
});

// //Create category
// $(".btn_create").click(async function(){
//     if($("#name_Category").val() == '' && $("#decs_Category").val() == '' && $("#img_Category").val() == '')
//     {
//         console.log("Hãy nhập tất cả thông tin")
//     }
//     else if ($("#name_Category").val() == ''){
//         var name_warnning = document.querySelector(".warnning_name");
//         name_warnning.innerHTML = "Tên danh mục không được để trống";
//     }  
//     else if ($("#name_Category").val() == ''){
//         var name_warnning = document.querySelector(".warnning_name");
//         name_warnning.innerHTML = "Tên danh mục không được để trống";
//     } 
//     else if ($("#name_Category").val().charAt(0) !== 'Q' && $("#name_Category").val().charAt(1) !== 'P'){
//         var name_warnning = document.querySelector(".warnning_name");
//         name_warnning.innerHTML = "Tên danh mục không hợp lệ";
//     } 
//     else{
//         await $.ajax({
//             url: urlApiCategory,
//             type: 'POST',
//             headers: {
//                 'Authorization': 'Bearer ' + accessToken, // Thêm access token vào header
//                 'Content-Type': 'application/json',
//             },
//             data: JSON.stringify({
//                 name: $("#name_Category").val(),
//                 image: $("#img_Category").val(),
//                 description: $("#decs_Category").val()
//             }),
//             success: function(response) {
//               console.log(response);
//               console.log(accessToken);
//             },
//             error: function(response) {
//                 console.log(response);
//             }
//           });
//     }
//   });

//     //Get All Category
//    function getCategories(){
//     $(document).ready(async function(){
//         await $.ajax({
//             url: urlApiCategory,
//             type: 'Get',
//             dataType: 'json', // added data type
//             success: function(res) {
//                 let data = res.data ;
//                 for(key in data)
//                 {
//                     $('#categories').append(
//                         `
//                             <tr>
//                                 <td class="name_cate" id ="${data[key]._id}" >${data[key].name}</td>
//                                 <td class="img_cate">${data[key].image}</td>
//                                 <td class="desc_cate">${data[key].description}</td>
//                                 <td><button class="btn_update" id ="${data[key]._id}">Sửa</button></td>
//                                 <td><button class="btn_delete" id ="${data[key]._id}">Xóa</button></td>
//                             </tr>
//                         `
//                     )
//                 }
//             }
//         })
//       })
//    }

//   //Get Category
//   $(document).on('click', '.btn_update', async function(){

//         var id = $(this).attr('id');
//         window.location.href = "Update_category.html";
//         console.log('ID cần sửa:', id);
//         await $.ajax({
//             url: `https://p-nestjs-ecommerce.onrender.com/api/v1/categories/${id}`,
//             type: 'Get',
//             dataType: 'json', // added data type
//             success: function(res) {
//                 $('.category').append(
//                     `
//                         <tr>
//                             <td class="name_cate" id ="${data[key]._id}" >${data[key].name}</td>
//                             <td class="img_cate">${data[key].image}</td>
//                             <td class="desc_cate">${data[key].description}</td>
//                             <td><button class="btn_update" id ="${data[key]._id}">Sửa</button></td>
//                             <td><button class="btn_delete" id ="${data[key]._id}">Xóa</button></td>
//                         </tr>
//                     `
//                 )
//             }
//         })
//     })


    