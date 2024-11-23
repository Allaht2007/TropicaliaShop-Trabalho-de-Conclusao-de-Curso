const inputFile = document.querySelector(".picture-input");
const pictureImage = document.querySelector(".picture-img");
const pictureImageTxt = "Imagem do produto";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture-img");

      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
});


//Formatação campo de preço do produto

document.addEventListener('DOMContentLoaded', function() {
    const precoProd = document.getElementById('precoProd');
    if (precoProd) {
        precoProd.addEventListener('input', function(event) {
            let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito 
            valor = (valor / 100).toFixed(2); // Divide por 100 para ajustar o valor 
            valor = valor.replace('.', ','); // Troca ponto por vírgula 
            valor = 'R$ ' + valor; // Adiciona o símbolo de Real 
            event.target.value = valor;
        });

        // Aciona o evento 'input' para inicializar o valor
        const event = new Event('input');
        precoProd.dispatchEvent(event);
    }
});

