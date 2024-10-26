"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Airports extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Airports.hasMany(models.Flights, {
                foreignKey: "startAirportId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Airports.hasMany(models.Flights, {
                foreignKey: "endAirportId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Airports.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            iataCode: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            terminal: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            city: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            country: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            continent: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            timezone: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            picture: {
                type: DataTypes.TEXT,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "Airports",
            paranoid: true,
        }
    );
    return Airports;
};
