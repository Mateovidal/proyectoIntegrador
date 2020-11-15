
let db = require("../database/models");

let postsController = {
    home: function(req,res){

        db.posts.findAll(
    {
        order:[["fecha_creacion", "DESC"]],
        
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

   


    detallePost: function(req, res) {
        let id_posts = req.params.id
        db.posts.findByPk(id_posts,{ 
            include:[
            {association : "usuarioDelPost"},
        ]})
        .then(function(post){
            res.render("detallePost",{post: post})
        })
    },
    
    deletePost: function(req, res) {
        let usuario_id = req.session.usuarioLogueado.id
        let id_post = req.params.id;
        
        db.posts.findByPk(id_post,{ 
            include:[
            {association : "usuarioDelPost"},
        ]})
        
        .then(function(post){
            if (usuario_id != undefined && usuario_id == post.usuario_id) {
           
            
                db.posts.destroy({ 
                    where: {
        
                        id : id_post
                    }  
                })
        
                .then(function(){
        
                    res.redirect("/home")
                })  
           
            } else {
                res.redirect("/home")
            } 
        })
      
       

       
    },
    
    editPost: function(req,res){
        let id_post = req.params.id

        db.posts.findByPk(id_post)
        .then(function(postAEditar){
            res.render("editPost", { postAEditar : postAEditar})
        })

    },

    updatePost: function(req,res){
        let id_post = req.params.id;
        let usuario_id = req.session.usuarioLogueado.id;
        let url = req.body.url;
        let texto_de_post = req.body.texto_de_post

        let posts = {
            usuario_id: usuario_id,
            url : url,
            texto_de_post: texto_de_post
        }
        
        db.posts.findByPk(id_post,{ 
            include:[
            {association : "usuarioDelPost"},
        ]})
        
        .then(function(post){

            if (usuario_id != null && usuario_id == post.usuario_id) {
           
            
                db.posts.update({ 
                    texto_de_post : posts.texto_de_post,
                    url : posts.url
                    
                },
                {
                    where: {
                        id : id_post
                    }
                })
        
                .then(function(){
        
                    res.redirect("/detallePost/" + id_post)
                })  
           
            } else {
                res.redirect("/home")
            } 
        })
      
    }
}

module.exports = postsController;