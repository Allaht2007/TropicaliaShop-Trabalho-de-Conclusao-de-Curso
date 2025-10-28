require('dotenv').config();

const express = require("express");
const Conexao = require("./BancoDados/baseDados");
const session = require("express-session");
const app = express();
const {Op} = require("sequelize");
const http = require('http');

const Classificado = require("./models/Tables/Classificado");
const Info = require("./models/Tables/info");
const Categ = require("./models/Tables/Categoria");


const controleAdm = require("./models/Control/ControleAdm");
const controleusers = require("./models/Control/controleUsers");
const controleInfo = require("./models/Control/ControleInfo");
const controleFav = require("./models/Control/ControleFav");

const controleClassificado = require("./models/Control/ControleClassificado")
const {controleCompras,finalizarCompra} = require("./models/Control/ControleCompras");
const controleAvaliacao = require("./models/Control/ControleAvaliacao");
const {FuncCarrinho,controleCarrinho} = require("./models/Control/ControleCarrinho");
const controleCategoria = require("./models/Control/ControleCategoria");
const controleCarrinhoClass = require("./models/Control/ControleCarrinhoClass");



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365}
}))

// ==========================================================
// SUBSTITUA SEU MIDDLEWARE 'carregarCategorias' POR ESTE:
// ==========================================================
const carregarCategorias = async (req, res, next) => {
  console.log("LOG: [carregarCategorias] Middleware INICIADO."); // Log 1

  try { 
   console.log("LOG: [carregarCategorias] Tentando Categ.findAll()..."); // Log 2
   
   const categorias = await Categ.findAll({
    order:[["nome_categ","ASC"]]
   }); 
   
   console.log("LOG: [carregarCategorias] Categ.findAll() SUCESSO."); // Log 3
   res.locals.categorias = categorias.map(categoria => categoria.dataValues);
    next(); 

   } catch (error) { 
   // SE CHEGAR AQUI, O LOG DE ERRO É OBRIGATÓRIO
   console.error("ERRO CRÍTICO [carregarCategorias]: A consulta Categ.findAll() falhou."); // Log 4
   console.error("ERRO CRÍTICO [Mensagem]:", error.message); // Log 5 (O Erro Real)
   console.error(error); // Log 6 (O Erro Completo)
   next(error); 
 } 
};
// ==========================================================
app.use(carregarCategorias);

app.set("view engine","ejs");
app.use(express.static("public"));

app.use("/", controleCarrinho);
app.use("/", controleCompras);
app.use("/", controleCategoria);
app.use("/", controleClassificado);

app.use("/", controleusers);
app.use("/", controleInfo);
app.use("/", controleFav);
app.use("/", controleAvaliacao);
app.use("/", controleCarrinhoClass);
app.use("/", controleAdm);




Conexao.authenticate().then(()=>{  
    console.log("Servidor rodando");
}).catch((erro)=>{
    console.log(erro);
})


//Configurando o Multer

app.get("/", async(req,res)=>{
  
  if (!req.session.usuario || req.session.usuario.tipo != "admin") {
  
  try {
    const FilterVenda = await Classificado.findAll({
      where: { qnt_prod: { [Op.gt]: 0 },
      status_prod: "visivel" 
  }, // Adicionando condição para quantidade maior que 0
      order: [['qnt_vendas', 'DESC']],
      limit: 20,
    });

    const FilterViews = await Classificado.findAll({
      where: { qnt_prod: { [Op.gt]: 0 },
      status_prod: "visivel"  
    }, // Adicionando condição para quantidade maior que 0
      order: [['qnt_views', 'DESC']],
      limit: 20,
    });

    const FilterAssociado = await Classificado.findAll({
      include: [{
        model: Info,
        where: { 
        afiliado: true, 
        
        },
      }],
      where: { qnt_prod: { [Op.gt]: 0 },
      status_prod: "visivel"
   }, // Adicionando condição para quantidade maior que 0
      order: [['data_public', 'DESC']],
      limit: 20,
    });

    const FilterCateg = await Classificado.findAll({
      include: [{
        model: Categ,
        where: { tipo_categ: "acessorio",
        
         },
      }],
      where: { qnt_prod: { [Op.gt] : 0 },
      status_prod: "visivel"
    }, // Adicionando condição para quantidade maior que 0
      order: [['data_public', 'DESC']],
      limit: 20,
    });
      
  
      res.render("../views/index",{
        ClassAssociado:FilterAssociado,
        ClassVendas:FilterVenda,
        ClassViews:FilterViews,
        ClassCateg:FilterCateg,
       
      })
    }catch(err){
      console.log(err);
    }
  }else{
    res.redirect("/homeAdm");
  }
  
  });

  
module.exports = app;
