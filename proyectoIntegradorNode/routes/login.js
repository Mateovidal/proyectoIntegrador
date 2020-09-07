var express = require ('../views/login.ejs');
var router = express.Router();

router.get("/loginl" , function(req,res) {


res.send ("Login");

});

module.exports = router;