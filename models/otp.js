"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Otp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Otp.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
            },
            email: {
                allowNull: true,
                type: DataTypes.TEXT,
            },
            phoneNumber: {
                allowNull: true,
                type: DataTypes.TEXT,
            },
            code: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
            expire: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            isUsed: {
                allowNull: false,
                defaultValue: false,
                type: DataTypes.BOOLEAN,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "Otp",
            paranoid: true,
        }
    );
    return Otp;
};
