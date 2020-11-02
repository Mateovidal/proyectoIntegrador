let db = require("../database/models/index")
let bcrypt = require("bcryptjs");

let userController = {
    
    miPerfil: function(req, res) {

        res.render("miPerfil")

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
        let confirmPassword = bcrypt.hashSync(req.body.confirmPassword, 10);
        let email = req.body.email;
        let fechaNacimiento = req.body.fechaNacimiento;
        let preguntaSeguridad = req.body.preguntaSeguridad;
        let respuestaSeguridad = req.body.respuestaSeguridad

        let usuarios = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            email: email,
            fechaNacimiento: fechaNacimiento,
            preguntaSeguridad: preguntaSeguridad,
            respuestaSeguridad: respuestaSeguridad
        }
        db.usuarios.create(usuarios)
        .then(function() {
            res.redirect("/home");
        })
},

    detalleUsuario: function(req, res) {
        
        res.render("detalleUsuario")

    },

    login: function(req, res) {

        // si en session hay cualquier usuario logueado, anda a la pagina de home
        if (req.session.usuarioLogueado != undefined) {
            res.redirect ("home");
        }

        res.render("login");

    },
    
    procesadoLogin: function(req, res) {

           // si ya estas logueado, no quiero que funcione esta parte del login 
           if (req.session.usuarioLogueado != undefined) {
            res.redirect ("home");
        }
        
        db.usuarios.findOne(
            {
                where: [
                    { email: req.body.email },
                    // Busco el usuario en la base de datos segun el email que ingreso al registrarse
                    // Utilizo el findOne que o trae el dato, o trae null
                ]
            }
        )

        .then(function(usuario){
            if (usuario == null) {
    
                // si el mail del usuario es null, devuelvo mi res.send 

                res.send("El mail no existe")

            } else if (bcrypt.compareSync(req.body.password, usuario.password) == false){
                
                // Usamos compareSync para comparar las contraseñas encriptadas. Recibimos lo que puso el usuario como contraseña
                // Como segundo parametro, recibimos lo que ya esta guardado en la base de datos  
                // Si esto devuelve false, la contraseña no matchea

                res.send("La contraseña es incorrecta")

            } else {
                
                // Guardo en session, los datos del usuario que se acaba de logear y lo guardo en mi variable usuario 
                req.session.usuarioLogueado = usuario; 

                // Si despues de todo esta todo true, bienvenido
                res.redirect("/home")
            }

         res.send (usuario);
        })

    }, 


}
module.exports = userController;