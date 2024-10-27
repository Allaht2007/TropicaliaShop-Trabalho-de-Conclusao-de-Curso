const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Classificado = require("../Tables/Classificado");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/cadProduto",(req,res)=>{
    res.render("../views/Telas/cadProduto");
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

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


router.post('/cadastroProd', upload.single('image'), (req, res) => {

      const dataAtual = new Date();
      const produto = Produto.create({
        nome_prod: req.body.nome,
        qnt_prod,
        preco_prod,
        desc_prod,
        data_public:dataAtual, 
        qnt_vendas,
        qnt_views,
        imagens: req.file.path,
        id_categ,
        id_info:req.session.usuario.id,
        
      }).then(()=>{
        res.redirect("/mostraProd");
      })
  });

module.exports = router;