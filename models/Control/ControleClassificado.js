const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Classificado = require("../Tables/Classificado");

router.use(bodyParser.urlencoded({extended:true}));

module.exports = router;