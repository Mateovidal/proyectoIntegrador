let db = require("../database/models/index")
// let bcrypt = require("bcryptjs");

let userController = {
    
    miPerfil: function(req, res) {

        res.render("miPerfil")

    },

    registracion: function(req, res) {

        // if (req.session.usuarioLogueado != undefined) {

        //     res.redirect("/home")
        // }
        res.render("registracion")

    },

    storeUser: function(req, res) {
        // if (req.session.usuarioLogueado != undefined) {
        //     res.redirect("/home");
        // }

        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let fechaNacimiento = req.body.fechaNacimiento;

        let usuarios = {
            username: username,
            password: password,
            email: email,
            fechaNacimiento: fechaNacimiento
        }
        db.Usuarios.create(usuarios)
        .then(function() {
            res.redirect("/home");
        })
},

    detalleUsuario: function(req, res) {
        
        res.render("detalleUsuario")

    },


  

    login: function(req, res) {
        if (req.session.usuarioLogueado != undefined) {
            res.redirect ("/home");

        }
        res.render("login");

    },
    
    procesadoLogin: function(req, res) {
        if (req.session.usuarioLogueado != undefined) {
            res.redirect("/home");
        }
    }, 


}
module.exports = userController;