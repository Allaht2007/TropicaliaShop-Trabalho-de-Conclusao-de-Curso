          /*Imports*/
          const express = require ("express");
          const router = express();
          const bodyParser = require("body-parser");
          const bcrypt = require("bcryptjs");
          const Usuario = require("../Tables/Usuario");
          const info = require("../Tables/info");
          const Categoria = require("../Tables/Categoria");


          
router.use(bodyParser.urlencoded({extended:true}));

const isAdmin = (req, res, next) => {
    if (req.session.usuario && req.session.usuario.tipo === 'admin') {
      next();
    } else {
      res.redirect('/');
    }
  };
  

router.get("/homeAdm",isAdmin,(req,res)=>{
    res.render("../views/Telas/HomeAdm.ejs");
});

router.get("/lojaProdsAdm",isAdmin, async(req,res)=>{
    const usuarios = await Usuario.findAll({order:[["nome_user","ASC"]]});

    const resultados = []

    for(const usuario of usuarios){

        console.log(usuario.cpf_cnpj);
        const infos = await info.findOne({
            where:{
                cpf_cnpj: usuario.cpf_cnpj
            }
        })

    
    if(infos == null){
        resultados.push({
            user:usuario.dataValues,  
        });
        continue;
    }else{

        resultados.push({
            user:usuario.dataValues,
            info: infos.dataValues  
        });
    } 
    }

        res.render("../views/Telas/lojaProdAdm.ejs",{resultados});
    
});
router.get("/removeLoja",isAdmin,(req, res) => {
    let idLoja = req.query.id_user;
    Usuario.destroy({
        where: {
            id_user: idLoja
        }
    }).then(() => {
        res.redirect("/lojaProdsAdm");
    })
  })

  router.post('/editarInfo',isAdmin, async (req, res) => {
    try {
      const { cpf_cnpj, afiliado } = req.body;
  
      // Atualiza o campo afiliado baseado no valor da checkbox
      await info.update(
        { afiliado: afiliado === 'true' }, 
        { where: { cpf_cnpj } }
      );
  
      // Redireciona de volta para a página de onde veio
      res.redirect('back');
    } catch (error) {
      console.error(error);
      res.status(500).send("Ocorreu um erro ao atualizar a informação.");
    }
  });
  
  

//CATEGORIAS///////////////////////////////////////



router.get("/categsAdm",isAdmin,(req,res)=>{

    Categoria.findAll({
        order:[["nome_categ","ASC"]]
    }).then((categ)=>{
        res.render("../views/Telas/categsAdm.ejs",{categ});
    })
    
});

router.post("/cadastrarCateg",isAdmin,(req,res)=>{
    let categoria = req.body.nomeCateg;
    let tipo = req.body.tipoCateg;
    Categoria.findOne({
        where:{
            nome_categ:categoria,
        }
    }).then((categ)=>{

        if(categ){
            console.log("Categoria Existente");
            res.redirect("/categsAdm")
        } else{
            Categoria.create({
                nome_categ: categoria,
                tipo_categ:tipo
            }).then(()=>{
                res.redirect("/categsAdm")
            })
        }
    })
})

router.get("/removeCateg",isAdmin,(req,res)=>{
    id_categ = req.query.id_categ;

    Categoria.destroy({
        where:{
            id_categoria:id_categ
        }
    }).then(()=>{
        res.redirect("/categsAdm");
    })
})
   
module.exports = router;