$(document).ready(async function(){
    await renderCate();
    await renderPro();
    await getIdPro();
})

renderPro = () => {
    $.get("https://p-nestjs-ecommerce.onrender.com/api/v1/products", async function(res, status){
        const data = res.data.result
        for(let key in data)
        {
            let apilink = `https://p-nestjs-ecommerce.onrender.com/api/v1/categories/${data[key].category}`       
                await $.get(apilink, async function(res, status){
                    const nameProCut = data[key].name.slice(3)
                    const formattPrice = data[key].price.toLocaleString('vi-VN')
                            $(`.gr_item`).append(
                                `
                                        <div class="item">
                                            <a class="link_img" id="${data[key]._id}" href="../detail_product/detail.html"> <img class="item_img" src="${data[key].images}" alt=""> </a>
                                            <div class="select_color">
                                                <div class="color" id="black"> <span class="checkmark">Đen</span></div>
                                                <div class="color" id="white"> <span class="checkmark">Đen</span></div>
                                            </div>               
                                        <div class="content_item">
                                            <a class="text_content name" id="${data[key]._id}" href="../detail_product/detail.html">${nameProCut} </a>
                                            <p class="text_content price" id="price_item"><strong>${formattPrice}đ</strong></p>
                                        </div>
                                    </div>
                                </div>      
                            </div>
                                `)
                        await sliderPro();
                })                   
        }
    })
}


renderCate = () => {
    $.get("https://p-nestjs-ecommerce.onrender.com/api/v1/categories", async function(res, status){
        const nameCat = res.data;
        for(let key1 in nameCat )
        {
            const nameCatCut = nameCat[key1].name.slice(3)
            if(key1 <= 3)
            {
                $(".body_home_item").append(`
                    <div class="body_item" ">
                        <div class="componet_body">
                            <div class="home_item" id="ao_thun">
                                <div class="title" id="title_ao_thun">
                                    <p>${nameCatCut}</p>
                                    <span>
                                        <a href="#">Xem thêm</a>
                                    </span>
                                </div>
                            <div class="gr_item" id="${nameCat[key1]._id}" value ="${nameCat[key1].name}">
                            
                            </div>  
                        </div>
                        <div class="bnt_arrow">
                            <div class="arrow left" id="prev"><div></div></div>
                            <div class="arrow right" id="next"><div></div></div>
                        </div>
                    </div>
                `)             
            }
        }
    })
}

getIdPro = () => {
    $(document).on('click', '.name', '.link_img', function(){
        const id = $(this).attr("id");
        localStorage.setItem("idProduct", id)
    })
}

sliderPro = () => {
    const sliders = document.querySelectorAll('.componet_body');
    sliders.forEach((slider, index) => {
        const list = slider.querySelector('.gr_item');
        const items = slider.querySelectorAll('.item');
        const prev = slider.querySelector(`.arrow.left`);
        const next = slider.querySelector(`.arrow.right`);
        
        let active = 0;
        let lenghtItem = items.length - 1
    
        next.onclick =function(){
            if(active + 1 > lenghtItem){
                active = 0
            }else{
                active++;
            }
            reloadSlider();
        }
        
        prev.onclick =function(){
            if(active - 1 < 0){
                active = lenghtItem;
            }else{
                active--;
            }
            reloadSlider();
        }
    
        function reloadSlider(){
            let checkLeft = items[active].offsetLeft;
            list.style.left = -checkLeft + 'px';
            
        }
    })
    }