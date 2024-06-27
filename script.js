/*Slider index
var swiper = new Swiper(".mySwiper-1", {
    slidePerView:1,
    spaceBetween:30,
    loop:true,
    pagination: {
        el:".swiper-pagination",
        clickable:true,
    },
    navigation: {
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
    }
});*/

const clave = document.getElementById('clave'),
icon = document.querySelector('.bx');

icon.addEventListener("click", e =>{
    if(clave.type == "password"){
        clave.type = "text";
        icon.classList.remove('bx-show-alt')
        icon.classList.add('bx-hide')
    }else{
        clave.type = "password";
        icon.classList.ad('bx-show-alt')
        icon.classList.remove('bx-hide')
    }
});
