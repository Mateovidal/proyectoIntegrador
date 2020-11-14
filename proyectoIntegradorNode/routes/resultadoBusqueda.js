var express = require('express');
var router = express.Router();


var resultadoBusquedaController = require("../controllers/resultadoBusquedaController")
// EL PREFIJO PARA ESTA PAGINA ES "/resultadoBusqueda"


// localhost:3000/home/
router.get("/" , resultadoBusquedaController.resultadoBusqueda);
router.get("/:id" , resultadoBusquedaController.detalleResultadoBusqueda);
router.get("/resultadoBusquedaPorPost" , resultadoBusquedaController.resultadoBusquedaPorPost);
router.get("/resultadoBusquedaPorPost/:id" , resultadoBusquedaController.detalleResultadoBusquedaPorPost);

module.exports = router;
