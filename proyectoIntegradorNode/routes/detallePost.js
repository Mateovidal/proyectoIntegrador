// var express = require('express');
// var router = express.Router();


// router.get("/detallePost" , function(req,res) {


// res.send ("Detalle post");

// });

// module.exports = router;

var express = require('express');
var router = express.Router();


var postsController = require("../controllers/postsController.js")
// EL PREFIJO PARA ESTA PAGINA ES "/AGREGARPOST"


// localhost:3000/home/
router.get("/" , postsController.detallePost);
module.exports = router;