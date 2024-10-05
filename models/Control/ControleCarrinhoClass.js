const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const CarrinhoClass = require("../Tables/CarrinhoClass");
router.use(bodyParser.urlencoded({extended:true}));

module.exports = router;
