const express = require("express");
const router = express();
const Carrinho = require("../Tables/Carrinho");
const Fluxo = require("../Tables/CarrinhoClass");
const Classificado = require("../Tables/Classificado");
const bodyParser = require("body-parser");



router.use(bodyParser.urlencoded({extended:true}));

const obterOuCriarCarrinho = async (id) => { 
    let carrinho = await Carrinho.findOne({ 
        where: { 
            id_info: id
        } 
    }); 
    if (!carrinho) { 
        carrinho = await Carrinho.create({ 
            id_info: id,
            data_criacao: new Date() 
        }); 
    } 
    return carrinho; 
};

router.get("/carrinho",(req,res)=>{

        let usuario = req.session.usuario;
      
        if (!usuario) {
          res.redirect("/cadastro");
        }
        let info = req.session.infos; 
        if(!info){
          res.redirect("/mostraInfo");

        }else{
      
         obterOuCriarCarrinho(req.session.usuario.id).then((carrinho)=>{
            Fluxo.findAll({
                where:{
                    id_carrinho:carrinho.id_carrinho
                },
                include:{
                    model:Classificado,
                },
                order:[
                    ['data_adicionado', 'ASC']
                ]
            }).then((items)=>{
                res.render("../views/Telas/carrinho",{items});
            })
            
          }).catch((error)=>{
            console.log('Erro ao carregar os produtos do carrinho:', error);
            res.render("../views/Telas/carrinho",{items:undefined});
          })
          
        }
        
});



router.post("/enviaCarrinho",(req,res)=>{
    if(!req.session.usuario){
        res.redirect("/cadastro");
    }
    if(!req.session.infos){
        res.redirect("/mostraInfo");
    }
    

    let data = new Date();
    Carrinho.findOne({
        where:{
            id_info:req.session.infos.id_info,
        }
    }).then((carrinho)=>{

        let idClass = req.body.idClass;
        let quantidade = req.body.qntClass;

        Fluxo.findOne({
            where: { 
                id_carrinho: carrinho.id_carrinho,
                id_classificado: idClass 
               } 
       }).then((dadoExistente)=>{
       if(dadoExistente){
        
        Fluxo.update({
            quantidade:dadoExistente.quantidade + parseInt(quantidade),
        },{
            where:{
                id_carrinhoClass: dadoExistente.id_carrinhoClass,
            }
        })

        res.redirect("/");
        
       }else{
        Fluxo.create({
            id_carrinho:carrinho.id_carrinho,
            quantidade:quantidade,
            status:"pendente",
            data_adicionado: data,
            id_classificado:idClass
        }).then(()=>{
            res.redirect("/carrinho");
        })
    }
    })
})


})


module.exports = {FuncCarrinho:obterOuCriarCarrinho,controleCarrinho:router};
