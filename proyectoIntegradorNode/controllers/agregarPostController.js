// var post = require("../posts/post.js")
// var agregarPostController = { 
// agregar: function (post,res){ 

// res.render ()

// };

let agregarPostController = {
    agregar: function (req,res) {
        res.render("agregarPost")
    },
    detalle: function (req,res) {
        res.render("detallePost")
        
    }
    


}

module.exports = agregarPostController;

// index:function (req,res){
//     // aca escribo que pasa cuando el usuario quiere agregar un post
//         res.send (post.lista)
//     },
// marca: function (req,res){
//     // nombre var = lo que recupero
//     var queMarca = req.params.queMarca    

//    let resultadoBusqueda = post.porMarca(queMarca)

//     if (resultadoBusqueda.length == 0) {
//         res.send("no encontre nada")
//     }else{
//         res.send(resultadoBusqueda)
//     }
//     },

// color: function (req,res){
//         // nombre var = lo que recupero
//         var queColor = req.params.queColor   
    
//        let resultadoBusqueda = post.porColor(queColor)
    
//         if (resultadoBusqueda.length == 0) {
//             res.send("no encontre nada")
//         }else{
//             res.send(resultadoBusqueda)
//         }
//         },
// anio:  function (req,res){
//     // nombre var = lo que recupero
//     var queAnio = req.params.queAnio   

//    let resultadoBusqueda = post.porAnio(queAnio)

//     if (resultadoBusqueda.length == 0) {
//         res.send("no encontre nada")
//     }else{
//         res.send(resultadoBusqueda)
//     }
//     }

