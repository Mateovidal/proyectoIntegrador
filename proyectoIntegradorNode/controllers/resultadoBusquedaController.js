let db = require("../database/models/index")
let op = db.Sequelize.Op;

// creamos la variable resultadoBusquedaController

let resultadoBusquedaController = {

    // creamos un metodo que se llama resultadoBusqueda, que recibe una funcion con req y res
    // lo que me interesa aca es recuperar lo que escribio el usuario en el formulario

    resultadoBusqueda: function(req, res) {

          // creo la variable queBuscoElUsuario 
           // REQ.QUERY sirve para recuperar informacion que haya sido enviadas por formularios de GET y tengo que aclararle
        // con el . que campo me interesa leer, en este caso el campo del buscador
        let queBuscoElUsuario = req.query.buscador;


            // le pido a mi base de datos, del modelo usuario donde me filtre por el username y email, 

            //  Luego voy a hacer un pedido a la base de datos, a la tabla de usuarios más específicamente.
            // Utilizó el Findall, el cual es una función que busca todos los datos registrados en la tabla que especifique
    db.usuarios.findAll(
        {

            // Luego usamos un objeto literal con el atributo WHERE el cual es un método de búsqueda el cual nos sirve para para filtrar los datos.
            // Siempre que filtramos con un WHERE tenemos que aclararle que operador vamos a usar

            where: [

                //buscar op OR, que me busque o por email, o por username

                {[op.or]: [

            // usando el operador op.like para buscar por texto recuperando la variable queBuscoElUsuario y usamos los % como comodin
            // traeme todas los email y usernames cuyo titulo tenga el like % queBuscoElUsuario %
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
    
    resultadoBusquedaPorPost: function (req, res){

        // creo la variable queBuscoElUsuariox que con req.query recupera por GET lo que puso el usuario en el campo del form, 
        // en este caso buscador2
        let queBuscoElUsuariox = req.query.buscador2;

        // busco en mi modelo de posts de mi base de datos con un Findall, 
        // el cual es una función que busca todos los datos registrados en la tabla que especifique
        
        // uso el operador like para filtrar por texto 
        // uso el # y el % 

        db.posts.findAll({

        
            include:
                {association: "usuarioDelPost"},



            // Luego usamos un objeto literal con el atributo WHERE el cual es un método de búsqueda 
            /// el cual nos sirve para para filtrar los datosen nuestra base de datos
            // Siempre que filtramos con un WHERE tenemos que aclararle que operador vamos a usar
        
                // En este caso buscamos que el texto_de_post coincida con lo que esta en la variable queBuscoElUsuariox
                // y usamos el operador LIKE para filtrar por busquedas de texto en conjunto con el %, el cual es un comodin 

            where: [
                { texto_de_post: {[op.like]: "#%" + queBuscoElUsuariox + "%"}   }
            ],

            // uso el ORDER el cual recibe un objeto literal, para ordenar el resultado y este recibe un arry, diciendole que ordenen por fecha de creacion en orden DESC
            order: [
                ['fecha_creacion', 'DESC']

                // uso LIMIT Para limitar el numero de resultados a 20
            ],
            limit: 20
        })

            // como es un pedido asicnronico tiene que haber un then, ya que no se sabe cuanto tarda la informaicon en venir 
            // queremos que se ejecute una vez que se ejecuta lo de arriba
            // hacemos un .then que recibe la fucntion post

        

        .then(function(post){

            // y le hacemos un res.render para que renderize la vista resultadoBusquedaPorPost
            // y le compartimos a la vista la informacion dentro de una variable post y queBuscoElUsuariox , para luego en la vista poder usarla

        return res.render("resultadoBusquedaPorPost", {post: post, queBuscoElUsuariox: queBuscoElUsuariox})
        })

        // hacemos un .catch para atajar errores posibles que haya

        .catch(function (error) {
            console.log(error);
        })
    }
    
}

// exportamos la variable
   
module.exports = resultadoBusquedaController;