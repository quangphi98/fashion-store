$(document).ready(async function(){
    const cart = localStorage.getItem("cart");
    await renderPro(cart);
    activePayment();
    createCart();
})

const showOptionSex = () =>{
    $(".select_sex").click(function(){
        const arrow = document.querySelector(".arrow");
        const grSex = document.querySelector(".option_sex")
        const grOptionSex = grSex.getElementsByClassName("item_sex")
        const displaySex = document.querySelector(".display_sex")

        arrow.classList.toggle("spin_arrow");
        grSex.classList.toggle("active_gr_sex");

        for(var i = 0; i < grOptionSex.length; i++){
            grOptionSex[i].addEventListener("click",function(){
                var current = document.getElementsByClassName("active_sex");
                current[0].className = current[0].className.replace("active_sex", "")
                this.className += " active_sex";

                const value = $(this).attr("value");
                displaySex.innerHTML = value;
                $(".sex").attr("id", value);
            })
        }
    })
}

const showAllOptionAdress = () => {
    showOptionCity();

    showOptionDistrict();

    showOptionWard();
}

const showOptionWard = () => {
    const idNameGrOption = "option_ward";
    const arr = []
    for(var i =1 ; i <= 16 ; i++){
        const ward = `Phường ${i}`
        arr.push(ward);
    }

    renderOptionAdress(arr, idNameGrOption);

    const classNameInput = "ward";
    const classNameArrow = "arrow_ward";
    const grOptionCity = document.querySelector("#option_ward");
    const optionCity = grOptionCity.querySelectorAll(".option_adress");

    showOptionAdress(classNameInput, classNameArrow, idNameGrOption);
    activeOptionAdress(grOptionCity, optionCity, classNameInput);
}

const showOptionDistrict = () => {
    const idNameGrOption = "option_district";
    const arr = ["Bình Chánh", "Cần Giờ", "Củ Chi", "Hóc Môn", "Nhà Bè", "Cẩm Mỹ", "Định Quán", "Long Thành", "Nhơn Trạch", "Tân Phú", "Thống Nhất", "Trảng Bom", "Vĩnh Cửu", "Xuân Lộc"]

    renderOptionAdress(arr, idNameGrOption);

    const classNameInput = "district";
    const classNameArrow = "arrow_district";
    const grOptionCity = document.querySelector("#option_district");
    const optionCity = grOptionCity.querySelectorAll(".option_adress");

    showOptionAdress(classNameInput, classNameArrow, idNameGrOption);
    activeOptionAdress(grOptionCity, optionCity, classNameInput);
}

const showOptionCity = async () => {
    const idNameGrOption = "option_city";
    const arr = ["An Giang", "Bà Rịa - Vũng Tàu", "Bạc Liêu", "Bắc Giang", "Bắc Kạn", "Đà Nẵng", "TP. Hồ Chí Minh", "Hà Nội", "Thừa Thiên Huế"]

    await renderOptionAdress(arr, idNameGrOption)

    const classNameInput = "city";
    const classNameArrow = "arrow_city";
    const grOptionCity = document.querySelector("#option_city");
    const optionCity = grOptionCity.querySelectorAll(".option_adress");
    const nameClassInput = "city";

    await showOptionAdress(classNameInput, classNameArrow, idNameGrOption);
    await activeOptionAdress(grOptionCity, optionCity, nameClassInput, );
}

const showOptionAdress = (classNameInput, classNameArrow, idNameGrOption) => {
    const grOption = document.querySelector(`#${idNameGrOption}`)
    const toggleButton = document.querySelector(`.${classNameInput}`);
    const dropdownMenu = document.querySelector(`.${classNameArrow}`);

    $(`.${classNameInput}`).click(function(){
        if(!dropdownMenu.className.includes("spin_arrow")) {
            grOption.className += " show_gr_adress";
            dropdownMenu.className += " spin_arrow"
        }
    })

    $(`.${classNameArrow}`).click(function(){
        if(grOption.className.includes("show_gr_adress"))
        {
            this.className = this.className.replace(" spin_arrow", "");
            grOption.className = grOption.className.replace(" show_gr_adress", "");
        }
        else{
            grOption.className += " show_gr_adress";
            this.className += " spin_arrow"
        }
    })

    $(document).click(function(event){
            if(!toggleButton.contains(event.target) && !dropdownMenu.contains(event.target)){
                grOption.className = grOption.className.replace(" show_gr_adress", "");
            }
    })
}

const activeOptionAdress = (grOption, listOption, nameClassInput) => {
    for(var i = 0 ; i < listOption.length ; i++){
        listOption[i].addEventListener("click", function(){
            const current = grOption.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "")
            this.className += " active";

            const value = $(this).attr("value");
            $(`.${nameClassInput}`).attr("value", value);
        })
    }
}

const renderOptionAdress = (arr, idNameGrOption) => {
    for(key in arr)
    {
        if(key == 0)
        $(`#${idNameGrOption}`).append(
            `<li class="option_adress active" value="${arr[key]}"><p>${arr[key]}</p></li>`
        )
        else{
            $(`#${idNameGrOption}`).append(
                `<li class="option_adress" value="${arr[key]}"><p>${arr[key]}</p></li>`
            )
        }
    }
}

const activePayment = () => {
    const grMethod = document.querySelector(".feature_payment")
    const method = grMethod.getElementsByClassName("method_payment");
    const listRadio = grMethod.getElementsByClassName("check_payment");

    for(var i = 0 ; i < method.length ; i++)
    {
        listRadio[0].checked = true
        method[i].addEventListener("click", function(){
            var current = grMethod.getElementsByClassName("active_payment")
            current[0].className = current[0].className.replace(" active_payment", "");
            this.className += " active_payment";
        })
    }

}

const renderPro = (cartJson) =>{
    const cart = JSON.parse(cartJson);
    if(!cart){
        getAdress();
        $(".btn_add_cart").click(function(){

            $(".cart_null").fadeIn();

            setTimeout(function(){
                $(".cart_null").fadeOut();
            },5000);
        })
    }
    else{
        cart.forEach(async (product, i) => {

            var name = product.name.slice(3);
            var price = product.price * product.quanlity;
            var priceFomatted = price.toLocaleString('vi-VN');
    
            await $(".gr_pro").append(
                `
                        <div class="pro_item">
                            <div class="header_pro">
                                <div class="item_pro">
                                    <div class="accept_item">
                                        <input type="checkbox" class="checkbox_item">
                                    </div>
                                    <div class="item_display_img">
                                        <img src="${product.img}" alt="">
                                    </div>
                                    <div class="content_item">
                                        <div class="name_item">
                                            <p class="name_pro" id="${product.id}">
                                                ${name}
                                            </p>
                                            <p>
                                                ${product.color}/${product.size}
                                            </p>
                                        </div>
                                        <div class="item_option">
                                            <div class="color_size">
                                                <div class="select" id ="select_color">
                                                    <button class="select_color" style="width: 80px;">
                                                        <span class="display_color" value = "${product.color}">
                                                            ${product.color}
                                                        </span>
                                                        <div  class="icon_color">
                
                                                            <svg class="arrow" data-v-1977227c="" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-1977227c="" id="genderIconPath" fill-rule="evenodd" clip-rule="evenodd" d="M16 8.1L10 14.5L4 8.1L5.5 6.5L10 11.3L14.5 6.5L16 8.67995Z" fill="#525252"></path></svg>
                                                        </div>
                                                        </button>
                                                        
                                                    <ul class="option_color " id= "${i}">
                                                        <li class="item_color active_color" value="Đen">Đen</li>
                                                        <li class="item_color" value="Trắng">Trắng</li>
                                                        <li class="item_color" value="Xám">Xám</li>
                                                    </ul>
                                                </div>
                                                    <div class="select" id ="select_size">
                                                        <button class="select_size" style="padding-right: 10px;">
                                                            <span class="display_size" value="${product.size}">
                                                                ${product.size}
                                                            </span>
                                                            <div  class="icon_size">                
                                                                <svg class="arrow" data-v-1977227c="" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-1977227c="" id="genderIconPath" fill-rule="evenodd" clip-rule="evenodd" d="M16 8.1L10 14.5L4 8.1L5.5 6.5L10 11.3L14.5 6.5L16 8.67995Z" fill="#525252"></path></svg>
                                                            </div>
                                                            </button>
                                                            
                                                        <ul class="option_size">
                                                            <li class="item_size active_size" value="S">S</li>
                                                            <li class="item_size" value="M">M</li>
                                                            <li class="item_size" value="L">L</li>
                                                            <li class="item_size" value="XL">XL</li>
                                                        </ul>
                                                </div>
                                            </div>
            
                                            <div class="amount_price">
                                                <div class="btn_cart" id="amount_pro">
                                                    <a href="javascript:void(0)" class="quality_decrease">-</a>
                                                    <input type="number" value="${product.quanlity}" max="500" min="1" class="quanlity_control" disabled>
                                                    <a href="javascript:void(0)" class="quality_increase">+</a>
                                                </div>
            
                                                <div class="price_pro">
                                                    <p class="display_price" value="${product.price}">${priceFomatted}đ</p>
                                                </div>
                                            </div>
                                        </div>
            
                                        <div class="delete_item">
                                            <img src="" alt="">
                                            <span>
                                                Xóa
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           <hr>
                        </div>
                `
            )
    
        })
        activeValueColor();
        activeValueSize();
        getAdress();
        UpdateQuanlityPro();
        showOptionPro();
        tickAllCheckBox();
        deleteListPro();
    }
    
}

const showOptionPro = () => {
    showOptionSize(); 
    showOptionColor();
}


const showOptionColor = () =>{
    const classNameDropDown = "option_color";
    const classNameBtn = "select_color";
    const classNameItem = "item_color";
    const classNameActive = "active_color"
    const classNameDisplay = "display_color"

    showOptionNotInput(classNameBtn, classNameDropDown, classNameItem, classNameActive, classNameDisplay);
}

const showOptionSize = () =>{
    const classNameDropDown = "option_size";
    const classNameBtn = "select_size";
    const classNameItem = "item_size";
    const classNameActive = "active_size";
    const classNameDisplay = "display_size"

    showOptionNotInput(classNameBtn, classNameDropDown, classNameItem, classNameActive, classNameDisplay);
}

const activeValueColor = () =>{
    const classNameDropDown = "option_color";
    const classNameItem = "item_color";
    const classNameActive = "active_color";
    const clasNameDisplay = "display_color";

    checkValuePro(classNameDropDown, classNameActive, classNameItem, clasNameDisplay);
}

const activeValueSize = () =>{
    const classNameDropDown = "option_size";
    const classNameItem = "item_size";
    const classNameActive = "active_size"
    const clasNameDisplay = "display_size";

    checkValuePro(classNameDropDown, classNameActive, classNameItem, clasNameDisplay);
}

const checkValuePro = (classNameDropDown, classNameActive, classNameItem, clasNameDisplay) => {
    const listOption = document.querySelectorAll(`.${classNameDropDown}`);
    const display = document.querySelectorAll(`.${clasNameDisplay}`);

    for(let i = 0; i < listOption.length; i++){
        const options = listOption[i].getElementsByClassName(`${classNameItem}`);
        var current =  listOption[i].getElementsByClassName(`${classNameActive}`);
        const value = display[i].getAttribute("value");
       
        for(let j = 0; j < options.length; j++){
            if(options[j].getAttribute("value") == value){
                current[0].classList.remove(classNameActive);
                options[j].classList.add(classNameActive);

            }
            else{

            }
        }
    }
}

const showOptionNotInput = (classNameBtn, classNameDropDown, classNameItem, classNameActive, classNameDisplay) =>{
    const tableSelect = document.querySelectorAll(`#${classNameBtn}`);
    const btnColor = document.getElementsByClassName(`${classNameBtn}`);

    for(let i = 0 ; i < btnColor.length; i++){
        btnColor[i].addEventListener("click", function(){
            var currentArrow = btnColor[i].getElementsByClassName("arrow");
            var currentDropdown = tableSelect[i].getElementsByClassName(`${classNameDropDown}`);
            currentArrow[0].classList.toggle("spin_arrow");
            currentDropdown[0].classList.toggle("show_option_pro");
            activeOptionNotInput(currentDropdown[0], i, classNameItem, classNameActive, classNameDisplay);
        })
    }
}

const activeOptionNotInput = (dropDown, index, classNameItem, classNameActive, classNameDisplay) =>{
    const options = dropDown.getElementsByClassName(`${classNameItem}`);
    var current = dropDown.getElementsByClassName(`${classNameActive}`);


    for(let i = 0 ; i < options.length ; i++){
        options[i].addEventListener("click", function(){
            current[0].className = current[0].className.replace(` ${classNameActive}`, "");
            this.className += ` ${classNameActive}`;
            const value = $(this).attr("value");
            
            displayValueName(value, index, classNameDisplay);
        })
    } 
}

const displayValueName = (value, i, classNameDisplay) =>{
    const displayText = document.querySelectorAll(`.${classNameDisplay}`)
    console.log(displayText);
    displayText[i].textContent = value;
}

const UpdateQuanlityPro = () => {

    const gr_pro = document.querySelector(".gr_pro");
    const quanlity = gr_pro.getElementsByClassName("quanlity_control");
    const quality_decrease = gr_pro.getElementsByClassName("quality_decrease");
    const quality_increase = gr_pro.getElementsByClassName("quality_increase");
    const price_pro = gr_pro.getElementsByClassName("price_pro");


    for(let i = 0 ; i < quality_increase.length ; i++){
        quality_increase[i].addEventListener("click", function(){
            const currentQuanlity = quanlity[i];
            const displayPrice = price_pro[i].getElementsByClassName("display_price");
            const currentPrice = displayPrice[0];
            const price = $(currentPrice).attr("value");

            const value = Number(currentQuanlity.value) + 1;
            $(quanlity[i]).attr("value", value) ;

            UpdatePricePro(value, price, currentPrice);
        })
    }

    for(let i = 0 ; i < quality_decrease.length ; i++){
        quality_decrease[i].addEventListener("click", function(){
            if(quanlity[i].value == 1)
            {
                quanlity[i].value = 1;
            }
            else
            {
                const currentQuanlity = quanlity[i];
                const displayPrice = price_pro[i].getElementsByClassName("display_price");
                const currentPrice = displayPrice[0];
                const price = $(currentPrice).attr("value");


                const value = Number(currentQuanlity.value) - 1;
                $(quanlity[i]).attr("value", value) ;

                UpdatePricePro(value, price, currentPrice)
            }
        })
    }

}

const UpdatePricePro = (quanlity, price, classNamePrice) =>{
    const totalprice = quanlity * price;
    const priceFomatted = totalprice.toLocaleString('vi-VN');

    classNamePrice.innerHTML = `${priceFomatted}đ`;
}

const tickAllCheckBox = () => {
    const checkAll = document.querySelector(".check_all");
    const grPro = document.querySelector(".gr_pro");
    const checkbox = grPro.getElementsByClassName("checkbox_item");
    checkAll.checked = true
    for(let i = 0; i < checkbox.length; i++){
        checkbox[i].checked = true;
    }

    checkAll.addEventListener("click", function(){
        if(checkAll.checked == true){
            for(let i = 0; i < checkbox.length; i++){
                checkbox[i].checked = true;
            }
        }
        else{
            for(let i = 0; i < checkbox.length; i++){
                checkbox[i].checked = false;
            }
        }
    })
}


const deleteListPro = () => {
    const btnDelete = document.querySelector(".delete_all");
    const popup = document.querySelector(".pop_up");


    btnDelete.addEventListener("click", function(){
        popup.style.display = "block";

        const cancleConfirm = popup.querySelector(".cancle_confirm");
        const btnNo = popup.querySelector("#no");
        const btnYes = popup.querySelector("#yes");

        btnYes.addEventListener("click", function(){
            localStorage.clear();
            window.location.reload();
        })

        btnNo.addEventListener("click", function(){
            popup.style.display = "none";
        })


        cancleConfirm.addEventListener("click", function(){
            popup.style.display = "none";
        })

    })
}

const createAdress = () => {
    $(".btn_add_cart").click(function(){
        const name = $(".name").val();
        const phone = $(".phone_number").val();
        const adress = $(".adress").val();
        const city = $(".city").attr("value");

        const address = {
            fullName : name,
            streetAddress : adress,
            province : city,
            phoneNumber : phone,
        }

        const urlUpdateAddress = `https://p-nestjs-ecommerce.onrender.com/api/v1/addresses`

        $.ajax({
            url: urlUpdateAddress,
            type: "POST",
            headers: {"Authorization": "Bearer " + localStorage.getItem('accessToken')},
            data: JSON.stringify(address),
            contentType: "application/json",
            success: function(res){
                console.log(res)
            },
            error: function(err){
                console.log(err)
            }
        })
    })
}

const getAdress = async () => {
    await showOptionSex();
    await showAllOptionAdress();
    const urlAdress = "https://p-nestjs-ecommerce.onrender.com/api/v1/addresses"
    const email = localStorage.getItem("emailUser");
    await $.ajax({
        url: urlAdress,
        type: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem('accessToken')},
        success: function(res){
            const arr = res.data;
            const data = res.data[0];
            if(data == undefined)
            {
                $(".email").val(email);
                createAdress();
            }
            else{
                $(".name").val(data.fullName);
                $(".phone_number").val(data.phoneNumber)
                $(".email").val(email);
                $(".adress").val(data.streetAddress);
                $(".city").attr("value", data.province);

                // updateAddress(data._id);

            }
        },
        error: function(err){
            console.log(err)
        }
    })
}

const updateAddress = (id) =>{
    $(".btn_add_cart").click(function(){
        const name = $(".name").val();
        const phone = $(".phone_number").val();
        const adress = $(".adress").val();
        const city = $(".city").attr("value");

        const address = {
            fullName : name,
            streetAddress : adress,
            province : city,
            phoneNumber : phone,
        }

        const urlUpdateAddress = `https://p-nestjs-ecommerce.onrender.com/api/v1/addresses/${id}`

        $.ajax({
            url: urlUpdateAddress,
            type: "PATCH",
            headers: {"Authorization": "Bearer " + localStorage.getItem('accessToken')},
            data: JSON.stringify(address),
            contentType: "application/json",
            success: function(res){
                console.log(res)
            },
            error: function(err){
                console.log(err)
            }
        })
    })
}

const createCart = (cart) => {

    $(".btn_add_cart").one("click",function(){
        const urlCart = `https://p-nestjs-ecommerce.onrender.com/api/v1/carts`;
        let arrCart = [];

        const itemPro = document.getElementsByClassName("item_pro");

        for (let i = 0; i < itemPro.length; i++) {
            // console.log(itemPro[i]);
            const color = itemPro[i].getElementsByClassName("active_color");
            const size = itemPro[i].getElementsByClassName("active_size");
            const checkbox = itemPro[i].getElementsByClassName("checkbox_item");
            const idPro = document.getElementsByClassName("name_pro");
            const quantity = document.getElementsByClassName("quanlity_control");
            if(checkbox[0].checked == true) {
                // $(color[0]).attr("value")
                const product = {
                    productId : $(idPro[i]).attr("id"),
                    quanlity : Number($(quantity[i]).attr("value")),
                    color : $(color[0]).attr("value"),
                    size : $(size[0]).attr("value")
                }
                arrCart.push(product);
            }
        }
        if(arrCart.length == 0) {
            $(".cart_null").fadeIn();

            setTimeout(function(){
                $(".cart_null").fadeOut();
            },5000);
        }
        else{
            const formattedCart = {
                items: arrCart.map(item => ({
                        productId: item.productId,
                        quantity: item.quanlity,
                        color: item.color,
                        size: item.size
                }))
            };
    
            $.ajax({
                url: urlCart,
                type: "POST",
                headers: {"Authorization": "Bearer " + localStorage.getItem('accessToken')},
                data: JSON.stringify(formattedCart),
                contentType: "application/json",
                success: async function(res){
                    console.log(res)
                    let idCart = res.data._id
                    
                    await addAddressToCart(idCart);

                    await localStorage.setItem("idCart", idCart);

                    console.log(idCart);

                    await setTimeout(() => {
                        window.location.href = "/src/order/Detail/detail.html";
                    }, 1000)
                },
                error: function(err){
                    console.log(err)
                }
            })
        }

    })
}

const addAddressToCart = (idCart) =>{
    let idAddress = localStorage.getItem('idAddress');
    var urlCartAddress = `https://p-nestjs-ecommerce.onrender.com/api/v1/carts/${idCart}/addresses`;

    const adress = {
        addressId: idAddress,
    }

    $.ajax({
        url: urlCartAddress,
        type: "POST",
        headers: {"Authorization": "Bearer " + localStorage.getItem('accessToken')},
        data: JSON.stringify(adress),
        contentType: "application/json",
        success: function(res){
            console.log(res)
        },
        error: function(err){
            console.log(err)
        }
    })
}
