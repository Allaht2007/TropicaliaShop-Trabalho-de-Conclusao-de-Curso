const buttonCadastrar = document.getElementById('cadastrar');
const buttonLogin = document.getElementById('login');
const container = document.getElementById('container');

buttonCadastrar.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

buttonLogin.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

