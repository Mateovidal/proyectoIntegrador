var express = require('express');
var router = express.Router();


var postsController = require("../controllers/postsController.js")

router.get("/" , postsController.editPerfil);

module.exports = router;