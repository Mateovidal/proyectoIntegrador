module.exports = (sequelize,DataTypes) => {
    var columnas ={
        id: {type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
            },
        post_id:{
            type:DataTypes.INTEGER
        }, 
        texto_comentario:{ 
            type:DataTypes.STRING
        },
        fecha_creacion_comentario:{
            type:DataTypes.DATE
        },
        usuario_comentario:{
            type:DataTypes.INTEGER
        },
    };
    var config ={
        tableName:"comentarios",
        timestamps: false
    }; 
    var comentarios = sequelize.define("comentarios",columnas,config);
    comentarios.associate = function(models){
        comentarios.belongsTo(models.usuarios,{
            as: "usuarioDelComentario",
            foreignKey: "usuario_comentario"
        }),
        comentarios.belongsTo(models.posts,{
            as: "postDelComentario",
            foreignKey: "post_id"
        })
    }
    return comentarios
    }