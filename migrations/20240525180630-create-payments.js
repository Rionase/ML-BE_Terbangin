"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Payments", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            status: {
                defaultValue: "UNPAID",
                type: Sequelize.ENUM("ISSUED", "UNPAID", "CANCELLED"),
            },
            method: {
                type: Sequelize.STRING,
            },
            totalPrice: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            snapLink: {
                type: Sequelize.TEXT,
            },
            snapToken: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable("Payments");
    },
};
