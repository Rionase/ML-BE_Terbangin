"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Flights extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Flights.hasMany(models.Seats, {
                foreignKey: "flightId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Flights.belongsTo(models.Airlines, {
                foreignKey: "airlineId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Flights.belongsTo(models.Airports, {
                foreignKey: "startAirportId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
                as: "StartAirport",
            });
            Flights.belongsTo(models.Airports, {
                foreignKey: "endAirportId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
                as: "EndAirport",
            });
            Flights.hasMany(models.Bookings, {
              foreignKey: "roundtripFlightId",
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            });
        }
    }
    Flights.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
            },
            airlineId: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            flightCode: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            duration: {
                type: DataTypes.INTEGER,
            },
            startAirportId: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            endAirportId: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            capacityEconomy: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            capacityBussines: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            capacityFirstClass: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            priceEconomy: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            priceBussines: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            priceFirstClass: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            departureAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            arrivalAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "Flights",
            paranoid: true,
        }
    );
    return Flights;
};
