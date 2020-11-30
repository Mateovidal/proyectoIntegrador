module.exports = (sequelize,DataTypes) => {

   // creamos una variable en la cual vamos a declarar
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
        // el nombre de la tabla
        tableName:"comentarios",
        // determina el tiempo en el que se genero un bloque
        timestamps: false
    }; 
    var comentarios = sequelize.define("comentarios",columnas,config);
    comentarios.associate = function(models){
        comentarios.belongsTo(models.usuarios,{
            as: "usuarioDelComentario",
            foreignKey: "usuario_comentario"
        })
        // comentarios.belongsTo(models.posts,{
        //     as: "postDelComentario",
        //     foreignKey: "post_id"
        // })
    }
    return comentarios
    }