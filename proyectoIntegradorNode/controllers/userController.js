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
        db.usuarios.create(usuarios)
        .then(function() {
            res.redirect("/home");
        })
},

    detalleUsuario: function(req, res) {
        db.usuarios.findAll({
            where: {usuario_id : req.body.id
                   }, 
            
                   include:[
                    {association : "postsDelUsuario"},
                ]
            
        })
        
        .then(function(detalleUsuarioPosts){
      
        res.render("detalleUsuario",{ detalleUsuarioPosts : detalleUsuarioPosts})
        })
    

    },

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
                            {username: { [op.like]: "%" + usuario + "%"}},    
                            {email: { [op.like]: "%" + usuario + "%"}}
                        ]

                    },

                ]
                // where: [
                //     { username: req.body.username },
                //     // Busco el usuario en la base de datos segun el email que ingreso al registrarse
                //     // Utilizo el findOne que o trae el dato, o trae null
                // ]
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
                
                // Usamos compareSync para comparar las contraseñas encriptadas. Recibimos lo que puso el usuario como contraseña
                // Como segundo parametro, recibimos lo que ya esta guardado en la base de datos  
                // Si esto devuelve false, la contraseña no matchea

                res.send("La contraseña es incorrecta")

            } else {
                
                // Guardo en session, los datos del usuario que se acaba de logear y lo guardo en mi variable usuario 
                req.session.usuarioLogueado = usuarios; 
               

//-------------------------------------------------------------------------------------------------------------------------------------------//
                if (req.body.remember != undefined) {

                    res.cookie("idDelUsuarioLogueado", usuarios.id, {maxAge: 1000 * 3000});

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
            res.redirect("/miPerfil");
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