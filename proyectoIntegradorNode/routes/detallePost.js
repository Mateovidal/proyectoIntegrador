var express = require ('../views/detallePost.ejs');
var router = express.Router();

router.get("/detallePost" , function(req,res) {


res.send ("Detalle post");

});

module.exports = router;