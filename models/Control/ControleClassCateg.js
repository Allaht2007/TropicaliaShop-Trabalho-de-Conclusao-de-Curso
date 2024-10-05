const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const ClassCateg = require("../Tables/ClassCateg");

router.use(bodyParser.urlencoded({extended:true}));

module.exports = router;
