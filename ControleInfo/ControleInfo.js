const express = require ("express");
const router = express();
const bodyParser = require("body-parser");
const Info = require("./info");

router.use(bodyParser.urlencoded({extended:true}));


module.exports = router;