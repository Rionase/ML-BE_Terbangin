"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class HelperBookings extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            HelperBookings.belongsTo(models.Passangers, {
                foreignKey: "passangerId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            HelperBookings.belongsTo(models.Bookings, {
                foreignKey: "bookingId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            HelperBookings.belongsTo(models.Seats, {
                foreignKey: "seatId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    HelperBookings.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
            },
            passangerId: {
                type: DataTypes.UUID,
            },
            bookingId: {
                type: DataTypes.UUID,
            },
            seatId: {
                type: DataTypes.UUID,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "HelperBookings",
            paranoid: true,
        }
    );
    return HelperBookings;
};
