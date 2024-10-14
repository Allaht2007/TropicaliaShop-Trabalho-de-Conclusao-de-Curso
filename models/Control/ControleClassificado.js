const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Classificado = require("../Tables/Classificado");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/cadProduto",(req,res)=>{
    res.render("../views/Telas/cadProduto");
})

module.exports = router;