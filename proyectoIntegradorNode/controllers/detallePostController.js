var detallePost = require("../posts/post.js")
var detallePostController = { 

index:function (req,res){
    // aca escribo que pasa cuando el usuario quiere agregar un post
        res.send (detallePost.lista)
    },
marca: function (req,res){
    // nombre var = lo que recupero
    var queMarca = req.params.queMarca    

   let resultadoBusqueda = dettalePost.porMarca(queMarca)

    if (resultadoBusqueda.length == 0) {
        res.send("no encontre nada")
    }else{
        res.send(resultadoBusqueda)
    }
    },

color: function (req,res){
        // nombre var = lo que recupero
        var queColor = req.params.queColor   
    
       let resultadoBusqueda = detallePost.porColor(queColor)
    
        if (resultadoBusqueda.length == 0) {
            res.send("no encontre nada")
        }else{
            res.send(resultadoBusqueda)
        }
        },
anio:  function (req,res){
    // nombre var = lo que recupero
    var queAnio = req.params.queAnio   

   let resultadoBusqueda = detallePost.porAnio(queAnio)

    if (resultadoBusqueda.length == 0) {
        res.send("no encontre nada")
    }else{
        res.send(resultadoBusqueda)
    }
    }





};
module.exports = detallePostController;