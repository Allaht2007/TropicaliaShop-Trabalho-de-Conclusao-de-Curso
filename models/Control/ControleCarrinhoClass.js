const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const CarrinhoClass = require("../Tables/CarrinhoClass");
router.use(bodyParser.urlencoded({extended:true}));

router.get("/removeCarrinho",(req, res) => {
    let idProd = req.query.id_carrinho;
    CarrinhoClass.destroy({
        where: {
            id_carrinhoClass: idProd
        }
    }).then(() => {
        res.redirect("/carrinho");
    })
  })
  




module.exports = router;
