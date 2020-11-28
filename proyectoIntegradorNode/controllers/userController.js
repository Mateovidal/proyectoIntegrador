let db = require("../database/models/index")
let bcrypt = require("bcryptjs");
let op = db.Sequelize.Op;


// Creo la variable userController 

let userController = {
    
// creo el metodo miPerfil quenrecibe una funcion con un req y res

    miPerfil: function(req, res) {


        // busco en mi modelo de posts de mi base de datos con un Findall, 
        // el cual es una función que busca todos los datos registrados en la tabla que especifique
        
    db.posts.findAll({

          // Luego usamos un objeto literal con el atributo WHERE el cual es un método de búsqueda 

          // el cual nos sirve para para filtrar los datosen nuestra base de datos

            // dentro de este where le decimos que ?????
        where: {usuario_id : req.session.usuarioLogueado.id
               },
        
    })
    

            // como es un pedido asicnronico tiene que haber un then, ya que no se sabe cuanto tarda la informaicon en venir 
            // queremos que se ejecute una vez que se ejecuta lo de arriba
            // hacemos un .then que recibe la fucntion postPerfil

    .then(function(postsPerfil){
    
   // y le hacemos un res.render para que renderize la vista miPerfil
    // y le compartimos a la vista la informacion dentro de una variable???? postPerfil, para luego en la vista poder usarla

    res.render("miPerfil",{
        postsPerfil : postsPerfil
    })
    })

    },

    // creamos el metodo regsitracion que recibe una funcion con req y res

    registracion: function(req, res) {

        // si ya estas logueado, no hace falta que te registres de nuevo
        if (req.session.usuarioLogueado != undefined) {
            res.redirect ("home");
        }

        res.render("registracion")

    },

    storeUser: function(req, res) {

           // si ya estas logueado, no hace falta que te registres de nuevo
          if (req.session.usuarioLogueado != undefined) {
            res.redirect ("home");
        }
        // Creo variables con nombres específicos, para cada dato que me manda el usuario al completar el formulario.
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, 10);
        let email = req.body.email;
        let fechaNacimiento = req.body.fechaNacimiento;
        let preguntaSeguridad = req.body.preguntaSeguridad;
        let respuestaSeguridad = req.body.respuestaSeguridad
        let fotoPerfil = req.body.fotoPerfil
// Indico que campo del formulario le corresponde a cada columna de mi tabla Usuarios en la base de datos. 
//(usando los nombres de las variable que creamos arriba)
//(dentro del objeto literal usuarios)
        let usuarios = {
            username: username,
            password: password,
            email: email,
            fechaNacimiento: fechaNacimiento,
            preguntaSeguridad: preguntaSeguridad,
            respuestaSeguridad: respuestaSeguridad,
            fotoPerfil: fotoPerfil
        }



        db.usuarios.findOne(
            {
                where:
                   {email:  req.body.email}
                
            })

            .then(function(mailBuscado){
                if(mailBuscado != null){
                    res.send("Este mail ya esta registrado!")
                }
               
                else {
                   //Para envíar la info a la base de datos:
                   // usamos el método create para generar un registro en la base de datos.
                   // create recibe a usuarios que es el objeto literal que contiene a todas las columnas de la tabla usuarios en la base de datos.
                  
                    db.usuarios.create(usuarios)
                   
                //create es un pedido asincrónico a la base de datos, por lo que nesecito un then

                 //este then dicta que va a pasar una vez que se realice el registro a la base de datos.
                //en este caso le pedimos que redirija al usuario al login
                    .then(function() {
                        res.redirect("/login");
                    })
                    //Luego verificamos si ocurió algún error
                    //Si hubo algún error, lo muestra en la consola
                    .catch(function(error){
                    console.log(error)
                    })
                }
            })

},
detalleUsuario: function(req, res){
   
   //recupera el id del usuario, que viaja por URL
    let idUser = req.params.id;

     //busca dentro de la base de datos, dentro de la tabla usuarios
       //busca por Pk usando la id que recuperamos 
    db.usuarios.findByPk(idUser, {

           //incluye la relación entre la tabla de usuarios y la tabla de posts
           //sirve para saber que posts tiene este usuario
        include: [{ 
             //nombre de la relacion :
            association: 'postsDelUsuario' }]
    })
        .then( function (post){
            // después renderiza la vista del detalleUsuario correspondiente al usuario específico que queremos
            return res.render('detalleUsuario', {post: post});
        })
        
        //Luego verificamos si ocurió algún error
        //Si hubo algún error, lo muestra en la consola

        .catch(function (error) {
            console.log(error);
        })
},

// detalleUsuario: function(req,res){
//     let id_posts = req.params.id
//     db.posts.findByPk(id_posts)
//     .then(function(post){
//         res.render("detalleUsuario",{post: post})
//     })

// }, 
    // detalleUsuario: function(req, res) {
    //     db.usuarios.findAll({
    //         where: {usuario_id : req.params.id
    //                }, 
            
    //                include:[
    //                 {association : "postsDelUsuario"},
    //             ]
            
    //     })
        
    //     .then(function(detalleUsuarioPosts){
      
    //     res.render("detalleUsuario",{ detalleUsuarioPosts : detalleUsuarioPosts})
    //     })
    

    // },

    login: function(req, res) {
        // Busco en la session para ver si hay alguien logueado
        // si en session hay cualquier usuario logueado, anda a la pagina de home
        if (req.session.usuarioLogueado != undefined) {
            res.redirect ("home");
        }
 
        // Si nadie está logueado, renderizo la página del login
        res.render("login", { usuarioLogueado: req.session.usuarioLogueado});

    },
    
    procesadoLogin: function(req, res) {

           // si ya estas logueado, no quiero que funcione esta parte del login 
            // Llevamos al usuario a home
           if (req.session.usuarioLogueado != undefined) {
            res.redirect ("home");
        }
        
        //Si todavia no está logueado:

        let usuario = req.body.username

        db.usuarios.findOne(
            {
                where: [
                    { 

                        [op.or]: [
                            {username: usuario},    
                            {email: usuario }
                        ]

                    },

                ]
              
            }
        )

        .then(function(usuarios){
            

            if (usuarios == null) {
    
                // si el find.one no me trajo nada, entinces usuarios no existe
                // si el usuario es null, devuelvo mi res.send 

                res.send("El usuario no existe")

            }
            
            var checkPassword = bcrypt.compareSync(req.body.password, usuarios.password); 
            if (checkPassword != true){
                

                res.send("La contraseña es incorrecta")

            } else {
                
                // Guardo en session, los datos del usuario que se acaba de logear y lo guardo en mi variable usuario 
                req.session.usuarioLogueado = usuarios; 
               

//-------------------------------------------------------------------------------------------------------------------------------------------//
               

// Vamos al UserController para atajar si el usuario quiere que lo recuerde. 
// Entonces, hago un if, que dice si en el req.body viene algo que se llama remember 
// (en el req.body.remember, el cual remember era el name del campo de mi form) y es distinto a undefined, 
/// es que el usuario tilo esa opción entonces tengo que guardar la cookie. 

                if (req.body.remember != undefined) {

                // Luego de haber creado el if, para crear la cookie, y guardar información en ella, 



                // ejecutamos el método cookie() sobre el objeto response y le pasamos 2 argumentos:
                //El nombre que le quiero asignar a la cookie (idDelUsarioLogueado)
                // El valor (es del usuario el id, usuario.id)
                    res.cookie("idDelUsuarioLogueado", usuarios.id, {maxAge: 1000 * 3000});

                    // Y para repasar un poco, lo que estamos haciendo aquí, es que en el momento que el usuario loguea, 
                    // guardamos toda la info en session (nombre, email, password), 
                    // pero también guardamos una cookie con el id del usuario. 
                }

                // si el usuario me pide que lo recuerde, lo guardo en la cookie
                res.redirect("/home");
                 // Si despues de todo esta todo true, bienvenido

            }

         res.send (usuarios);
        })

    },

    editPerfil: function(req, res) {

        let id_usuario = req.params.id

        db.posts.findByPk(id_usuario)
        .then(function(perfilAEditar){
            res.render("editPerfil", { perfilAEditar : perfilAEditar})
        })
       


    },

    storeEditPerfil: function(req, res) {

        let id_usuario = req.session.usuarioLogueado.id;
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, 10);
        let email = req.body.email;
        let fechaNacimiento = req.body.fechaNacimiento;
        let preguntaSeguridad = req.body.preguntaSeguridad;
        let respuestaSeguridad = req.body.respuestaSeguridad
        let fotoPerfil = req.body.fotoPerfil


        let usuarios = {
            username: username,
            password: password,
            email: email,
            fechaNacimiento: fechaNacimiento,
            preguntaSeguridad: preguntaSeguridad,
            respuestaSeguridad: respuestaSeguridad,
            fotoPerfil: fotoPerfil
        };

        

        db.usuarios.update({
            username : usuarios.username,
            password: usuarios.password,
            email: usuarios.email,
            fechaNacimiento: usuarios.fechaNacimiento,
            preguntaSeguridad: usuarios.preguntaSeguridad,
            respuestaSeguridad: usuarios.respuestaSeguridad,
            fotoPerfil: usuarios.fotoPerfil
        },
        {


            where: [{
                id : id_usuario
            }]
        })
        

        .then(function() {
            res.clearCookie("idDelUsuarioLogueado")
          //  req.session.usuarioLog = undefined;
            req.session.destroy();
    
      return      res.redirect("/login")
            })

    },

    

    logout: function(req,res) {
        res.clearCookie("idDelUsuarioLogueado")
        req.session.destroy();
        //req.session.usuarioLogueado = undefined;

        return res.redirect("/home")


    }


}
module.exports = userController;