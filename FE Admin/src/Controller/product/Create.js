$(document).ready( function(){
    //get id category
    getCategory();
    //get color
    selectColor();
    //get size
    selectSize()
    //creat product
    createProduct();
})
//get id category
function getCategory(){
    $.get("https://p-nestjs-ecommerce.onrender.com/api/v1/categories", function(res, status){
        for(let key in res.data){
            $('#category_select').append(
                `
                    <option value="${res.data[key]._id}">${res.data[key].name}</option>
                `
            )
        }
        $('#category_select').click(function(){
            $.each($("#category_select option:selected"), function(){
                let val = $(this).attr("value");
                localStorage.setItem('categoryId', val);
                console.log(val)
            })    
        })
    })
}
//select color
function selectColor(){
    let arrColors = [ "Đen", "Trắng", "Xám", "Nâu", "Đỏ", "Vàng", "Cam", "Hồng", "Xanh dương", "Xanh lá", "Tím", "Hồng pastel", "Xanh pastel", "Vàng pastel", "Tím pastel" ]
    for(let key in arrColors){
        $('#corlor_Product').append(
            `
                <option value="${arrColors[key]}">${arrColors[key]}</option>
            `
        )
    }
    $('#corlor_Product').click(function(){
        $.each($("#corlor_Product option:selected"), function(){
            let val = $(this).attr("value");
            localStorage.setItem('color', val);
        })    
    })
}

function selectSize(){
    let arrSize = ["XS", "S", "M", "L", "XL", "XXL"];
    for(let key in arrSize){
        $('#size_Product').append(
            `
                <option value="${arrSize[key]}">${arrSize[key]}</option>
            `
        )
    }
    $('#size_Product').click(function(){
        $.each($("#size_Product option:selected"), function(){
            let val = $(this).attr("value");
            localStorage.setItem('size', val);
        })    
    })
}

function createProduct(){
    $("#create").click(async function(){
        const accessToken = localStorage.getItem("accessToken");
        let categoryId = localStorage.getItem("categoryId");
        const color = localStorage.getItem("color");
        const size = localStorage.getItem("size");
        let arrSizes = [];
        let arrColors = [];
        arrSizes.push(size);
        arrColors.push(color)

            if($("#sku_Product").val() == '' && $("#name_Product").val() == '' && $("#price_Product").val() == '' && $("#stock_Product").val() == '')
            {
                alert("Hãy nhập tất cả thông tin");
            }
            else if ($("#sku_Product").val() == ''){
                var name_warnning = document.getElementById("sku");
                name_warnning.innerHTML = "Mã sản phẩm không được để trống";
            }  
            else if ($("#name_Product").val() == ''){
                var name_warnning = document.getElementById("name");
                name_warnning.innerHTML = "Tên sản phẩm không được để trống";
            }  
            else if ($("#price_Product").val() == ''){
                var price_warnning = document.getElementById("price");
                price_warnning.innerHTML = "Gía tiền không được để trống";
            } 
            else if ($("#price_Product").val() < 0 && $("#price_Product").val() > 1000000000){
                var price_warnning = document.getElementById("price");
                price_warnning.innerHTML = "Gía tiền phải lớn hơn hoặc bằng 0 và không quá 1.000.000.000";
            } 
            else if ($("#stock_Product").val() == ''){
                var stock_warnning = document.getElementById("stock");
                stock_warnning.innerHTML = "Số lượng không được để trống";
            } 
            else if (Number($("#stock_Product").val()) < 0 && Number($("#stock_Product").val()) > 1000000000){
                var stock_warnning = document.getElementById("stock");
                stock_warnning.innerHTML = "Số lượng phải lớn hơn hoặc bằng 0 và không quá 1.000.000.000";
            } 
            else if ($("#name_Product").val().charAt(0) !== 'Q' && $("#name_Product").val().charAt(1) !== 'P'){
                var name_warnning = document.getElementById("name");
                name_warnning.innerHTML = "Tên danh mục không hợp lệ";
            } 
                await $.ajax({
                    url: "https://p-nestjs-ecommerce.onrender.com/api/v1/products",
                    type: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken, // Thêm access token vào header
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        sku: $("#sku_Product").val(),
                        name: $("#name_Product").val(),
                        price: Number($("#price_Product").val()),
                        colors: arrColors,
                        sizes: arrSizes,
                        stock: Number($("#stock_Product").val()),
                        categoryId: categoryId,
                        images: $("#img_Product").val(),
                        description: $("#desc_Product").val(),
                        fabric: $("#fabric_Product").val(),
                        care_instructions: $("#care_Product").val()
                    }),
                    success: function(response) {
                        $("#sku_Product").val('');
                        $("#name_Product").val('');
                        $("#price_Product").val('');
                        $("#corlor_Product").val('');
                        $("#size_Product").val('');
                        $("#stock_Product").val('');
                        $("#category_select").val('');
                        $("#img_Product").val('');
                        $("#desc_Product").val('');
                        $("#fabric_Product").val('');
                        $("#care_Product").val('');
                        alert('Thêm thành công');
                    },
                    error: function(response, data) {
                        console.log(response);
                        console.log(data);
                    }
                  });
        })
}
