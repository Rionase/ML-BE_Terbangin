"use strict";

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Notifications", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            bookingId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            title: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            message: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            statusRead: {
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
        await queryInterface.dropTable("Notifications");
    },
};
