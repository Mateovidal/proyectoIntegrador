module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING

        },
        rating: {
            type: DataTypes.DOUBLE

        },
        length: {
            type: DataTypes.INTEGER

        },
        awards: {
            type: DataTypes.INTEGER

        },
        release_date: {
            type: DataTypes.DATE

        },
        genre_id: {
            type: DataTypes.INTEGER

        }
    }


    let config = {
        tableName: "movies",
        timestamps: false
    }

    let Movie = sequelize.define("Movie", cols, config);

    return Movie;
}

