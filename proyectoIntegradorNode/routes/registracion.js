var express = require('express');
var router = express.Router();


router.get("/registracion" , function(req,res) {


res.send ("Registracion");

});

module.exports = router;