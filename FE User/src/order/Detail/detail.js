$(document).ready(async function() {
    const idCart = localStorage.getItem('idCart');
    // console.log(accessToken);

    await getInforCart(idCart);

    await activePayment();

    folowwScroll();

    createOrder(idCart);

    // renderVoucher();
})

const getInforCart =  (idCart) => {
    const urlGetCart = `https://p-nestjs-ecommerce.onrender.com/api/v1/carts/${idCart}`;
    $.ajax({
        url: urlGetCart,
        type: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem('accessToken')},
        contentType: "application/json",
        success: async function(res){

            
            const arritem = res.data.items;
            const orderSummary = res.data.orderSummary;
            const address = res.data.shipping_address;
            const coupon = res.data.coupon;

            console.log(res.data);

            renderAddress(address);
            renderProduct(arritem);
            renderTotalPrice(orderSummary);
            displayCoupon(coupon);
            toggleVoucherForm(idCart);
    
        },
        error: function(err){
            console.log(err)
        }
        
    })
}

const renderAddress = (arrAddress) => {

    const fullName = document.querySelector(".address__content--name");
    const address = document.querySelector(".address__content--detail");

    fullName.innerHTML = `${arrAddress.fullName} (+84) ${arrAddress.phoneNumber}`
    address.innerHTML  = `${arrAddress.streetAddress} , ${arrAddress.province}`;
}

const renderProduct = (arrProduct) => {

    arrProduct.forEach(item => {
        const priceFomatted = item.price.toLocaleString('vi-VN');
        const totalprice = item.price * item.quantity;
        const totalpriceFomatted = totalprice.toLocaleString('vi-VN');
        $(".product__detail").append(
            `
                <div class="product__detail-content">
                        <div class="product__detail-infor">
                            <div class="product__detail-infor-item product__detail-infor-item-margin product__detail-infor-img">
                                <img src="${item.image}" alt="">
                            </div>
                            <p class="product__detail-infor-item product__detail-infor-item-margin product__detail-infor-name">
                                ${item.name}
                            </p>
                            <p class="product__detail-infor-item product__detail-infor-item-margin product__detail-infor-attribute">
                                ${item.color}/${item.size}
                            </p>
                        </div>
                        <div class="product__detail-price product__detail-price--top-padding">
                            <span class="product__detail-price-item-infor product__detail-price-item-infor--right-margin">
                                ${priceFomatted}đ
                            </span>
                            <span class="product__detail-price-item-infor product__detail-price-item-infor--mid-margin">
                                ${item.quantity}
                            </span>
                            <span class="product__detail-price-item-infor"> 
                                ${totalpriceFomatted}đ
                            </span>
                        </div>
                    </div>        
            `
        )
    });
}

const renderTotalPrice = (orderSummary) => {

    const shippingCost = document.querySelector(".price__deliver");
    const subTotal = document.querySelector(".price__base")
    const tax = document.querySelector(".price__tax");
    const discount = document.querySelector(".price__voucher");
    const totalPrice = document.querySelector(".price__total");


    shippingCost.innerHTML = `${(orderSummary.shippingCost).toLocaleString('vi-VN')}đ`
    subTotal.innerHTML = `${(orderSummary.subTotal).toLocaleString('vi-VN')}đ`;
    tax.innerHTML = `${(orderSummary.taxAmount).toLocaleString('vi-VN')}đ`;
    discount.innerHTML = `${(orderSummary.discountAmount).toLocaleString('vi-VN')}đ`;
    totalPrice.innerHTML = `${(orderSummary.total).toLocaleString('vi-VN')}đ`;
}

const displayCoupon = (coupon) => {
    if(coupon === null){
        document.querySelector(".coupon__voucher-item").style.display = "none";
    }
    else{
        console.log(1);
    }
}

const activePayment = () => {
    const grMethod = document.querySelector(".methol")
    const method = grMethod.getElementsByClassName("methol__item");
    const listRadio = grMethod.getElementsByClassName("methol__item-radio");
    const displayMethol = document.querySelector(".methol__title");

    for(var i = 0 ; i < method.length ; i++)
    {
        listRadio[0].checked = true
        method[i].addEventListener("click", function(){
            var current = grMethod.getElementsByClassName("methol__item-active")
            current[0].className = current[0].className.replace(" methol__item-active", "");
            this.className += " methol__item-active";
            displayMethol.innerHTML = $(this).attr("value");
            $(displayMethol).attr("value", $(this).attr("value"));

            console.log($(this).attr("value"));
        })
    }
}

const folowwScroll = () =>{
    $(document).scroll(function() { 
        $('.voucher').css('top', $(this).scrollTop(),100,"linear");
    });
}

const activeVoucher = () => {
    const grMethod = document.querySelector(".voucher__form")
    const method = grMethod.getElementsByClassName("voucher__lablel");
    const listRadio = grMethod.getElementsByClassName("voucher__item-radio");
    // const displayMethol = document.querySelector(".methol__title");


    method[0].classList.add("voucher__lablel-active");
    for(let i = 0 ; i < method.length ; i++)
    {
        listRadio[0].checked = true;
        method[i].addEventListener("click", function(){
            var current = grMethod.getElementsByClassName("voucher__lablel-active")
            current[0].className = current[0].className.replace(" voucher__lablel-active", "");
            this.className += " voucher__lablel-active";
            listRadio[0].checked = false;
            listRadio[i].checked = true;

            // displayMethol.innerHTML = $(this).attr("value");
            // $(displayMethol).attr("value", $(this).attr("value"));

        })
    }
}

const toggleVoucherForm = (idCart) => {
    const voucherForm = document.querySelector(".voucher");

    $(".coupon__voucher-btn-name").click(function () {
        if(!voucherForm.classList.contains("voucher__active"))
        {
            voucherForm.classList.add("voucher__active");
            renderVoucher();

            $(".voucher__form-cancle").click(function () {
                voucherForm.classList.remove("voucher__active");
            })
            
            $(".voucher__form-btn").click(async function () {
                await applyCoupon(idCart);
                await setTimeout(() => {
                        voucherForm.classList.remove("voucher__active");
                        window.location.reload();
                })
            })
        }
        else{
            console.log("error")
        }
    })
}

const renderVoucher = () => {
    var urlPromotion = "https://p-nestjs-ecommerce.onrender.com/api/v1/promotions";

    $.ajax({
        url: urlPromotion,
        type: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem('accessToken')},
        contentType: "application/json",
        success: function(res){
            console.log(res.data.result)
            var vouchers = res.data.result;

            vouchers.forEach(voucher => {
                console.log(voucher)
                const discount = voucher.discount_amount.toLocaleString('vi-VN');
                const priceCondition = voucher.condition.toLocaleString('vi-VN');

                if(voucher.discount_type == "Phần trăm")
                $(".voucher__form").append(
                    `
                        <label class="voucher__lablel" value="${voucher.coupon}" >
                            <input type="radio" class="voucher__item voucher__item-radio" name="voucher">
                            <img src="https://assets.website-files.com/5e7ff3ec0c4ef4c974fa99e3/5e7ff57adad44d1f072965b6_logo.svg" alt="" class="voucher__item voucher__item-logo">
                            <span class="voucher__item voucher__item-content">
                                <span class="voucher__item-content-tag voucher__item-content-name">
                                    ${voucher.coupon}
                                    <br>
                                    ${voucher.description}
                                </span>

                                <span class="voucher__item-content-tag voucher__item-content-discount voucher__item-content-discount--add-text">
                                    <br>
                                    ${discount}%
                                </span>

                                <span class="voucher__item-content-tag voucher__item-content-condition voucher__item-content-condition--add-text">
                                    <br>
                                    ${priceCondition}đ
                                </span>

                            </span>
                        </label>
                    `
                )
                else{
                    $(".voucher__form").append(
                        `
                            <label class="voucher__lablel " value="${voucher.coupon}">
                                <input type="radio" class="voucher__item voucher__item-radio" name="voucher">
                                <img src="https://assets.website-files.com/5e7ff3ec0c4ef4c974fa99e3/5e7ff57adad44d1f072965b6_logo.svg" alt="" class="voucher__item voucher__item-logo">
                                <span class="voucher__item voucher__item-content">
                                    <span class="voucher__item-content-tag voucher__item-content-name">
                                        ${voucher.coupon}
                                        <br>
                                        ${voucher.description}
                                    </span>
    
                                    <span class="voucher__item-content-tag voucher__item-content-discount voucher__item-content-discount--add-text">
                                        <br>
                                        ${discount}đ
                                    </span>
    
                                    <span class="voucher__item-content-tag voucher__item-content-condition voucher__item-content-condition--add-text">
                                        <br>
                                        ${priceCondition}đ
                                    </span>
    
                                </span>
                            </label>
                        `
                    )
                }
            })
            activeVoucher()
        },
        error: function(err){
            console.log(err)
        }
    })
}

const applyCoupon = (idCart) => {
    // $(".voucher__form-btn").click(function(){
       
    // })
    const urlCouPon = `https://p-nestjs-ecommerce.onrender.com/api/v1/carts/${idCart}/promotions`
    const getVoucher = document.querySelector(".voucher__lablel-active");
    const getValue = $(getVoucher).attr("value");

    console.warn(getValue)

    $.ajax({
        url: urlCouPon,
        type: "POST",
        headers: {"Authorization": "Bearer " + localStorage.getItem('accessToken')},
        data: JSON.stringify({ coupon: getValue }),
        contentType: "application/json",
        success: function(res){
            console.warn(res);
        },
        error: function(err){
            console.warn(err)
        }      
    })

}

const createOrder = (cartId) =>{
    $(".btn__payment").click(function(){
        const grFeature = document.querySelector(".methol");
        const listMethols = grFeature.getElementsByClassName("methol__item-active");
        const note = document.querySelector(".diliver__notice-input");
        const urlOrder = "https://p-nestjs-ecommerce.onrender.com/api/v1/orders";
    
        const valueNote = note.value;
        const paymentMethod = $(listMethols[0]).attr("value");
    
        // console.log(paymentMethod);
        // console.log(valueNote);
        // console.log(cartId);
    
        const order = {
            cartId: cartId,
            payment_method: paymentMethod,
            note: valueNote
        }
    
        console.log(order);
    
        $.ajax({
            url: urlOrder,
            type: "POST",
            headers: {"Authorization": "Bearer " + localStorage.getItem('accessToken')},
            data: JSON.stringify(order),
            contentType: "application/json",
            success: function(res){
                console.log(res)
            },
            error: function(xhr, statusText, err){
                if(xhr.status === 500){
                    alert("Đặt hàng thành công");
                }
                else{
                    console.warn(err);
                }
            }
        })
    })
}