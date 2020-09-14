var express = require('express');
var router = express.Router();


router.get("/loginl" , function(req,res) {


res.send ("Login");

});

module.exports = router;