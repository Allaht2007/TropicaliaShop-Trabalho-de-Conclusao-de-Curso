          /*Imports*/
          const express = require ("express");
          const router = express();
          const bodyParser = require("body-parser");
          const bcrypt = require("bcryptjs");
          const Usuario = require("../Tables/Usuario");
          const info = require("../Tables/info");


          
router.use(bodyParser.urlencoded({extended:true}));

router.get("/homeAdm",(req,res)=>{
    res.render("../views/Telas/HomeAdm.ejs");
});

router.get("/lojaProdsAdm",(req,res)=>{
    res.render("../views/Telas/lojaProdAdm.ejs");
});
router.post("/removeLoja",(req, res) => {
    let idLoja = req.body.idLoja;
    Usuario.destroy({
        where: {
            id_user: idLoja
        }
    }).then(() => {
        res.redirect("/lojaProdsAdm");
    })
  })

  router.get("/categsAdm",(req,res)=>{
    res.render("../views/Telas/categsAdm.ejs");
});
module.exports = router;