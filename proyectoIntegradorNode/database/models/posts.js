const { Sequelize } = require("sequelize");

module.exports = (sequelize,DataTypes) => {
    var columnas ={
        id: {type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
            },
        usuario_id: {
            type:DataTypes.INTEGER
                    },
        url: {
            type:DataTypes.STRING
        },
        texto_de_post: {
            type:DataTypes.STRING
                        },
        fecha_creacion: {
            type:DataTypes.DATE,
            defaultValue: Sequelize.NOW()
                        },
    };
    var config ={
        tableName:"posts",
        timestamps: false
    }; 

    // definimos la variable posts  atraves de sequelize define, la cual recibe como primer parametro:
// el nombre de la tabla (), luego recibe la informacion sobre las columnas de la tabla 
// y por ultimo la configuracion de la, tabla
    var posts = sequelize.define("posts",columnas,config);


    // posts.associate es para explicar como esta tabla se ascocia con otras tablas
    // recibe del lado derecho una funcion, la cual recibe una variable models 
    posts.associate = function(models){

// usamos la variable usuarios y usamos el metodo belongsTo, el cual dice que muchos posts pertenecen a un usuario
// recibe dos parametros: la variable que definimos en la funcion (models) 
// como segundo el nombre del modelo del cual yo quiero relacionar

        posts.belongsTo(models.usuarios,{
             // abro un objeto literal
            // le aplicamos un nombre a esta relacion

            as: "usuarioDelPost",
            // en foreign Key, aplico la columna que tiene el numero de usuario, es la columna por la cual se conecta la relacion
            
            foreignKey: "usuario_id"
        })
        // posts.hasMany(models.comentarios,{
        //     as: "comentariosDelPost",
        //     foreignKey: "post_id"
        // })
    }
    return posts
    }