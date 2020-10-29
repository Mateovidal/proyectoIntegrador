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
            type:DataTypes.DATE
                        },
    };
    var config ={
        tableName:"posts",
        timestamps: false
    }; 
    var posts = sequelize.define("posts",columnas,config);
    return posts
    }