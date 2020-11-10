
let db = require("../database/models");

let postsController = {
    home: function(req,res){

        db.posts.findAll(
    {
        order: ["fecha_creacion"],
        include:[
            {association : "usuarioDelPost"},
        ]

    })

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
        let usuario_id = req.session.usuarioLogueado.id;
        let url = req.body.url;
        let texto_de_post = req.body.texto_de_post;
        let fecha_creacion = req.body.fecha_creacion

        let posts = {
            usuario_id: usuario_id,
            url : url,
            texto_de_post: texto_de_post,
            fecha_creacion : fecha_creacion
        }
    console.log(posts);
    db.posts.create(posts)
    .then(function() {
        res.redirect("/home");
    })
    
    }, 

    editPerfil: function(req, res) {

        res.render("editPerfil");
    },

    detallePost: function(req, res) {
        
        res.render("detallePost")

    }
}

module.exports = postsController;