$(document).ready(function(){
    $.get("http://localhost:8800/api/slider/", function(data, status)
        {
            for(key in data)
                {
                    $('.list_content').append(`
                        <div class="slider_title">
                            <img class="background_img" src="${data[key].photo}" alt="">
                        </div>
                    `);
                    if(key == 0)
                    {
                        $('.dots').append(`
                            <li class="active"></li>
                        `);
                    }
                    else{
                        $('.dots').append(`
                            <li></li>
                        `);
                    }
                }
                slider();
        });
  });
function slider(){
    var list = document.querySelector('.list_content');
    var items = document.querySelectorAll('.slider_title');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var dots = document.querySelectorAll('.dots li')
    
    
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

    //auto chuyển slider
    let refreshSlider = setInterval(() => {next.click()}, 5000);
    
    //chuyển slider
    function reloadSlider(){
        let checkLeft = items[active].offsetLeft;
        list.style.left = -checkLeft + 'px';
    
        //chuyển dot
        let lastActiveDot = document.querySelector('.slider .dots li.active');
        lastActiveDot.classList.remove("active");
        dots[active].classList.add('active');
    
    }
    
    //click dot để chuyển slider
    dots.forEach((li, key) => {
        li.addEventListener('click', function(){
            active = key;
            reloadSlider();
            // reloadDots();
        })
    })  
}