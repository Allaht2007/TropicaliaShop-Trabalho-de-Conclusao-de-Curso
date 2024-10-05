          /*Imports*/
const express = require ("express");
const router = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const Usuario = require("../Tables/Usuario");

const User = require("../Tables/Usuario");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/cadastro",(req,res)=>{
    res.render("../views/Telas/cadastro")
});

router.post("/cadastraUser", async (req, res) => {
    let nameUser = req.body.nameUser; 
    let cpf = req.body.cpf; 
    let emailUser = req.body.emailUser; 
    let senhaUser = req.body.senhaUser; 
    let btnTipo  = req.body.btnPfHidden;

    console.log(`nameUser: ${nameUser}, PFpjUser: ${cpf}, emailUser: ${emailUser}, senhaUser: ${senhaUser}, btnTipo: ${btnTipo}`);

  
});

module.exports = router;
