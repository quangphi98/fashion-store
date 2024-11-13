$(document).ready(function(){
    getAll();
    getIdProduct();
})

function getAll(){
    $.get("https://p-nestjs-ecommerce.onrender.com/api/v1/products", function(res, status){
        const data = res.data.result
        for(let key in data)
        {
            let apilink = `https://p-nestjs-ecommerce.onrender.com/api/v1/categories/${data[key].category}`
            $.get(apilink, function(res, status){
                $("#product").append(
                    `
                        <tr>
                            <td class = "infor" id = "name" >${data[key].name}</td>
                            <td class = "infor" id = "price" >${data[key].price}</td>
                            <td class = "infor" id = "sizes" >${data[key].sizes}</td>
                            <td class = "infor" id = "sku" >${data[key].sku}</td>
                            <td class = "infor" id = "stock" >${data[key].stock}</td>
                            <td class = "infor" id = "colors" >${data[key].colors}</td>
                            <td class = "infor" id = "cateId" >${res.data.name}</td>
                            <td class = "infor" id = "images" ><img src = "${data[key].images}"  width = "100px"></td>
                            <td class = "infor" id = "care" >${data[key].care_instructions}</td>
                            <td class = "infor" id = "fabric" >${data[key].fabric}</td>
                            <td class="btn_update"><button class="btn update" id ="${data[key]._id}">Sửa</button></td>
                            <td class="btn_delete"><button class="btn delete" id ="${data[key]._id}">Xóa</button></td>
                        </tr>
                    `)
           })
        }
    })
}

function getIdProduct(){
    $(document).on('click', '.update', function(){
        let id = $(this).attr('id');
        console.log(id);
        localStorage.setItem('productId', id);  // Store the id in localStorage
    });
    $(document).on('click', '.btn_update .btn', function(){
        window.location.href = "../../View/product/Update.html";
    });
}