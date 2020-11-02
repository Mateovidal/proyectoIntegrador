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
    
    storePost: function(req, res) {
        
        if (req.session.usuarioLogueado == undefined) {
            res.redirect ("login");
        }
        let usuario_id = req.body.usuario_id;
        let url = req.body.url;
        let texto_de_post = req.body.texto_de_post;

        let posts = {
            usuario_id: usuario_id,
            url : url,
            texto_de_post: texto_de_post
        }
    
    db.posts.create(posts)
    .then(function() {
        res.redirect("/home");
    })
    }, 

    detallePost: function(req, res) {
        
        res.render("detallePost")

    }
}

module.exports = postsController;