function openDialog(delta) {
    document.getElementById("avaliacaoDialog-" + delta).classList.add("show");
  }
  
  function closeDialog(delta) {
    document.getElementById("avaliacaoDialog-" + delta).classList.remove("show");
    document.getElementById("avaliacaoTxt-" + delta).value = ""; // Limpa o campo textarea
    
    // Reseta as estrelas
    const estrelas = document.querySelectorAll('.star-icon[data-delta="'+delta+'"]');
    estrelas.forEach(function(star) {
      star.classList.remove('ativo');
    });
    if (estrelas[0]) {
      estrelas[0].classList.add('ativo'); // Adiciona a classe 'ativo' à primeira estrela
    }
  
    // Reseta o valor da nota
    document.getElementById("avaliacaoNota-" + delta).value = 1;
  }
  
  document.querySelectorAll('.star-icon').forEach(star => {
    star.addEventListener('click', function(e) {
      var classStar = e.target.classList;
      if (!classStar.contains('ativo') && classStar.contains('star-icon')) {
        var delta = star.getAttribute('data-delta'); // Obtém o valor de delta do atributo data-delta
  
        document.querySelectorAll(`.star-icon[data-delta="${delta}"]`).forEach(function(star) {
          star.classList.remove('ativo');
        });
        classStar.add('ativo');
        document.getElementById("avaliacaoNota-" + delta).value = e.target.getAttribute('data-avaliacao');
        console.log(e.target.getAttribute('data-avaliacao'));
      }
    });
  });
  