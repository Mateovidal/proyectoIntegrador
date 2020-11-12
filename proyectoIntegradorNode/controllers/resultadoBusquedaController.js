let db = require("../database/models/index")
let op = db.Sequelize.Op;

let resultadoBusquedaController = {
    
    resultadoBusqueda: function(req, res) {

        // esta variable busca que busco el usuario, req.query porque viaja por get 
        // si el usuario busco hola, en la variable va a parecer hola 
        let queBuscoElUsuario= req.query.buscador;

        // traeme todas las peliculas 
        // cuyo titulo tenga el "like" y diga % harry % 
        // el procentaje es un comodin en las vistas, antes de la palabra ahrry y antes puede haber cualquier cosa, 
        // minetrsas diga harry esta todo bien

        db.usuarios.findAll(
            {
                where: [

            
                   {[op.or]: 
                    
                    [{ username: { [op.like]: "%" + queBuscoElUsuario + "%" }},


                   {email: { [op.like]: "%" + queBuscoElUsuario + "%"}
                
                }
            
           ]
        }
                // order: ["username"],
                ,]
                
                //limit: 2
            }
        ) 
        .then(function(usuarios) {

            // mando a una vista 
            // y los resultados los quiero compartir en la vista, asi que los mando a la vista
            res.render("resultadoBusqueda", {usuarios: usuarios} , );
            
        })

        

        // res.render("resultadoBusqueda")

    },
    detalleResultadoBusqueda: function(req,res){
        let id_usuarios = req.params.id
        db.usuarios.findByPk(id_usuarios)
        .then(function(usuario){
            res.render("detalleUsuario",{usuario: usuario})
        })
    }

}

module.exports = resultadoBusquedaController;