
const inputText = document.getElementById("searchBar");

inputText.addEventListener("focus", () => {
    inputText.classList.add("searchIptClick");
    });
    inputText.addEventListener("focusout", () => {
        inputText.classList.remove("searchIptClick");
    });



const dropDown = document.getElementById("div-imgUser");
const dropDownMenu = document.querySelector(".dropdown-menu")

dropDown.addEventListener("click",()=>{
    dropDownMenu.classList.toggle("ativo");
})


function mudaQuantidade(id, delta){
    let inputQnt = document.getElementById(id);
    let hiddenInput = document.getElementById('hidden-'+id);
    let quantidade = parseInt(inputQnt.value) + delta;
    if( quantidade >= 0 ){
        hiddenInput.value = quantidade;
        inputQnt.value = quantidade;
    }
}

const swiperAfiliado = new Swiper('.slider-wrapper__afiliados', {

    loop: false, // Ativa o loop
    grabCursor: true, // Cursor de agarrar
    slidesPerGroup: 5, // Pula 5 slides por vez
    spaceBetween:true,
    pagination: {
        el: '.swiper-pagination__afiliados',
        clickable: true,

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

  const swiperVendas = new Swiper('.slider-wrapper__vendas', {

    loop: false, // Ativa o loop
    grabCursor: true, // Cursor de agarrar
    slidesPerGroup: 5, // Pula 5 slides por vez
    spaceBetween:true,
    pagination: {
        el: '.swiper-pagination__vendas',
        clickable: true,

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

  const swiperVistos = new Swiper('.slider-wrapper__vistos', {

    loop: false, // Ativa o loop
    grabCursor: true, // Cursor de agarrar
    slidesPerGroup: 5, // Pula 5 slides por vez
    spaceBetween:true,
    pagination: {
        el: '.swiper-pagination__vistos',
        clickable: true,

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

  const swiperAcessorios = new Swiper('.slider-wrapper__acessorios', {

    loop: false, // Ativa o loop
    grabCursor: true, // Cursor de agarrar
    slidesPerGroup: 5, // Pula 5 slides por vez
    spaceBetween:true,
    pagination: {
        el: '.swiper-pagination__acessorios',
        clickable: true,

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





