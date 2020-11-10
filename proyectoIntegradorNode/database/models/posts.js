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
    var posts = sequelize.define("posts",columnas,config);
    posts.associate = function(models){
        posts.belongsTo(models.usuarios,{
            as: "usuarioDelPost",
            foreignKey: "usuario_id"
        }),
        posts.hasMany(models.comentarios,{
            as: "comentariosDelPost",
            foreignKey: "post_id"
        })
    }
    return posts
    }