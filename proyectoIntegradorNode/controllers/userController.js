let userController = {
    
    miPerfil: function(req, res) {

        res.render("miPerfil")

    },

    registracion: function(req, res) {
        
        res.render("registracion")

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