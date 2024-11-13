$(document).ready(async function(){
     displayCategories();
     amountProduct();
})

const displayCategories = () => {
    $.get("https://p-nestjs-ecommerce.onrender.com/api/v1/categories", async function(res, status){
        for(var key in res.data)
        {
            var name = res.data[key].name.slice(3)
            if(name.search("Quần") >= 0)
                {
                     // Create the first list item and append it to element1
                    const para1 = document.createElement("li");
                    para1.classList.add("item");
                    const text1 = document.createTextNode(name);
                    para1.appendChild(text1);

                    const element1 = document.querySelector(".group__item-trousers");
                    await element1.appendChild(para1);

                    // Create the second list item and append it to element2
                    const para2 = document.createElement("li");
                    para2.classList.add("item");
                    const text2 = document.createTextNode(name);
                    para2.appendChild(text2);

                    const element2 = document.querySelector(".group__left-item-trousers");
                    await element2.appendChild(para2);
                }

            else if(name.search("Áo") >= 0 )
                {
                    const para1 = document.createElement("li");
                    para1.classList.add("item");
        
                    const text1 = document.createTextNode(name);
                    para1.appendChild(text1);
        
                    const element1 = document.querySelector(".group__item-shirt")
                    element1.appendChild(para1);

                    const para2 = document.createElement("li");
                    para2.classList.add("item");
        
                    const text2 = document.createTextNode(name);
                    para2.appendChild(text2);
        
                    const element2 = document.querySelector(".group__left-item-shirts")
                    element2.appendChild(para2);
                }

            else if(name.search("Phụ kiện") >= 0 )
                {
                    const para1 = document.createElement("li");
                    para1.classList.add("item");
            
                    const text1 = document.createTextNode(name);
                    para1.appendChild(text1);
            
                    const element1 = document.querySelector(".group__item-accessory")
                    element1.appendChild(para1);

                    const para2 = document.createElement("li");
                    para2.classList.add("item");
            
                    const text2 = document.createTextNode(name);
                    para2.appendChild(text2);
            
                    const element2 = document.querySelector(".group__left-item-accessory")
                    element2.appendChild(para2);
                }
            else
                {
                    const para1 = document.createElement("li");
                    para1.classList.add("item");
            
                    const text1 = document.createTextNode(name);
                    para1.appendChild(text1);
            
                    const element1 = document.querySelector(".group__item-combo")
                    element1.appendChild(para1);

                    const para2 = document.createElement("li");
                    para2.classList.add("item");
            
                    const text2 = document.createTextNode(name);
                    para2.appendChild(text2);
            
                    const element2 = document.querySelector(".group__item-Combo")
                    element2.appendChild(para2);
                }
        }
    })
}

const amountProduct = () =>{
    const listPro = localStorage.getItem("cart")
    const products = JSON.parse(listPro);
    const amount = 1;
    var number = 0;
    // Kiểm tra xem dữ liệu có hợp lệ không
if (products && Array.isArray(products)) {
    // Duyệt qua từng đối tượng trong mảng
    products.forEach((product, i) => {
        number = amount + i
    })
} else {
    console.log("No products found or data is not an array.");
}
    document.querySelector(".count__item").innerHTML = number;
}