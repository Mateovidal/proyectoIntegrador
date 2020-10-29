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
    return comentarios
    }