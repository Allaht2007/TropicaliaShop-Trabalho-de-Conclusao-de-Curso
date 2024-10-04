const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const ControleCategoria = ("./Categoria");

router.use(bodyParser.urlencoded({extended:true}));

module.exports = router;