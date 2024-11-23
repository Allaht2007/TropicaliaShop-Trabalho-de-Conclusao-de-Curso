const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Compras = require("../Tables/Compras");
const Fluxo = require("../Tables/CarrinhoClass");
const Info = require("../Tables/info");
const Carrinho = require("../Tables/Carrinho");
const Classificado = require("../Tables/Classificado");
const { where } = require("sequelize");

router.use(bodyParser.urlencoded({ extended: true }));

const finalizarCompra = async (usuarioId, itensSelecionados, classificados, quantidade) => {
    try {
        const info = await Info.findByPk(usuarioId);
        const carrinho = await Carrinho.findOne({
            where: { id_info: info.id_info }
        });

        const itens = await Fluxo.findAll({
            where: {
                id_carrinho: carrinho.id_carrinho,
                id_classificado: classificados,
                status: "pendente"
            },
            include: [{ model: Classificado }]
        });

        const compras = itens.map((item, index) => ({

            id_info: usuarioId,
            id_CarrinhoClass: item.id_carrinhoClass, 
            quantidade: quantidade[index],
            data_compra: new Date(),
            metodo_pagamento: "pix",
            status_compra: "pendente",
            endereco_entrega: `${info.cep}, ${info.cidade}(${info.uf}), Bairro:${info.bairro}, Rua:${info.rua} Num:${info.numero_casa}`
        }));

      
        for (let compra of compras) {
            const carrinhoClass = await Fluxo.findByPk(compra.id_CarrinhoClass);
            if (!carrinhoClass) {
                throw new Error(`CarrinhoClassificado com id ${compra.id_CarrinhoClass} não encontrado.`);
            }
        }

        await Compras.bulkCreate(compras);
        for (let item of itens) { 
            await Fluxo.update( { 
                status: "concluido", 
                quantidade: quantidade[itens.indexOf(item)] 
            }, {
                where: { 
                    id_carrinhoClass: item.id_carrinhoClass 
                } 
            } 
        ); 
        await Classificado.update({ 
            qnt_prod: item.Classificado.qnt_prod - quantidade[itens.indexOf(item)],
            qnt_vendas: parseInt(item.Classificado.qnt_vendas) + parseInt(quantidade[itens.indexOf(item)]) 
        }, { 
            where: { 
                id_classificado: item.id_classificado 
            } 
    }); 
    }
        
    
    } catch (err) {
        console.log(err);
    }
};

router.post('/comprar', async (req, res) => {
    const usuarioId = req.body.usuarioId;
    const classificados = req.body.idClassificado;
    const quantidade = req.body.qntClass;
   

    try {
        const itensSelecionados = Array.isArray(classificados) ? classificados : [classificados];
        const quantidadesArray = Array.isArray(quantidade) ? quantidade : [quantidade];
        await finalizarCompra(usuarioId, itensSelecionados, classificados, quantidadesArray);
        res.redirect("/mostraCompra")
    } catch (error) {
        res.status(500).send('Erro ao finalizar a compra');
    }
});

router.get("/mostraCompra", async (req, res) => {
    

    if (!req.session.usuario) { 
        return res.redirect("/cadastro")
    }; 
    
    if (!req.session.infos) { 
            return res.redirect("/mostraInfo");
    } 

    try {
    const id = req.session.infos.id_info
    const compras = await Compras.findAll({
        where: { id_info: id},
        order: [
            ['status_compra', 'DESC']
        ]
    });
  
      const resultados = [];
  
      for (const compra of compras) {
        const fluxo = await Fluxo.findOne({
          where: { id_carrinhoClass: compra.id_CarrinhoClass },
        });
  
        const classificado = await Classificado.findOne({
          where: { id_classificado: fluxo.id_classificado },
        });
        
        resultados.push({
          ...compra.dataValues,
          fluxo: {
            ...fluxo.dataValues,
            classificado,
          },
        });
      }
    
      res.render("../views/Telas/Pedidos", { resultados });
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Ocorreu um erro ao buscar os dados.");
    }
  });
  
router.get("/entregue",(req,res)=>{
    const id_compra = req.query.id_compra

    Compras.update(
    {
        status_compra:"entregue",
    },
    {
    where:{
        id_compras:id_compra,
    }
    }
    ).then(()=>{
        res.redirect("/mostraCompra")
    })
})
  


module.exports = { controleCompras: router };
