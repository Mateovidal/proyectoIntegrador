var express = require ('../views/headerDeslogueado.ejs');
var router = express.Router();

router.get("/desloguear" , function(req,res) {


res.send ("Desea salir?");

});

module.exports = router;