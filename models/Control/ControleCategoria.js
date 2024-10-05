const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Categoria = require("../Tables/Categoria");

router.use(bodyParser.urlencoded({extended:true}));

module.exports = router;
