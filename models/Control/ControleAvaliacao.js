const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Avaliacao = require("../Tables/Avaliacao");

router.use(bodyParser.urlencoded({extended:true}));


router.post("/avaliacao",(req,res)=>{
    let 
})

module.exports = router;    