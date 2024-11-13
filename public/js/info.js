const swiperInfo = new Swiper('.swiper', {

  
    loop: true, 
    slidesPerGroup: 1,
    allowTouchMove:false,
    spaceBetween:true,
    slidesPerView:1,
    navigation:{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
   
   
  });


document.getElementById('telefone').addEventListener('input', function (e) { 
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/); 
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : ''); 
});

document.getElementById('cep').addEventListener('input', function (e) { 
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/); 
    e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2]; });