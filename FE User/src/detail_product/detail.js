$(document).ready(async function(){
    const idProduct = localStorage.getItem("idProduct")
    const baseUrl = "https://p-nestjs-ecommerce.onrender.com/api/v1/";
    console.log(idProduct);
    await getProduct(idProduct, baseUrl);
})

const ActiveImg = () => {
    const gr_img = document.querySelector(".gr_img");
    const imgs = gr_img.getElementsByClassName("item_img");
    const main_img = document.querySelector("#img_display");

    for(var i = 0; i < imgs.length; i++){
        imgs[i].addEventListener("click", function(){
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
            main_img.src = this.src;
        })
    }
}

const ActiveColor = () => {
    const gr_color = document.querySelector(".option_color");
    const colors = gr_color.getElementsByClassName("item_color");
    const name_color = document.querySelector("#name_color");
    console.log(colors);

    for(var i = 0; i < colors.length; i++){
        colors[i].addEventListener("click", function(){
            var current = document.getElementsByClassName("active_color");
            current[0].className = current[0].className.replace(" active_color", "");
            this.className += " active_color";

            var tag_img = this.querySelector(`.radio`)
            var value = tag_img.getAttribute("data-value")
            name_color.innerHTML = value;
        })
    }
}

const ActiveSize = () =>{
    const gr_size = document.querySelector(".option_size");
    const sizes = gr_size.getElementsByClassName("item_size");
    const name_size = document.querySelector("#name_size");

    for(var i = 0; i < sizes.length; i++){
        sizes[i].addEventListener("click", function(){
            var current = document.getElementsByClassName("active_size");
            current[0].className = current[0].className.replace(" active_size", "");
            this.className += " active_size";

            var tag_size = this.querySelector(".select")
            var value = tag_size.getAttribute("value");
            name_size.innerHTML = value;
        })
    }
}

const UpdateQuality = () =>{
    const quality = document.querySelector(".quanlity_control");
    quality.value = 1;
    if (!quality) {
        console.error("Element with class .quality_control not found");
        return;
    }

    $(".quality_increase").click(function(){
        const number = parseFloat(quality.value);
        if(number == 500)
        {
            quality.value = 500
        }
        else{
            newValue = number + 1;
            quality.value = newValue
        }

    })
    $(".quality_decrease").click(function(){
        const number = parseFloat(quality.value);
        if(number == 1){
            quality.value = 1
        }
        else
        {
            newValue = number - 1;
            // console.log(newValue)
            quality.value = newValue
        }

    })                                                              
}

const showFeatures = () => {
    const feature = document.querySelector(".content_features");
    const btnShow = document.querySelector(".show_features");

    $(".show_features").click(function(){
        if(feature.className.includes("show")){
            feature.className = feature.className.replace(" show", "")
            btnShow.style.transform = "rotateZ(0deg)"
            feature.style.maxHeight  = "0"
        }
        else{
            btnShow.style.transform = "rotateZ(46deg)"
            feature.className += " show"
            feature.style.maxHeight  = "100%"
        }
    })
}

const getProduct = (id, baseUrl) =>{
    const url = baseUrl + `products/${id}`;

    $.get(url,async function(res, status){
        if(status == "success"){
            const product = res.data;
            console.log(product);
            $(".add_cart").attr("id", product._id);

            await renderImg(product.images)

            await renderInfor(product.name, product.price)

            await renderFeature(product.fabric, product.description)
            await showFeatures();

            await UpdateQuality();
            await ActiveColor();
            await ActiveSize();
            await addProductToCart(product.name, product.price);
        }
    })
}

const renderImg = (img) =>{
    for(key in img){
        $(".gr_img").append(
            `
                <img class="item_img" src="${img[key]}" alt="">
            `
        )
        ActiveImg();
    }
}

const renderInfor = (name, price) => {
    const nameCut = name.slice(3);
    const namePro = document.querySelector("#name_product");
    const pricePro = document.querySelector("#price_pro");
    var formattedNumber = price.toLocaleString('vi-VN');

    namePro.innerHTML = nameCut;
    pricePro.innerHTML = formattedNumber + "đ";
}

const renderFeature = (fabric, description) => {
    $(".content_features").append(
        `
            <p class="feature">- ${fabric}</p>
            <p class="feature">- ${description}</p>
        `
    )
}

const addProductToCart = (name, price) =>{
    $("#add_cart").click(function(){
        const idPro = $(".add_cart").attr("id");
        const quanlity = $(".quanlity_control").val();
        const size = $(".active_size").attr("id");
        const color = $(".active_color").attr("id");
        const img = $("#img_display").attr("src");

        console.log(img);


        const product = {
            id: idPro,
            quanlity: quanlity,
            size: size,
            color: color,
            name: name,
            price: price,
            img: img
        }

        noticeCart(name, price, size, color);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product)
        
        localStorage.setItem("cart", JSON.stringify(cart));


    })
}

const noticeCart = (name, price, size, color) =>{
        const nameCut = name.slice(3);
        var formattedNumber = price.toLocaleString('vi-VN');
        const imgDisplay = document.getElementById("img_display").src;


        document.querySelector(".img_cart").src = imgDisplay;
        document.getElementById("name_cart").innerHTML = nameCut;
        document.getElementById("price_cart").innerHTML = `${formattedNumber}đ`;
        document.getElementById("color_size").innerHTML = `${size} / ${color}`

        const notice =document.querySelector(".notice");

        notice.classList.add("show")

        setTimeout(function() {
            notice.classList.remove("show");
        }, 10000);
}

