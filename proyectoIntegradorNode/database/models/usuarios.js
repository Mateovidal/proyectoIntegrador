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
    var usuarios = sequelize.define("usuarios", columnas, config);
    usuarios.associate = function(models){
        usuarios.hasMany(models.posts,{
            as: "postsDelUsuario",
            foreignKey: "usuario_id"
        })
        // usuarios.hasMany(models.comentarios,{
        //     as: "comentariosDelUsuario",
        //     foreignKey: "usuario_comentario"
        // })

    }
    return usuarios
    }