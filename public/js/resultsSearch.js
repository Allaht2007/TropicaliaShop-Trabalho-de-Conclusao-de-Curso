
        document.getElementById("btnLoja").addEventListener("click", function() {
            document.getElementById("lojas").classList.add("active");
            document.getElementById("produtos").classList.remove("active");
            this.classList.add("active");
            document.getElementById("btnProd").classList.remove("active");
            document.querySelector('.linha').style.transform = 'translateX(150%)';
           
        });

        document.getElementById("btnProd").addEventListener("click", function() {
            document.getElementById("produtos").classList.add("active");
            document.getElementById("lojas").classList.remove("active");
            this.classList.add("active");
            document.getElementById("btnLoja").classList.remove("active");
            document.querySelector('.linha').style.transform = 'translateX(2vh)';
        });
    