const express = require("express");
const router =  express();
const bodyParser = require("body-parser");
const Fav = require("../Tables/Fav");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/favoritos",(req,res)=>{
    res.render("../views/Telas/prodFavoritos.ejs");
    });

    router.post("/removeFav",(req, res) => {
        let idFav = req.body.idFav;
        favoritos.destroy({
            where: {
                id_Fav: idFav
            }
        }).then(() => {
            res.redirect("/favoritos");
        })
      })
    
module.exports = router;
