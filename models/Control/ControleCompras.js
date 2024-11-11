const express = require("express");
const router = express();
const bodyParser = require("body-parser")
const Compras = require("../Tables/Compras");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/Pedidos",(req,res)=>{
    res.render("../views/Telas/Pedidos");
});

module.exports = router;
