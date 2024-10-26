"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Airlines", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            aircraftType: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            iataCode: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            picture: {
                type: Sequelize.TEXT,
            },
            baggage: {
                allowNull: "false",
                type: Sequelize.INTEGER,
            },
            cabinBaggage: {
                allowNull: "false",
                type: Sequelize.INTEGER,
            },
            additionals: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("Airlines");
    },
};
