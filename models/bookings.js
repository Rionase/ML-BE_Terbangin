"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Bookings extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Bookings.hasMany(models.Notifications, {
                foreignKey: "bookingId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Bookings.hasMany(models.HelperBookings, {
                foreignKey: "bookingId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Bookings.belongsTo(models.Users, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Bookings.belongsTo(models.Payments, {
                foreignKey: "paymentId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Bookings.belongsTo(models.Flights, {
              foreignKey: "roundtripFlightId",
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            });
        }
    }
    Bookings.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
        },
        bookingCode: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        userId: {
          allowNull: false,
          type: DataTypes.UUID,
        },
        paymentId: {
          allowNull: false,
          type: DataTypes.UUID,
        },
        roundtripFlightId: {
          allowNull: true,
          type: DataTypes.UUID,
        },
        status: {
          defaultValue: "One Way",
          type: DataTypes.ENUM("One Way", "Return"),
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: "Bookings",
        paranoid: true,
      }
    );
    return Bookings;
};
