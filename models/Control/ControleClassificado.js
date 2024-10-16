const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Classificado = require("../Tables/Classificado");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/cadProduto",(req,res)=>{
    res.render("../views/Telas/cadProduto");
});

//parte de cadastro de produto
/*router.post("/cadastroProduto", async (req, res) => {
    let nomeProd = req.body.nomeProd; 
    let categProd = req.body.categProd; 
    let precoProd = req.body.precoProd; 
    let qntdProd = req.body.qntdProd; 
    let descricaoProd  = req.body.descricaoProd;

    if (!nomeProd || !categProd || !precoProd || !qntdProd || !descricaoProd) {
        console.log('Campos obrigatórios faltando');
        return res.status(400).send('Todos os campos são obrigatórios.');
    } else{
        res.redirect("/");
    } 
});
*/

module.exports = router;