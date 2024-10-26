"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Users.hasMany(models.Notifications, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Users.hasMany(models.Passangers, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Users.hasMany(models.Bookings, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Users.hasMany(models.Payments, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Users.hasMany(models.VerificationTokens, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Users.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
            },
            fullName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            email: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            phoneNumber: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            password: {
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
            modelName: "Users",
            paranoid: true,
            defaultScope: {
                attributes: { exclude: ["password"] },
            },
        }
    );
    return Users;
};
