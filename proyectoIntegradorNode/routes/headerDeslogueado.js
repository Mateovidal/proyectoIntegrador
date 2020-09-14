var express = require('express');
var router = express.Router();


router.get("/desloguear" , function(req,res) {


res.send ("Desea salir?");

});

module.exports = router;