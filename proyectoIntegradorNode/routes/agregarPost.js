var express = require ('../views/agregarPost.ejs');
var router = express.Router();

router.get("/agregarPost" , function(req,res) {


res.send ("Agregar post");

});

module.exports = router;