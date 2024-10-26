const express = require ("express");
const router = express();
const bodyParser = require("body-parser");
const Info = require("../Tables/info");
const { where } = require("sequelize");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/mostraInfo",(req,res)=>{
    
    let usuario = req.session.usuario;

if (!usuario) {
    res.redirect("/cadastro");
}

let cpf = req.session.usuario.cpf_cnpj;
console.log("CPF:", cpf); 

Info.findOne({
    where: {
        cpf_cnpj: cpf,
    }
}).then((infos) => {
    req.session.infos = {
        id_info: infos.id_info
    }
    res.render("../views/Telas/infosUser", {
        infos: infos === null ? undefined : infos   , 
        sessInfo: {
            email: usuario.email,
            cpf_cnpj: usuario.cpf_cnpj,
            nome: usuario.nome,
        }
    });
}).catch((error) => {
    console.error("Erro ao encontrar infos:", error);
    res.render("../views/Telas/infosUser", {
        infos: undefined, 
        sessInfo: {
            email: usuario.email,
            cpf_cnpj: usuario.cpf_cnpj,
            nome: usuario.nome,
        }
    });
});
});


router.post("/salvarInfos",(req,res)=>{
    let dataNasc = req.body.dataNasc;
    let [dia,mes,ano] = dataNasc.split("/");
    let data = `${ano}-${mes}-${dia}`;
    Info.create({
        cep:req.body.cep,
        uf:req.body.estado,
        cidade:req.body.cidade,
        bairro:req.body.bairro,
        rua:req.body.rua,
        numero_casa:req.body.numero,
        complemento:req.body.complemento,
        cpf_cnpj:req.body.cpf_cnpj,
        data_nasc:data,
        telefone:req.body.telefone,
        afiliado:false,
    }).then((infos)=>{
        req.session.infos = {
            id_info: infos.id_info
        }
        res.redirect("/mostraInfo");    
    })
})

router.post("/editaInfos",(req,res)=>{
    let dataNasc = req.body.dataNasc;
    let [dia,mes,ano] = dataNasc.split("/");
    let data = `${ano}-${mes}-${dia}`;


    
    Info.update({
        cep:req.body.cep,
        uf:req.body.estado,
        cidade:req.body.cidade,
        bairro:req.body.bairro,
        rua:req.body.rua,
        numero_casa:req.body.numero,
        complemento:req.body.complemento,
        cpf_cnpj:req.body.cpf_cnpj,
        data_nasc:data,
        telefone:req.body.telefone,
        afiliado:false,
    },
    {
        where:{
            id_info:req.session.infos.id_info,
        }
    })
    res.redirect("/mostraInfo");    
});


module.exports = router;
