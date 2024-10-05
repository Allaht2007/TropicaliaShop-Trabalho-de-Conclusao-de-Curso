const btnCadastrar = document.getElementById('cadastrar');
const btnLogin = document.getElementById('login');
const container = document.getElementById('container');

const btnChange = document.getElementById('btnPf');
const inputChange = document.getElementById('cpf');
const hiddenInput = document.getElementById('btnPfHidden');
const form = document.querySelector('form[action="/cadastraUser"]');



btnCadastrar.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

btnLogin.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

if (btnChange.value === "PF") {
    inputChange.addEventListener('input', handleInputCPF);
} else {
    inputChange.addEventListener('input', handleInputCNPJ);
}



btnChange.addEventListener('click', () => {
    if (btnChange.value === "PF") {
        btnChange.value = "PJ";
        inputChange.placeholder = "CNPJ";
        inputChange.value = ""; // Limpa o campo ao alternar
        inputChange.setAttribute('maxlength', '18'); // Define o tamanho máximo para CNPJ

        inputChange.addEventListener('input', handleInputCNPJ);
        inputChange.removeEventListener('input', handleInputCPF);
    } else {
        btnChange.value = "PF";
        inputChange.placeholder = "CPF";
        inputChange.value = ""; // Limpa o campo ao alternar
        inputChange.setAttribute('maxlength', '14'); // Define o tamanho máximo para CPF

        inputChange.addEventListener('input', handleInputCPF);
        inputChange.removeEventListener('input', handleInputCNPJ);
    }

    hiddenInput.value = btnChange.value;

	
});

form.addEventListener('submit', () => {
    hiddenInput.value = btnPf.value;
});

function handleInputCPF(e) {
    e.target.value = formatCPF(e.target.value);
}

function handleInputCNPJ(e) {
    e.target.value = formatCNPJ(e.target.value);
}

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

