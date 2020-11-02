// const { decodeBase64 } = require("bcryptjs");

let db = require("../database/models");

let postsController = {
    home: function(req,res){

        db.posts.findAll()
        .then (function(posts){
        console.log(posts);   
            res.render("home",{posts : posts}) 
        })
        
    },
    
    agregarPost: function(req, res) {

        if (req.session.usuarioLogueado == undefined) {
            res.redirect ("login");
        }
        res.render("agregarPost")

    },

    detallePost: function(req, res) {
        
        res.render("detallePost")

    }
}

module.exports = postsController;