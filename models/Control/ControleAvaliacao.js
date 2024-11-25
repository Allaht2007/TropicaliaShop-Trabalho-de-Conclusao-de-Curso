const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Avaliacao = require("../Tables/Avaliacao");

router.use(bodyParser.urlencoded({extended:true}));


router.post("/avaliacao",(req,res)=>{

    const nota = req.body.avaliacaoNota;
    const texto = req.body.avaliacaoTxt;
    const id_compra = req.body.idCompra;
    console.log("Nota: "  + nota);
    console.log("Texto:" + texto);
    console.log("id_compra: " + id_compra);
    Avaliacao.create({
        nota_avaliacao: nota,
        desc_avaliacao: texto,
        id_compras: id_compra
    }).then(()=>{
        res.redirect("/mostraCompra");
    })
})

module.exports = router;    