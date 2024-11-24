function openDialog() {
     document.getElementById("avaliacaoDialog").classList.add("show"); 
   
    } 
    function closeDialog() {
      document.getElementById("avaliacaoDialog").classList.remove("show");
      document.getElementById("avaliacaoTxt").value = ""; // Limpa o campo textarea
      
      // Reseta as estrelas
      const estrelas = document.querySelectorAll('.star-icon');
      estrelas.forEach(function(star) {
          star.classList.remove('ativo');
      });
      if (estrelas[0]) {
          estrelas[0].classList.add('ativo'); // Adiciona a classe 'ativo' à primeira estrela
      }
  
      // Reseta o valor da nota
      document.getElementById("avaliacaoNota").value = 1;
  }
  
  
          var stars = document.querySelectorAll('.star-icon');
           document.addEventListener('click', function(e) {
             var classStar = e.target.classList;
              if (!classStar.contains('ativo') && classStar.contains('star-icon')) {
                 stars.forEach(function(star) {
                     star.classList.remove('ativo');
                     });
                      classStar.add('ativo');
                       document.getElementById("avaliacaoNota").value = e.target.getAttribute('data-avaliacao');
                        console.log(e.target.getAttribute('data-avaliacao'));
                     } });