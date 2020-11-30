const { Sequelize } = require("sequelize");

module.exports = (sequelize,DataTypes) => {
    var columnas = { 
        id:  {type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
            },
        username: {
                type: DataTypes.STRING
            },
      
        fechaNacimiento:{
            type:DataTypes.DATE
        },
      
        email: {
            type: DataTypes.STRING

        },
        password: {
            type: DataTypes.STRING

        },
        preguntaSeguridad: {
            type: DataTypes.STRING

        },
        respuestaSeguridad: {
            type: DataTypes.STRING

        },
        numero: {
            type:DataTypes.INTEGER
        },
        fotoPerfil: {
            type:DataTypes.STRING
        },
        created_at:{
            type:DataTypes.DATE,
            defaultValue: Sequelize.NOW()
        }
     } ;
    var config = {
        tableName:"usuarios",
        timestamps: false
    };



// definimos la variable usuarios  atraves de sequelize define, la cual recibe como primer parametro:
// el nombre de la tabla (), luego recibe la inforacion sobre las columnas de la tabla 
// y por ultimo la configuracion de la, tabla
    var usuarios = sequelize.define("usuarios", columnas, config);

    // usuarios.associate es para explicar como esta tabla se ascocia con otras tablas
    // recibe del lado derecho una funcion, la cual recibe una variable models 

    usuarios.associate = function(models){

// usamos la variable usuarios y usamos el metodo hasMany, el cual dice que usuarios tienen muchos posts
// recibe dos parametros: la variable que definimos en la funcion (models) 
// como segundo el nombre del modelo del cual yo quiero relacionar

        usuarios.hasMany(models.posts,{

            // abro un objeto literal
            // le aplicamos un nombre a esta relacion

            as: "postsDelUsuario",

    // en foreign Key, aplico la columna que tiene el numero de usuario, es la columna por la cual se conecta la relacion
            foreignKey: "usuario_id"

        })
        // usuarios.hasMany(models.comentarios,{
        //     as: "comentariosDelUsuario",
        //     foreignKey: "usuario_comentario"
        // })

    }
    return usuarios
    }