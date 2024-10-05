const btnCadastrar = document.getElementById('cadastrar');
const btnLogin = document.getElementById('login');
const container = document.getElementById('container');
const btnChange = document.getElementById('btn-pfPj');
const inputChange = document.getElementById('PFpjUser');
//const hiddenInput = document.getElementById('btnTipoHidden');


btnCadastrar.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

btnLogin.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


btnChange.addEventListener('click', () => {
    if (btnChange.value === "PF") {
        btnChange.value = "PJ";
        inputChange.placeholder = "CNPJ";
        inputChange.value = ""; // Limpa o campo ao alternar
        inputChange.setAttribute('maxlength', '18'); // Define o tamanho máximo para CNPJ
    } else {
        btnChange.value = "PF";
        inputChange.placeholder = "CPF";
        inputChange.value = ""; // Limpa o campo ao alternar
        inputChange.setAttribute('maxlength', '14'); // Define o tamanho máximo para CPF
    }

    // Atualiza o campo oculto
	
});


//Formatação de campos cnpj e cpf utilizando copilot para auxilio

function formatCPF(value) {
    return value
        .replace(/\D/g, '') // Remove caracteres não numéricos
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatCNPJ(value) {
    return value
        .replace(/\D/g, '') // Remove caracteres não numéricos
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

