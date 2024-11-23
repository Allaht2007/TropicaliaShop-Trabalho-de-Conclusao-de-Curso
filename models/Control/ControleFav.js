const express = require("express");
const router =  express();
const bodyParser = require("body-parser");
const Fav = require("../Tables/Fav");
const Classificado = require("../Tables/Classificado");
router.use(bodyParser.urlencoded({extended:true}));

router.get("/CadFavoritos",(req,res)=>{
    let id_fav = req.query.id_fav;
    if(!req.session.usuario){
        res.redirect("/cadastro");
    }
    if(!req.session.infos){
        res.redirect("/mostraInfo");
    }
    if(id_fav){
        Fav.create({
            id_class: id_fav,
            id_info: req.session.infos.id_info,
        }).then(()=>{
            res.redirect("/favoritos");
        });
    }
    
});

router.get("/favoritos",(req,res)=>{

    if(!req.session.usuario){
        res.redirect("/cadastro");
    }
    if(!req.session.infos){
        res.redirect("/mostraInfo");
    }
    let id_info = req.session.infos.id_info;

        Fav.findAll({
           where:{
            id_info: id_info,
           }
           
        }).then((favoritos)=>{
       
            
            let idClassificados = favoritos.map(fav => fav.id_class);
        Classificado.findAll({
            where:{
                id_classificado: idClassificados,
            }    
             }).then((classi)=>{
                let favoritosAssociados = favoritos.map(fav => { 
                    let classificadoCorrespondente = classi.find(c => c.id_classificado === fav.id_class); 
                    return { 
                        ...fav.dataValues, 
                        classificado: classificadoCorrespondente.dataValues 
                    }; 
                });
                res.render("../views/Telas/prodFavoritos.ejs", { 
                    favoritos: favoritosAssociados 
                });

            }).catch((err)=>{
                console.log(err)
                res.render("../views/Telas/prodFavoritos.ejs",{idFav:undefined,classi:undefined});
            })
        });
        
    
});

router.post("/removeFav",(req, res) => {
    let idFav = req.body.idFav;
    Fav.destroy({
        where: {
            id_Fav: idFav
        }
        }).then(() => {
            res.redirect("/favoritos");
        })
      })
    
module.exports = router;
