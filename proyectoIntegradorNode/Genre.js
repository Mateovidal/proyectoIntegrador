module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        name: {
            type: DataTypes.STRING

        },
        ranking: {
            type: DataTypes.INTEGER

        }
    }


    let config = {
        tableName: "genres",
        timestamps: false
    }

    let Genre = sequelize.define("Genre", cols, config);

    return Genre;
}