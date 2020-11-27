let db = require("../database/models/index")
let op = db.Sequelize.Op;

let resultadoBusquedaController = {

    // creamos un metodo que se llama resultadoBusqueda, que recibe una funcion con req y res
    // lo que me interesa aca es recuperar lo que escribio el usuario en el formulario

    resultadoBusqueda: function(req, res) {

          // creo la variable queBuscoElUsuario 
           // REQ.QUERY sirve para recuperar informacfion que haya sido enviadas por formularios de GET y tengo que aclararle
        // con el . que campo me interesa leer, en este caso el campo del buscador
        let queBuscoElUsuario = req.query.buscador;


// le pido a mi base de datos, del modelo usuario donde me filtre por el username y email, 
// usando el operador op.like para buscar por texto recuperando la variable queBuscoElUsuario y usamos los % como comodin
// traeme todas los email y usernames cuyo titulo tenga el like % queBuscoElUsuario %

    db.usuarios.findAll(
        {

            // simpre que filramos con un WHERE tenemos que aclararle que operador vamos a usar
            where: [
                //buscar op OR
                {[op.or]: [
                    {username: { [op.like]: "%" + queBuscoElUsuario + "%"}},    
                    {email: { [op.like]: "%" + queBuscoElUsuario + "%"}}
                ]}

            
          ,]
            ,
          
        }
    )

    // luego mando una vista, en este caso resultadoBusqueda y estos resultados los quiero mostrar en la vista, 
    // asi que se los comparto con {usuarios: usuarios}

    // ACLARAR {usuarios: usuarios});

    .then(function(usuarios) {
        res.render("resultadoBusqueda", {usuarios: usuarios});
    })
    },
    

// creo el metodo resultadoBusquedaPorPost que recibe una funcion con req y res
// creo la variable queBuscoElUsuariox que con req.query recupera por GET lo que puso el usuario en el campo del form
    
    resultadoBusquedaPorPost: function (req, res){
        let queBuscoElUsuariox = req.query.buscador2;

        // busco en mi modelo de posts, ACLARAR FINDALL que el texto_de_post coincida con lo que esta en la variable queBuscoElUsuariox
        // uso el operador like para filtrar por texto 
        // uso el # y el % 

        db.posts.findAll({

        
            include:
                {association: "usuarioDelPost"},
            where: [
                { texto_de_post: {[op.like]: "#%" + queBuscoElUsuariox + "%"}   }
            ],

            // uso para ordenar el resultado y este recibe un arry, diciendole que ordenen por fecha de creacion en orden DESC
            order: [
                ['fecha_creacion', 'DESC']

                // uso LIMIT Para limitar el numero de resultados a 20
            ],
            limit: 20
        })

            // como es un pedido asicnronico tiene que haber un then, ya que no se sabe cuanto tarda la informaicon en venir 
            // queremos que se ejecute una vez que se ejecuta lo de arriba
            // hacemos un .them que recibe la fucntion post

            // y le hacemos un res.render para que renderize la vista resultadoBusquedaPorPost
            // y le compartimos a la vista la informacion dentro de una variable post y queBuscoElUsuariox , para luego en la vista poder usarla

        .then(function(post){
        return res.render("resultadoBusquedaPorPost", {post: post, queBuscoElUsuariox: queBuscoElUsuariox})
        })

        // hacemos un .catch para atajar errores posibles que haya

        .catch(function (error) {
            console.log(error);
        })
    }
    
}
    
    
   
module.exports = resultadoBusquedaController;