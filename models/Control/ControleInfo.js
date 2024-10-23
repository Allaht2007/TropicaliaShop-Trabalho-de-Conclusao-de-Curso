const express = require ("express");
const router = express();
const bodyParser = require("body-parser");
const Info = require("../Tables/info");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/mostraInfo",(req,res)=>{
    res.render("../views/Telas/infosUser");
});



module.exports = router;
