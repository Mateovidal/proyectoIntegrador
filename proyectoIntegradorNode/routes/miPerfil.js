var express = require ('../views/miPerfil.ejs');
var router = express.Router();

router.get("/perfil" , function(req,res) {


res.send ("Mi perfil");

});

module.exports = router;