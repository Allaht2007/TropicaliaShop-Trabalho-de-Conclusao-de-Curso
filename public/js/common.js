
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


function mudaQuantidade(event, id, delta) {
    event.preventDefault(); // Impede o envio do formulário
    let inputQnt = document.getElementById(id);
    let hiddenInput = document.getElementById('hidden-' + id);
    let quantidade = parseInt(inputQnt.value) + delta;
    if (quantidade >= 1 && quantidade <= parseInt(inputQnt.max)) {
        hiddenInput.value = quantidade;
        inputQnt.value = quantidade;
        const inputEvent = new Event('input'); // Cria um novo evento 'input'
        inputQnt.dispatchEvent(inputEvent); // Dispara o evento 'input'
    }
}


const cards = document.querySelectorAll('.class-prod__desc');  
cards.forEach(card => { 
    card.addEventListener('click', () => { 
   
    const id = card.getAttribute('id'); 
    window.location.href = `/Classificado?id=${id}`;
 }); 
});

const prod = document.querySelectorAll(".spanProds");
prod.forEach(card => { 
    card.addEventListener('click', () => { 
 
    const id = card.getAttribute('id');
    window.location.href = `/Classificado?id=${id}`;
 }); 
});



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



  function confirmaDeleta(event,form){
    event.preventDefault();
    let decisao = confirm("Confirma Exclusão")  
    if(decisao){
      form.submit();
    }
  }
  function TotalPreco() {
      let total = 0; 
      document.querySelectorAll('.div_geral').forEach(function(item) {

          let checkbox = item.querySelector('.produto-checkbox');
          if (checkbox.checked) {

              let quantidade = item.querySelector('.classificado-btn__qnt input[type="number"]').value; 
              let preco = item.querySelector('#valorBebida').dataset.preco; 
           
              total += quantidade * preco; 

          }
      }); 
           document.getElementById('final-price').innerText = 'Valor Total: R$ ' + total.toFixed(2); } 
           document.querySelectorAll('.classificado-btn__qnt input[type="number"]').forEach(function(input) {
               input.addEventListener('input', TotalPreco); 
          }); 
          

         
            