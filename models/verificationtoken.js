"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class VerificationTokens extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            VerificationTokens.belongsTo(models.Users, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    VerificationTokens.init(
        {
            token: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            userId: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            status: {
                defaultValue: false,
                type: DataTypes.BOOLEAN,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "VerificationTokens",
            paranoid: true,
        }
    );
    return VerificationTokens;
};
