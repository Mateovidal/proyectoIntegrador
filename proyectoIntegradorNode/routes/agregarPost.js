var express = require('express');
var router = express.Router();


var postsController = require("../controllers/postsController.js")
// EL PREFIJO PARA ESTA PAGINA ES "/AGREGARPOST"




// Para que el usuario complete el formulario:
router.get("/" , postsController.agregarPost);

//Cuando el usuario ya lo completó y tenemos que leer y procesar esa información:
router.post("/" , postsController.storePost);
module.exports = router;
