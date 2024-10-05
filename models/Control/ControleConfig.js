const express = require("express");
const router =  express();
const bodyParser = require("body-parser");
const Config = require("../Tables/Config");

router.use(bodyParser.urlencoded({extended:true}));

module.exports = router;
