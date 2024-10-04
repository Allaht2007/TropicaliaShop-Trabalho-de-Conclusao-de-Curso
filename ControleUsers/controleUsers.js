          /*Imports*/
const express = require ("express");
const router = express();
const bodyParser = require("body-parser");
//const bcrypt = require("bcryptjs");
const bancoUser = require("./Usuario");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/cadastro",(req,res)=>{
    res.render("../views/UsuarioTelas/cadastro")
});

router.post("/cadastraUser",(req,res)=>{
    
})

module.exports = router;