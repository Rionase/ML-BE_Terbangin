"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Airlines extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Airlines.hasMany(models.Flights, {
                foreignKey: "airlineId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Airlines.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
            },
            aircraftType: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            iataCode: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            picture: {
                type: DataTypes.TEXT,
            },
            baggage: {
                allowNull: "false",
                type: DataTypes.INTEGER,
            },
            cabinBaggage: {
                allowNull: "false",
                type: DataTypes.INTEGER,
            },
            additionals: {
                type: DataTypes.STRING,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "Airlines",
            paranoid: true,
        }
    );
    return Airlines;
};
