"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Otps", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            email: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            phoneNumber: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            code: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            expire: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            isUsed: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.BOOLEAN,
            },
            deletedAt: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Otps");
    },
};
