document.getElementById('icons8--plus').addEventListener('click', function() {
    var btn = this;
    var popup = document.getElementById('conteudoModal');
    
    if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'block';
        btn.classList.add('clicked');
    }
});

document.getElementById('fecharbtn').addEventListener('click', function() {
    var popup = document.getElementById('conteudoModal');
    var btn = document.getElementById('icons8--plus');
    
    popup.style.display = 'none'; 
    btn.classList.remove('clicked');
});
