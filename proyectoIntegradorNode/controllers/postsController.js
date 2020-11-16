
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
 // Si el usuario no está logueado -> lo redirige al login
        if (req.session.usuarioLogueado == undefined) {
            res.redirect ("login");
        }
     // renderiza la vista agregarPost.ejs (donde está nuestro formulario para agregar posts)
        res.render("agregarPost") 

    },
    
    storePost: function(req, res) {
        // Si el usuario no está logueado -> lo redirige al login
        if (req.session.usuarioLogueado == undefined) {
            res.redirect ("login");
        }
        //si el usuario está logueado:

// Creo variables con nombres específicos, para cada dato que me manda el usuario al completar el formulario.
        let usuario_id = req.session.usuarioLogueado.id;
        let url = req.body.url;
        let texto_de_post = req.body.texto_de_post;
        let fecha_creacion = req.body.fecha_creacion
// Indico que campo del formulario le corresponde a cada columna de mi tabla Posts en la base de datos. 
//(usando los nombres de las variable que creamos arriba)
        let posts = {
            usuario_id: usuario_id,
            url : url,
            texto_de_post: texto_de_post,
            fecha_creacion : fecha_creacion
        }
        //Para envíar la info a la base de datos:
        // usamos el método create para generar un registro en la base de datos.
        // create recibe a posts que es el objeto literal que contiene a todas las columnas de la tabla posts en la base de datos.
    db.posts.create(posts)
    
    //create es un pedido asincrónico a la base de datos, por lo que nesecito un then

    //este then dicta que va a pasar una vez que se realice el registro a la base de datos.
    //en este caso le pedimos que redirija al usuario a home
    .then(function() {
        res.redirect("/home");
    })
    
    }, 

   


    detallePost: function(req, res) {
       //recupera el id del post, que viaja por URL
        let id_posts = req.params.id
     
        //busca dentro de la base de datos, dentro de la tabla posts
       //busca por Pk usando la id que recuperamos 
        db.posts.findByPk(id_posts,{ 

           //incluye la relación entre la tabla de post y la tabla de usuarios
           //sirve para saber de quien es el post
            include:[
                //nombre de la relacion :
            {association : "usuarioDelPost"},
        ]})
        // después renderiza la vista del detallePost correspondiente al posteo específico que queremos
        .then(function(post){
            res.render("detallePost",{post: post})
        })
    },
    
    deletePost: function(req, res) {
       //creamos variables que guardan datos 

        let usuario_id = req.session.usuarioLogueado.id
        let id_post = req.params.id;
        
         //busca dentro de la base de datos, dentro de la tabla posts
       //busca por Pk usando la id que recuperamos 
        db.posts.findByPk(id_post,{
            
             //incluye la relación entre la tabla de post y la tabla de usuarios
           //sirve para saber de quien es el post
            include:[
            {association : "usuarioDelPost"},
        ]})
        
        //verifica que el usuario logueado sea el dueño del post que quiere borrar, como medida de seguridad
        .then(function(post){
            if (usuario_id != undefined && usuario_id == post.usuario_id) {
           
                //si el usuario está logueado y además es el dueño del post
            // se ejecuta el método destroy, dentro de la tabla posts en la base de datos
                db.posts.destroy({ 
                    //se le especifica que posteo tiene que borrar, el que tenga la id igual al posteo que estamos viendo
                    where: {
        
                        id : id_post
                    }  
                })
        //luego, cuando ya se eliminó ese dato de la base de datos, nos redirije al home
                .then(function(){
        
                    res.redirect("/home")
                })  
           // si el usuario no está logueado y/o no es el dueño del post, lo manda al home directamente sin borrar nada.
            } else {
                res.redirect("/home")
            } 
        })
      
       

       
    },
    
    editPost: function(req,res){
        //recuperamos el id del post
        let id_post = req.params.id

        //busca dentro de la base de datos, dentro de la tabla posts
       //busca por Pk usando la id que recuperamos 
        db.posts.findByPk(id_post)
       
        // luego nos manda a la vista que contiene el formulario para editar posteos.
        
       .then(function(postAEditar){
            res.render("editPost", { postAEditar : postAEditar})
        })

    },

    updatePost: function(req,res){
       
        // Creo variables con nombres específicos, para cada dato que me manda el usuario al completar el formulario de editPost.
        let id_post = req.params.id;
        let usuario_id = req.session.usuarioLogueado.id;
        let url = req.body.url;
        let texto_de_post = req.body.texto_de_post

        // Indico que campo del formulario le corresponde a cada columna de mi tabla Posts en la base de datos. 
//(usando los nombres de las variable que creamos arriba)
        let posts = {
            usuario_id: usuario_id,
            url : url,
            texto_de_post: texto_de_post
        }
       
        //busca dentro de la base de datos, dentro de la tabla posts
       //busca por Pk usando la id que recuperamos
        db.posts.findByPk(id_post,{ 
            include:[
                 //incluye la relación entre la tabla de post y la tabla de usuarios
           //sirve para saber de quien es el post
            {association : "usuarioDelPost"},
        ]})
        
        // luego verificamos si el usuario está logueado y si el usuario es el dueño del post que quiere editar
        .then(function(post){

            if (usuario_id != null && usuario_id == post.usuario_id) {
           
            //si es el dueño del posteo:

            // usamos el método update para editar  datos que corresponden a ciertas columnas en la base de datos
            //indicamos que columna de la tabla modificar y qué valor asignarle:
                db.posts.update({ 
                    texto_de_post : posts.texto_de_post,
                    url : posts.url
                    
                },
                {
                     //se le especifica que posteo tiene que editar, el que tenga la id igual al posteo que estamos viendo
                    where: {
                        id : id_post
                    }
                })
        // una vez que se editaron los datos, le pedimos que nos mande hacia el detalle del post que acabamos de editar
        // ahora en el detalle de este post, se verá la versión actualizada del post, después de los cambios.
                .then(function(){
        
                    res.redirect("/detallePost/" + id_post)
                })  
           //si no es dueño del post, no lo dejamos editar y lo mandamos a home
            } else {
                res.redirect("/home")
            } 
        })
      
    }
}

module.exports = postsController;