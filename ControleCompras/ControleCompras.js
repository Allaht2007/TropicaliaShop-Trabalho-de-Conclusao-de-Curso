const express = require("express");
const router = express();
const bodyParser = require("body-parser")
const Compras = require("./Compras");

router.use(bodyParser.urlencoded({extended:true}));

module.exports = router;
