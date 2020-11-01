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
     } ;
    var config = {
        tableName:"usuarios",
        timestamps: false
    };
    var usuarios = sequelize.define("usuarios", columnas, config);
    return usuarios
    }