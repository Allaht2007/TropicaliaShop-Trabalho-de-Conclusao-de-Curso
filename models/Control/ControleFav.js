const express = require("express");
const router =  express();
const bodyParser = require("body-parser");
const Fav = require("../Tables/Fav");

router.use(bodyParser.urlencoded({extended:true}));
router.get("/favoritos",(req,res)=>{
    res.render("../views/Telas/prodFavoritos.ejs");
    });
    
module.exports = router;
