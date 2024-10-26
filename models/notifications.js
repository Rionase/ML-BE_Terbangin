"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notifications.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Notifications.belongsTo(models.Bookings, {
        foreignKey: "bookingId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Notifications.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      bookingId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      message: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      statusRead: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Notifications",
      paranoid: true,
    }
  );
  return Notifications;
};
