var express = require('express');
var router = express.Router();

var userController = require("../controllers/userController")
// EL PREFIJO PARA ESTA PAGINA ES "/LOGIN"



router.get("/" , userController.login);

router.post("/", userController.procesadoLogin);

router.get("/logout" , userController.logout);

module.exports = router;