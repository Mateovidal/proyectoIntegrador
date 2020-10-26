let userController = {
    
    miPerfil: function(req, res) {

        res.render("miPerfil")

    },

    registracion: function(req, res) {
        if (req.session.usuarioLogueado != undefined) {

            res.redirect("/home")
        }
        res.render("registracion")

    },

    storeUser: function(req, res) {
        if (req.session.usuarioLogueado != undefined) {
            res.redirect("/home");
        }

        let name = req.body.name;
        let password = bcrypt.hashSync(req.body.password, 10);
        let email = req.body.email;

        let user = {
            name: name,
            password: password,
            email: email
        }
},

    detalleUsuario: function(req, res) {
        
        res.render("detalleUsuario")

    },

    login: function(req, res) {
        
        res.render("login")

    },

    home: function(req, res) {
        
        res.render("home")

    },
}
module.exports = userController;