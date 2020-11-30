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


// antes de guardar en todo la ifo de este nuevo usuario, quiero verificar si el email que registró no existía previamente en la base de datos
//Para lograr verificar eso, busco dentro de la base de datos

//Utilizo el método finOne, ya que quiero buscar solamente una cosa dentro de la base de datos

        db.usuarios.findOne(
            {

                //dentro de la base de datos, dentro de la tabla de usuarios, quiero que busque el email que ingresó el usuario en registración
                //utilizo req.body.emial, ya el formulario viaja por POST (al agregar info nueva a la db) y el campo que quiero es el del email
                where:
                   {email:  req.body.email}
                
            })
//como todo pedido a la base de datos, es asincrónico
// por lo que usamos un .then para indicar que una vez que se complete el pedido, se ejecute lo que está dentro del then

//en este caso queremos que verifique si el mail que el usuario quiso registra ya existe
//Si  existe, quiere decir que fue registrado por otro usuario previamente ( no es null)
            .then(function(mailBuscado){
                if(mailBuscado != null){
                    //si el email ya fue utilizado, queremos que mande un mensaje que le avise al usuario que ese mail no está disponible
                    res.send("Este mail ya esta registrado!")
                }
 
                //Si no existe, quiere decir que no fue registrado por otro usuario previamente ( es null)  
  // si esto sucede, se ejecuta lo que está dentro del else           
 
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
        
        //recupero el username enviado por el usuario en el formulario de login
        //viaja por post, por eso lleva body
        //y el campo dentro del formulario de login que contiene el usuario es el de "username"

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
// primero recuperamos el id del usuario y lo guardamos dentro de esta variable "id_usuario"
        let id_usuario = req.params.id

       //busca dentro de la base de datos, dentro de la tabla posts ME SUENA RARO QUE SEA EN LA TABLA POST
       //busca por Pk usando la id que recuperamos 
        db.posts.findByPk(id_usuario)
        .then(function(perfilAEditar){
            res.render("editPerfil", { perfilAEditar : perfilAEditar})
        })
       


    },

    storeEditPerfil: function(req, res) {
 // la id del usuario lo vamos a recuperar de la session
 let id_usuario = req.session.usuarioLogueado.id;
 
 
 // Creo variables con nombres específicos, para cada dato que me manda el usuario al completar el formulario de editPerfil.

 // el username, email, fecha de nacimiento, la pregunta y respuesta de seguridad, y la foto de perfil 
        //serán recuperados del formulario de edit perfil que viaja por post.
        let username = req.body.username;
        //ejecutamos el metodo hashSync, dentro del paquete de bcrypt
        //el hashSync nos permite encriptar el contenido de este campo del form (password), 
        //y el "10" hace referencia al tipo de encriptación
        let password = bcrypt.hashSync(req.body.password, 10);
        let email = req.body.email;
        let fechaNacimiento = req.body.fechaNacimiento;
        let preguntaSeguridad = req.body.preguntaSeguridad;
        let respuestaSeguridad = req.body.respuestaSeguridad
        let fotoPerfil = req.body.fotoPerfil

//Creo un objeto literal con el mismo nombre del modelo dentro del cual quiero operar
//dentro de usuarios, nombro cada columna de este modelo y la variable que le corresponde 
//(cada variable hace referencia a un campo del form, y están declaradas arriba)
        let usuarios = {
            username: username,
            password: password,
            email: email,
            fechaNacimiento: fechaNacimiento,
            preguntaSeguridad: preguntaSeguridad,
            respuestaSeguridad: respuestaSeguridad,
            fotoPerfil: fotoPerfil
        };

        
// luego, ejecutamos el método update, para la tabla de usuarios en nuestra base de datos
// update nos permite editar ciertos datos que corresponden a ciertas columnas en la tabla elegida, dentro de la base de datos
           
        db.usuarios.update({
             //indicamos que columna de la tabla modificar y qué valor asignarle:
            username : usuarios.username,
            password: usuarios.password,
            email: usuarios.email,
            fechaNacimiento: usuarios.fechaNacimiento,
            preguntaSeguridad: usuarios.preguntaSeguridad,
            respuestaSeguridad: usuarios.respuestaSeguridad,
            fotoPerfil: usuarios.fotoPerfil
        },
        {

// el where especifica que perfil tiene que editar, el que tenga la id igual al usuario que está logueado
//el id del usuario logueado está guardado dentro de la variable id_usuario 
            where: [{
                id : id_usuario
            }]
        })
        
     
 // es un pedido a la base de datos, por lo que es asincrónico 
 // por este motivo usamos un then\

        .then(function() {
            // una vez que se editen los datos en la base de datos:
            // usamos el método clearCookies, y le específicamos qué cookies queremos eliminar
            //en este caso son las cookies del usuario que estaba logueado
            res.clearCookie("idDelUsuarioLogueado")
          //  luego ejecutamos el método destroy para eliminar toda la información almacenada en la session
            req.session.destroy();
    //Una vez que se completa todo el proceso de edición de perfil:
    //queremos que nos redirija al login para volver a loguear el usuario
      return      res.redirect("/login")
            })

    },

    

    logout: function(req,res) {
             // usamos el método clearCookies, y le específicamos qué cookies queremos eliminar
            //en este caso son las cookies del usuario que estaba logueado
       
            res.clearCookie("idDelUsuarioLogueado")
           
            //  luego ejecutamos el método destroy para eliminar toda la información almacenada en la session
           req.session.destroy();
       
    //Una vez que se completa todo el proceso de logout:
    //queremos que nos redirija al home
        return res.redirect("/home")


    }


}
module.exports = userController;