var miPerfil = require("../posts/post.js")
var miPerfilController = { 

index:function (req,res){
    // aca escribo que pasa cuando el usuario quiere agregar un post
        res.send (miPerfil.lista)
    },
marca: function (req,res){
    // nombre var = lo que recupero
    var queMarca = req.params.queMarca    

   let resultadoBusqueda = miPerfil.porMarca(queMarca)

    if (resultadoBusqueda.length == 0) {
        res.send("no encontre nada")
    }else{
        res.send(resultadoBusqueda)
    }
    },

color: function (req,res){
        // nombre var = lo que recupero
        var queColor = req.params.queColor   
    
       let resultadoBusqueda = headerDeslogueado.porColor(queColor)
    
        if (resultadoBusqueda.length == 0) {
            res.send("no encontre nada")
        }else{
            res.send(resultadoBusqueda)
        }
        },
anio:  function (req,res){
    // nombre var = lo que recupero
    var queAnio = req.params.queAnio   

   let resultadoBusqueda = headerDeslogueado.porAnio(queAnio)

    if (resultadoBusqueda.length == 0) {
        res.send("no encontre nada")
    }else{
        res.send(resultadoBusqueda)
    }
    }





};
module.exports = miPerfilController;