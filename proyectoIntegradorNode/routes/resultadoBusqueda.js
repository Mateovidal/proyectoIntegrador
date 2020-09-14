var express = require('express');
var router = express.Router();


var resultadoBusquedaController = require("../controllers/resultadoBusquedaController.js")
// EL PREFIJO PARA ESTA PAGINA ES "/resultadoBusqueda"


// localhost:3000/home/
router.get("/" , resultadoBusquedaController.resultadoBusqueda);
module.exports = router;