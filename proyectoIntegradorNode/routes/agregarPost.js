var express = require('express');
var router = express.Router();


var postsController = require("../controllers/postsController.js")
// EL PREFIJO PARA ESTA PAGINA ES "/AGREGARPOST"


// localhost:3000/home/
router.get("/" , postsController.agregarPost);
module.exports = router;
