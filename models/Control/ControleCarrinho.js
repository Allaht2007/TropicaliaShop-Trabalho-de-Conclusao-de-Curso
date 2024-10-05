const express = require("express");
const router = express();
const Carrinho = require("../Tables/Carrinho");
const bodyParser = require("body-parser");



router.use(bodyParser.urlencoded({extended:true}));

module.exports = router;