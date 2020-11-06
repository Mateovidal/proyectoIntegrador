var express = require('express');
var router = express.Router();

var userController = require("../controllers/userController.js")
// EL PREFIJO PARA ESTA PAGINA ES "/MIPERFIL"


// localhost:3000/miPerfil/
router.get("/" , userController.miPerfil);


module.exports = router;