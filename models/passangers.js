"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Passangers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Passangers.belongsTo(models.Users, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Passangers.hasMany(models.HelperBookings, {
                foreignKey: "passangerId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Passangers.init(
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
            type: {
                type: DataTypes.ENUM("BABY", "CHILD", "ADULT"),
            },
            title: {
                type: DataTypes.ENUM("MRS", "MR"),
            },
            fullName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            familyName: {
                type: DataTypes.STRING,
            },
            birthDate: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            nationality: {
                type: DataTypes.STRING,
            },
            identityId: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            issuingCountry: {
                type: DataTypes.STRING,
            },
            identityIdExpired: {
                type: DataTypes.DATE,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "Passangers",
            paranoid: true,
        }
    );
    return Passangers;
};
