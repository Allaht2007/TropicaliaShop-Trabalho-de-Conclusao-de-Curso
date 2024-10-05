          /*Imports*/
const express = require ("express");
const router = express();
const bodyParser = require("body-parser");
<<<<<<< HEAD:ControleUsers/controleUsers.js
const bcrypt = require("bcryptjs");
const Usuario = require("./Usuario");
=======
//const bcrypt = require("bcryptjs");
const User = require("../Tables/Usuario");
>>>>>>> dd2ee02203de2a50f9dd6ba7ddfacc6561ffd336:models/Control/controleUsers.js

router.use(bodyParser.urlencoded({extended:true}));

router.get("/cadastro",(req,res)=>{
    res.render("../views/Telas/cadastro")
});
router.post("/cadastraUser", async (req, res) => {
    let { nameUser, PFpjUser, emailUser, senhaUser, btnTipo } = req.body;

    console.log(`nameUser: ${nameUser}, PFpjUser: ${PFpjUser}, emailUser: ${emailUser}, senhaUser: ${senhaUser}, btnTipo: ${btnTipo}`);

    if (!nameUser || !PFpjUser || !emailUser || !senhaUser || !btnTipo) {
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

            // Cria um novo usuário no banco de dados
            await Usuario.create({
                nome_user: nameUser,
                email_user: emailUser,
                senha_user: hash,
                cpf_cnpj: PFpjUser,
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
