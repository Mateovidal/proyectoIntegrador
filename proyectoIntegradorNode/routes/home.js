var express = require('express');
var router = express.Router();

var postsController = require("../controllers/postsController.js")
// EL PREFIJO PARA ESTA PAGINA ES "/HOME"


// localhost:3000/home/
router.get("/" , postsController.home);


localhost:3000/home/login

module.exports = router;