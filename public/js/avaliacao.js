function openDialog() {
     document.getElementById("avaliacaoDialog").classList.add("show"); 
     document.getElementById("content").classList.add("blur-background"); 
    } 
    function closeDialog() {
         document.getElementById("avaliacaoDialog").classList.remove("show");
          document.getElementById("content").classList.remove("blur-background");
          document.getElementById("avaliacaoTxt").value = ""; // Limpa o campo
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