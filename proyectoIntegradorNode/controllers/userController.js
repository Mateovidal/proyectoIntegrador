let db = require("../database/models/index")
let bcrypt = require("bcryptjs");
let op = db.Sequelize.Op;

let userController = {
    
    miPerfil: function(req, res) {
    db.posts.findAll({
        where: {usuario_id : req.session.usuarioLogueado.id
               },
        
    })
    
    .then(function(postsPerfil){
  
    res.render("miPerfil",{
        postsPerfil : postsPerfil
    })
    })

    },

    registracion: function(req, res) {

        // si ya estas logueado, no quiero que funcione registracion
        // si yo guarde algo en session, te vas a otro lado
        if (req.session.usuarioLogueado != undefined) {
            res.redirect ("home");
        }

        res.render("registracion")

    },

    storeUser: function(req, res) {

          // si ya estas logueado, no quiero que funcione esta parte de la registracion 
          if (req.session.usuarioLogueado != undefined) {
            res.redirect ("home");
        }
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, 10);
        let email = req.body.email;
        let fechaNacimiento = req.body.fechaNacimiento;
        let preguntaSeguridad = req.body.preguntaSeguridad;
        let respuestaSeguridad = req.body.respuestaSeguridad
        let fotoPerfil = req.body.fotoPerfil

        let usuarios = {
            username: username,
            password: password,
            email: email,
            fechaNacimiento: fechaNacimiento,
            preguntaSeguridad: preguntaSeguridad,
            respuestaSeguridad: respuestaSeguridad,
            fotoPerfil: fotoPerfil
        }



        db.usuarios.findOne(
            {
                where:
                   {email:  req.body.email}
                
            })

            .then(function(mailBuscado){
                if(mailBuscado != null){
                    res.send("Este mail ya esta registrado!")
                }
                else {
                    db.usuarios.create(usuarios)
                    //una vez creado el usuario, usamos un then xq es una promesa y te redirije al login 
                    .then(function() {
                        res.redirect("/login");
                    })
                    .catch(function(error){
                    console.log(error)
                    })
                }
            })

},
detalleUsuario: function(req, res){
    let idUser = req.params.id;

    db.usuarios.findByPk(idUser, {
        include: [{ association: 'postsDelUsuario' }]
    })
        .then( function (post){
           
            return res.render('detalleUsuario', {post: post});
        })
        .catch(function (error) {
            console.log(error);
        })
},

// detalleUsuario: function(req,res){
//     let id_posts = req.params.id
//     db.posts.findByPk(id_posts)
//     .then(function(post){
//         res.render("detalleUsuario",{post: post})
//     })

// }, 
    // detalleUsuario: function(req, res) {
    //     db.usuarios.findAll({
    //         where: {usuario_id : req.params.id
    //                }, 
            
    //                include:[
    //                 {association : "postsDelUsuario"},
    //             ]
            
    //     })
        
    //     .then(function(detalleUsuarioPosts){
      
    //     res.render("detalleUsuario",{ detalleUsuarioPosts : detalleUsuarioPosts})
    //     })
    

    // },

    login: function(req, res) {

        // si en session hay cualquier usuario logueado, anda a la pagina de home
        if (req.session.usuarioLogueado != undefined) {
            res.redirect ("home");
        }

        res.render("login", { usuarioLogueado: req.session.usuarioLogueado});

    },
    
    procesadoLogin: function(req, res) {

           // si ya estas logueado, no quiero que funcione esta parte del login 

           if (req.session.usuarioLogueado != undefined) {
            res.redirect ("home");
        }
        
        let usuario = req.body.username

        db.usuarios.findOne(
            {
                where: [
                    { 

                        [op.or]: [
                            {username: usuario},    
                            {email: usuario }
                        ]

                    },

                ]
              
            }
        )

        .then(function(usuarios){
            

            if (usuarios == null) {
    
                // si el find.one no me trajo nada, entinces usuarios no existe
                // si el usuario es null, devuelvo mi res.send 

                res.send("El usuario no existe")

            }
            
            var checkPassword = bcrypt.compareSync(req.body.password, usuarios.password); 
            if (checkPassword != true){
                

                res.send("La contraseña es incorrecta")

            } else {
                
                // Guardo en session, los datos del usuario que se acaba de logear y lo guardo en mi variable usuario 
                req.session.usuarioLogueado = usuarios; 
               

//-------------------------------------------------------------------------------------------------------------------------------------------//
               

// Vamos al UserController para atajar si el usuario quiere que lo recuerde. 
// Entonces, hago un if, que dice si en el req.body viene algo que se llama remember 
// (en el req.body.remember, el cual remember era el name del campo de mi form) y es distinto a undefined, 
/// es que el usuario tilo esa opción entonces tengo que guardar la cookie. 

                if (req.body.remember != undefined) {

                // Luego de haber creado el if, para crear la cookie, y guardar información en ella, 



                // ejecutamos el método cookie() sobre el objeto response y le pasamos 2 argumentos:
                //El nombre que le quiero asignar a la cookie (idDelUsarioLogueado)
                // El valor (es del usuario el id, usuario.id)
                    res.cookie("idDelUsuarioLogueado", usuarios.id, {maxAge: 1000 * 3000});

                    // Y para repasar un poco, lo que estamos haciendo aquí, es que en el momento que el usuario loguea, 
                    // guardamos toda la info en session (nombre, email, password), 
                    // pero también guardamos una cookie con el id del usuario. 
                }

                // si el usuario me pide que lo recuerde, lo guardo en la cookie
                res.redirect("/home");
                 // Si despues de todo esta todo true, bienvenido

            }

         res.send (usuarios);
        })

    },

    editPerfil: function(req, res) {

        let id_usuario = req.params.id

        db.posts.findByPk(id_usuario)
        .then(function(perfilAEditar){
            res.render("editPerfil", { perfilAEditar : perfilAEditar})
        })
       


    },

    storeEditPerfil: function(req, res) {

        let id_usuario = req.session.usuarioLogueado.id;
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, 10);
        let email = req.body.email;
        let fechaNacimiento = req.body.fechaNacimiento;
        let preguntaSeguridad = req.body.preguntaSeguridad;
        let respuestaSeguridad = req.body.respuestaSeguridad
        let fotoPerfil = req.body.fotoPerfil


        let usuarios = {
            username: username,
            password: password,
            email: email,
            fechaNacimiento: fechaNacimiento,
            preguntaSeguridad: preguntaSeguridad,
            respuestaSeguridad: respuestaSeguridad,
            fotoPerfil: fotoPerfil
        };

        

        db.usuarios.update({
            username : usuarios.username,
            password: usuarios.password,
            email: usuarios.email,
            fechaNacimiento: usuarios.fechaNacimiento,
            preguntaSeguridad: usuarios.preguntaSeguridad,
            respuestaSeguridad: usuarios.respuestaSeguridad,
            fotoPerfil: usuarios.fotoPerfil
        },
        {


            where: [{
                id : id_usuario
            }]
        })
        

        .then(function() {
            res.clearCookie("idDelUsuarioLogueado")
          //  req.session.usuarioLog = undefined;
            req.session.destroy();
    
      return      res.redirect("/login")
            })

    },

    

    logout: function(req,res) {
        res.clearCookie("idDelUsuarioLogueado")
        req.session.destroy();
        //req.session.usuarioLogueado = undefined;

        return res.redirect("/home")


    }


}
module.exports = userController;