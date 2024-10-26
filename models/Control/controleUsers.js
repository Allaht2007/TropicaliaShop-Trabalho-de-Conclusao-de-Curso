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

//parte de cadastro de usuário
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
            }).then((usuario)=>{
                req.session.usuario = {

                id: usuario.id_user,
                email: usuario.email_user,
                nome:usuario.nome_user,
                cpf_cnpj: usuario.cpf_cnpj
            
                }
                console.log(req.session.usuario.cpf_cnpj);
                res.redirect("/");
            });

        } else {
            res.send('Usuário já existe');
        }
    } catch (erro) {
        console.log('Erro ao cadastrar usuário:', erro);
        res.status(500).send('Erro ao cadastrar usuário');
    }
   
});
//parte de login de usuario
router.post("/loginUser",(req,res)=>{
    let login = req.body.emailUser;
    let senha_user = req.body.senhaUser;
    Usuario.findOne({
        where:{
            email_user:login
        }
    }).then((usuario)=>{
        if(usuario != undefined){
           
            var SenhaCorreta = bcrypt.compareSync(senha_user, usuario.senha_user);
            
            if(SenhaCorreta){
            
                req.session.usuario = {
                    id: usuario.id_user,
                    email: usuario.email_user,
                    nome:usuario.nome_user,
                    cpf_cnpj: usuario.cpf_cnpj
               }
               console.log(req.session.usuario.cpf_cnpj);
                res.redirect("/");
            }else{
                
                res.redirect("/cadastro");
            }
        }else{
            res.redirect("/cadastro");
        }
    })
});

router.get("/sair",(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})


module.exports = router;
