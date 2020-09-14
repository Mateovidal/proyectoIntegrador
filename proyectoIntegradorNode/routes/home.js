var express = require('express');
var router = express.Router();

var userController = require("../controllers/userController.js")
// EL PREFIJO PARA ESTA PAGINA ES "/HOME"


// localhost:3000/home/
router.get("/" , userController.home);


//localhost:3000/home/login

module.exports = router;