var express = require('express');
var router = express.Router();


router.get("/perfil" , function(req,res) {


res.send ("Mi perfil");

});

module.exports = router;