var express = require('express');
var router = express.Router();

var userController = require("../controllers/userController.js")
// EL PREFIJO PARA ESTA PAGINA ES "/LOGIN"


// localhost:3000/login/
router.get("/" , userController.login);

router.post("/", userController.procesadoLogin);

module.exports = router;