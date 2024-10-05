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

    if (!nameUser || !cpf || !emailUser || !senhaUser || !btnTipo) {
        console.log('Campos obrigatórios faltando');
        return res.status(400).send('Todos os campos são obrigatórios.');
    }
    try {
        // Verifica se o usuário já existe pelo email
        let usuario = await Usuario.findOne({ where: { email_user: emailUser } });
        if (!usuario) {
            // Gera um salt e hash para a senha
            let criahash = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(senhaUser, criahash);
            
            await Usuario.create({
                nome_user: nameUser,
                email_user: emailUser,
                senha_user: hash,
                cpf_cnpj: cpf,
                tipo_user: btnTipo
            });

            res.redirect("/");
        } else {
            res.send('Usuário já existe');
        }
    } catch (erro) {
        console.log('Erro ao cadastrar usuário:', erro);
        res.status(500).send('Erro ao cadastrar usuário');
    }
   
});

module.exports = router;
