let db = require("../database/models/index")
let op = db.Sequelize.Op;

let resultadoBusquedaController = {
    resultadoBusqueda: function(req, res) {

        let queBuscoElUsuario = req.query.buscador;

    db.usuarios.findAll(
        {
            where: [
                //buscar op OR
                {[op.or]: [
                    {username: { [op.like]: "%" + queBuscoElUsuario + "%"}},    
                    {email: { [op.like]: "%" + queBuscoElUsuario + "%"}}
                ]}

              //  { username: { [op.like]: "%" + queBuscoElUsuario + "%"} }
                //{apellido: {[op.like]: "%" + queBuscoElUsuario + "%"} },
          //, { mail: { [op.like]: "%" + queBuscoElUsuario + "%"} }
          ,]
            ,
            // order: ["release_date"],
            //limit: 2
        }
    )
    .then(function(usuarios) {
        res.render("resultadoBusqueda", {usuarios: usuarios});
    })
    },
    
    
    resultadoBusquedaPorPost: function (req, res){
        let queBuscoElUsuariox = req.query.buscador2;
        db.posts.findAll({
            include:
                {association: "usuarioDelPost"},
            where: [
                { texto_de_post: {[op.like]: "#%" + queBuscoElUsuariox + "%"}   }
            ],
            order: [
                ['fecha_creacion', 'DESC']
            ],
            limit: 20
        })
        .then(function(post){
            //console.log(busquedaUsuario);
            //res.send(busquedaUsuario);
        return res.render("resultadoBusquedaPorPost", {post: post, queBuscoElUsuariox: queBuscoElUsuariox})
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    // resultadoBusquedaPorPost: function(req,res){
    //     let queBuscoElUsuariox = req.query.buscador2
    //     db.posts.findAll(

    //         {
    //             where: [

    //                 {
    //                     texto_de_post: { [op.like]: "%"+ queBuscoElUsuariox +"%"}
    //                 }
    //             ],

    //             include: [

    //                 {association : "usuarioDelPost"}
    //             ]
    //         }


    //     )

    //     .then(function(post){
    //         res.render("resultadoBusquedaPorPost", {post: post})
    //     })
    // }





    
}
    
    
   
module.exports = resultadoBusquedaController;