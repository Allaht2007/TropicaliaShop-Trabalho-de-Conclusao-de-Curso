const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const CarrinhoClass = require("../Tables/CarrinhoClass");
router.use(bodyParser.urlencoded({extended:true}));

router.get("/removeCarrinho",(req, res) => {

    if(!req.session.usuario){
        res.redirect("/cadastro")
    }
    if(!req.session.infos){
        res.redirect("/mostraInfo")
    }
    let idProd = req.query.id_carrinho;
    CarrinhoClass.destroy({
        where: {
            id_carrinhoClass: idProd,
            status: "pendente"
        }
    }).then(() => {
        res.redirect("/carrinho");
    }).catch((err)=>{
        console.log(err)
        res.redirect("/carrinho");
    })
  })
  




module.exports = router;
