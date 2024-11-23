document.addEventListener("DOMContentLoaded", function() { 
    function atualizaPreco(input) { 
       
        const valorSpan = document.getElementById('precoproduto').innerText; 
        const quantidade = document.querySelector('.classificado-btn__qnt input[type="number"]').value;
        const precoUnitario = parseFloat(valorSpan.replace('R$', '').trim());
        
        if(quantidade != NaN && quantidade != undefined && quantidade != 0 && quantidade !="" && quantidade != null){

        const precoTotal = quantidade * precoUnitario;

            document.getElementById('final-price').innerText = `Valor Total: R$ ${precoTotal.toFixed(2)}`;


    }else{

        document.getElementById('final-price').innerText = `Valor Total: R$ ${precoUnitario.toFixed(2)}`; 

    }
    
    } 
        document.getElementById('qntw').addEventListener('input', function() {
            atualizaPreco(this.id); 
        }); 
    });