var express = require('express');
var router = express.Router();


var userController = require("../controllers/userController.js");
const userController = require('../controllers/userController.js');
// EL PREFIJO PARA ESTA PAGINA ES "/resultadoBusqueda"


// localhost:3000/home/
router.get("/" , userController.registracion);
module.exports = router;