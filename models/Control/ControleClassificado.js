const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Classificado = require("../Tables/Classificado");
const Fluxo = require("../Tables/CarrinhoClass")
const Info = require("../Tables/info");
const Categ = require("../Tables/Categoria");
const Sequelize = require("sequelize");
const Usuario = require("../Tables/Usuario");
const Avaliacao = require("../Tables/Avaliacao");
const multer = require('multer');
const { Op } = require("sequelize");
const Compras = require("../Tables/Compras");

router.use(bodyParser.urlencoded({extended:true}));
router.use(express.static("public"));

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
      const preco = parseFloat(req.body.precoProd.replace('R$', '').trim());
      Classificado.create({
        nome_prod: req.body.nomeProd,
        qnt_prod:req.body.qntdProd,
        preco_prod :preco,
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
  let usuario = req.session.usuario;

  if (!usuario) {
    res.redirect("/cadastro");
  }
  let info = req.session.infos; 
  if(!info){
    res.redirect("/mostraInfo");
  }else{

    Classificado.findAll({
      where:{
        id_info:req.session.infos.id_info, 
      },
      order: [
          ['data_public', 'DESC']
      ]
    }).then((classificado)=>{
      res.render("../views/Telas/prodUser",{classificado:classificado});
    }).catch(()=>{
      res.render("../views/Telas/prodUser",{classificado:undefined});
    })
    
  }
  
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

 router.post("/deletaProd",(req, res) => {
  let idProd = req.body.idProd;
  Classificado.destroy({
      where: {
          id_classificado: idProd
      }
  }).then(() => {
      res.redirect("/mostraProd");
  })
})


router.post("/editarProd",upload.single('image'),(req,res)=>{

  const caminhoImagem = req.file.path.replace(/^public[\\/]+/, '');
  const preco = parseFloat(req.body.precoProd.replace('R$', '').trim());
  Classificado.update({
    nome_prod: req.body.nomeProd,
    qnt_prod:req.body.qntdProd,
    preco_prod :preco,
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


router.get("/Classificado", async (req, res) => {
  try {
    // Incrementa a quantidade de visualizações
    await Classificado.increment("qnt_views", {
      by: 1,
      where: {
        id_classificado: req.query.id,
      }
    });

    // Encontra o classificado com base no id
    const classificado = await Classificado.findOne({
      where: {
        id_classificado: req.query.id,
      },
    });

    if (!classificado) {
      return res.status(404).send("Classificado não encontrado");
    }

    // Encontra a categoria associada
    const categ = await Categ.findOne({
      where: {
        id_categoria: classificado.id_categ,
      },
    });

    // Encontra o Info do vendedor (usuário que cadastrou o classificado)
    const vendedorInfo = await Info.findOne({
      where: {
        id_info: classificado.id_info,
      }
    });

    // Encontra o usuário que cadastrou o classificado com base no cpf_cnpj do vendedorInfo
    const vendedorUsuario = await Usuario.findOne({
      where: {
        cpf_cnpj: vendedorInfo.cpf_cnpj
      }
    });

    // Encontra os classificados mais vendidos
    const interesses = await Classificado.findAll({
      order: [['qnt_vendas', 'DESC']],
      limit: 5,
    });

    // Encontra os fluxos associados ao classificado
    const fluxo = await Fluxo.findAll({
      where: {
        id_classificado: classificado.id_classificado,
      },
    });

    // Encontra as compras associadas aos fluxos
    const compras = await Compras.findAll({
      where: {
        id_CarrinhoClass: fluxo.map(f => f.id_carrinhoClass),
      },
    });

    let id_info = compras.map(f => f.id_info);

    const infos = await Info.findAll({
      where: { id_info: id_info }
    });

    const usuarios = await Usuario.findAll({
      where: { cpf_cnpj: infos.map(f => f.cpf_cnpj) }
    });

    // Encontra as avaliações associadas às compras
    let avaliacoes = await Avaliacao.findAll({
      where: {
        id_compras: compras.map(c => c.id_compras),
      },
    });

    // Se não houver avaliações, definir avaliacoes como undefined
    if (avaliacoes.length === 0) {
      avaliacoes = undefined;
    }

    // Cria um map para associar avaliações aos respectivos usuários
    const avaliacoesComUsuarios = avaliacoes ? avaliacoes.map(avaliacao => {
      const compra = compras.find(c => c.id_compras === avaliacao.id_compras);
      const info = infos.find(i => i.id_info === compra.id_info);
      const usuario = usuarios.find(u => u.cpf_cnpj === info.cpf_cnpj);
      return {
        avaliacao,
        usuario: usuario ? usuario.nome_user : 'Usuário desconhecido'
      };
    }) : [];

    res.render("../views/Telas/pageClassificado", { 
      classi: classificado, 
      categ, 
      interesses, 
      fluxo, 
      compras, 
      avaliacoes: avaliacoesComUsuarios, 
      info: infos, 
      usuarios, 
      vendedorInfo,
      vendedorUsuario 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocorreu um erro ao buscar os dados.");
  }
});





router.post("/pesquisar",(req,res)=>{
  const pesquisa = req.body.searchBar;
  Classificado.findAll({
    where: { 
      nome_prod: { [ Op.like]: `%${pesquisa}%`},
        qnt_prod: { [Op.gt]: 0 } 
      
     
    }
  }).then((classificados)=>{{
    Usuario.findAll({
      where:{
        nome_user: { [ Op.like]: `%${pesquisa}%` 
      }
    }
    }).then((usuarios)=>{
      res.render("../views/Telas/resultPesquisa",{usuarios,classificados});
    })
  }})
});

router.get("/pesquisaCateg",(req,res)=>{
  const pesquisa = req.query.id_categ;
  Classificado.findAll({
    where: { 
      id_categ: pesquisa,
     }
  }).then((classificados)=>{{
    Fluxo
      res.render("../views/Telas/resultPesquisa",{usuarios:"",classificados});

  }})
});



  module.exports = router;