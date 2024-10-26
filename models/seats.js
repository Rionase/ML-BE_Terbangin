"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Seats extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Seats.hasMany(models.HelperBookings, {
                foreignKey: "seatId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Seats.belongsTo(models.Flights, {
                foreignKey: "flightId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Seats.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
            },
            flightId: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            seatNumber: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            airlineClass: {
                allowNull: false,
                type: DataTypes.ENUM("ECONOMY", "BUSINESS", "FIRST_CLASS"),
            },
            isAvailable: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "Seats",
            paranoid: true,
        }
    );
    return Seats;
};
