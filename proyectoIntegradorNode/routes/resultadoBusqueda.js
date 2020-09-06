var express = require ('../views/resultadoBusqueda.ejs');
var router = express.Router();

router.get("/resultadoBusqueda" , function(req,res) {


res.send ("Resultado de busqueda");

});

module.exports = router;