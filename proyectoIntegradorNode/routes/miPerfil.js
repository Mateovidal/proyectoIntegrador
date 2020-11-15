var express = require('express');
var router = express.Router();

var userController = require("../controllers/userController.js")
// EL PREFIJO PARA ESTA PAGINA ES "/MIPERFIL"


// localhost:3000/miPerfil/
router.get("/" , userController.miPerfil);
router.get("/editPerfil/:id" , userController.editPerfil);
router.post("/editPerfil/:id" , userController.storeEditPerfil);

module.exports = router;