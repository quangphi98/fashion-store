$(document).ready(async function(){
    const idProduct = localStorage.getItem('productId');
    const accessToken = localStorage.getItem('accessToken')
    await selectColor();
    await selectSize();
    await getCategory();
    await getInforProduct(idProduct);
    await setInforProduct(idProduct, accessToken);
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

//get Size
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

//get infor Product
function getInforProduct(id){
    $.get(`https://p-nestjs-ecommerce.onrender.com/api/v1/products/${id}`, function(res, status){
        const data = res.data;
        console.log(data)
        $("#sku_Product").val(data.sku);
        $("#name_Product").val(data.name);
        $("#img_Product").val(data.images);
        $("#price_Product").val(data.price);
        $("#stock_Product").val(data.stock);
        $("#desc_Product").val(data.description);
        $("#fabric_Product").val(data.fabric);
        $("#care_Product").val(data.care_instructions);
        $("#category_select").val(data.category);
        $("#size_Product").val(data.sizes);
        $("#corlor_Product").val(data.colors);
    })
}

//set infor Product 
function setInforProduct(id, accessToken){
    $('#update').click(async function(){
        let categoryId = localStorage.getItem("categoryId");
        const color = localStorage.getItem("color");
        const size = localStorage.getItem("size");
        let arrSizes = [];
        let arrColors = [];
        arrSizes.push(size);
        arrColors.push(color)
        await $.ajax({
            url: `https://p-nestjs-ecommerce.onrender.com/api/v1/products/${id}`,
            type: 'PATCH',
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
              var messeage = 'Sửa thành công';
              alert(messeage);
              window.location.href = './List.html';
            },
            error: function(response) {
                console.log(response);
            }
          });
    })
}