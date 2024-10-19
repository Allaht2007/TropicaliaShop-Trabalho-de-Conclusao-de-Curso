
const inputText = document.querySelectorAll('input[type="text"], input[type="password"],input[type="email"]')
inputText.forEach((input) => {
    input.addEventListener("focus", () => {
        input.classList.add("searchIptClick");
    });
    input.addEventListener("focusout", () => {
        input.classList.remove("searchIptClick");
    });
});


function mudaQuantidade(id, delta){
    let inputQnt = document.getElementById(id);
    let hiddenInput = document.getElementById('hidden-'+id);
    let quantidade = parseInt(inputQnt.value) + delta;
    if( quantidade >= 0 ){
        hiddenInput.value = quantidade;
        inputQnt.value = quantidade;
    }
}

const swiper = new Swiper('.slider-wrapper', {

    loop: false, // Ativa o loop
    grabCursor: true, // Cursor de agarrar
    slidesPerGroup: 5, // Pula 5 slides por vez
    spaceBetween:true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            if (index > 3) { // Limita a quantidade de bullets a 4
                return '';
            }
            return '<span class="' + className + '">' + '</span>';
        },

    },

    breakpoints:{
    0:{
        slidesPerView: 1,
        },
    
    620:{
        slidesPerView: 3,
        },

    
    1024:{
        slidesPerView: 5,
        }, 
    }

  });
