const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Classificado = require("../Tables/Classificado");
const Categ = require("../Tables/Categoria");
const multer = require('multer');
const { where } = require("sequelize");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/cadProduto",(req,res)=>{
  let usuario = req.session.usuario;

  if (!usuario) {
    res.redirect("/cadastro");
  }

  Categ.findAll({
      order: [
          ['nome_categ', 'ASC']
      ]
  }).then((categ)=>{
    res.render("../views/Telas/cadProduto",{categoria:categ});
  })
    
});



//parte de cadastro de produto
/*router.post("/cadastroProduto", async (req, res) => {
    let nomeProd = req.body.nomeProd; 
    let categProd = req.body.categProd; 
    let precoProd = req.body.precoProd; 
    let qntdProd = req.body.qntdProd; 
    let descricaoProd  = req.body.descricaoProd;

    if (!nomeProd || !categProd || !precoProd || !qntdProd || !descricaoProd) {
        console.log('Campos obrigatórios faltando');
        return res.status(400).send('Todos os campos são obrigatórios.');
    } else{
        res.redirect("/");
    } 
});
*/


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


router.post('/cadastroProduto', upload.single('image'), (req, res) => {
 
    let usuario = req.session.usuario;

    if (!usuario) {
      res.redirect("/cadastro");
    }
      const dataAtual = new Date();
      const caminhoImagem = req.file.path.replace(/^public[\\/]+/, '');
      Classificado.create({
        nome_prod: req.body.nomeProd,
        qnt_prod:req.body.qntdProd,
        preco_prod :req.body.precoProd,
        desc_prod :req.body.descricaoProd,
        data_public:dataAtual, 
        qnt_vendas:0,
        qnt_views:0,
        imagens:caminhoImagem,
        id_categ:req.body.categProd,
        id_info:req.session.infos.id_info,
        
      }).then(()=>{
        res.redirect("/mostraProd");
      }).catch(err => { 
        console.error(err); 
        res.status(500).send('Erro ao inserir o produto.'+ err); 
      });
});


router.get("/mostraProd",(req,res)=>{
    Classificado.findAll({
      where:{
        id_info:req.session.infos.id_info, 
      }
    }).then((classificado)=>{
      res.render("../views/Telas/prodUser",{classificado:classificado});
    }).catch(()=>{
      res.render("../views/Telas/prodUser",{classificado:undefined});
    })
   
  
});

router.post("/editaProd/",(req,res)=>{
  let usuario = req.session.usuario;
  if (!usuario) {
    res.redirect("/cadastro");
  }
    
  let id = req.body.idProd;
  Classificado.findByPk(id).then((classi)=>{
  
    Categ.findAll({
      order: [
          ['nome_categ', 'ASC']
      ]
    }).then((categ)=>{
      res.render("../views/Telas/editaProduto",{categoria:categ, classi});
    })
  });
 });


router.post("/editarProd",upload.single('image'),(req,res)=>{

  const caminhoImagem = req.file.path.replace(/^public[\\/]+/, '');
  Classificado.update({
    nome_prod: req.body.nomeProd,
    qnt_prod:req.body.qntdProd,
    preco_prod :req.body.precoProd,
    desc_prod :req.body.descricaoProd,
    imagens:caminhoImagem,
    id_categ:req.body.categProd,
    
  },{
    where:{
      id_classificado:req.body.idProd,
    }
  }

).then(()=>{
    res.redirect("/mostraProd");
  }).catch(err => { 
    console.error(err); 
    res.status(500).send('Erro ao inserir o produto.'+ err); 
  });
});


  module.exports = router;