module.exports = (sequelize,DataTypes) => {
    var columnas = { 
        id:  {type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
            },
        texto: {
            type:DataTypes.STRING
            },
        fecha:{
            type:DataTypes.DATE
        },
        name: {
            type: DataTypes.STRING

        },
        email: {
            type: DataTypes.STRING

        },
        password: {
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