var express = require ('../views/home.ejs');
var router = express.Router();

router.get("/home" , function(req,res) {


res.send ("Home");

});

module.exports = router;