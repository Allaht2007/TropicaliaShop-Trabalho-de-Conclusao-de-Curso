const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Classificado = require("../Tables/Classificado");
const Categ = require("../Tables/Categoria");
const multer = require('multer');

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

router.get("/mostraProd",(req,res)=>{
  res.render("../views/Telas/prodUser");
})

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
      Classificado.create({
        nome_prod: req.body.nomeProd,
        qnt_prod:req.body.qntdProd,
        preco_prod :req.body.precoProd,
        desc_prod :req.body.descricaoProd,
        data_public:dataAtual, 
        qnt_vendas:0,
        qnt_views:0,
        imagens:req.file.path,
        id_categ:req.body.categProd,
        id_info:req.session.infos.id_info,
        
      }).then(()=>{
        res.redirect("/mostraProd");
      }).catch(err => { 
        console.error(err); 
        res.status(500).send('Erro ao inserir o produto.'+ err); 
      });
  });

module.exports = router;