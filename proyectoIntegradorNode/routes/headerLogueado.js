var express = require ('../views/headerLogueado.ejs');
var router = express.Router();

router.get("/loguear" , function(req,res) {


res.send ("Desea entrar?");

});

module.exports = router;