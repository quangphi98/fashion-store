let id ;
    $(document).ready(async function(){
        await $.ajax({
            url: urlApiCategory,
            type: 'Get',
            dataType: 'json', // added data type
            success: function(res) {
                let data = res.data ;

                for(let key in data)
                {
                    $('#categories').append(
                        `
                            <tr>
                                <td class="name_cate" id ="${data[key]._id}" >${data[key].name}</td>
                                <td class="img_cate">${data[key].image}</td>
                                <td class="desc_cate">${data[key].description}</td>
                                <td class="btn"><button class="btn_update" id ="${data[key]._id}">Sửa</button></td>
                                <td class="btn"><button class="btn_delete" id ="${data[key]._id}">Xóa</button></td>
                            </tr>
                        `
                    )
                }
            }
        })
      })
      //Get Category
      $(document).on('click', '.btn_update', function(){
        let id = $(this).attr('id');
        localStorage.setItem('categoryId', id);  // Store the id in localStorage
        window.location.href = "./Update_category.html";  // Redirect to the other page
    });
    


