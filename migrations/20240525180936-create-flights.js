"use strict";

const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Flights", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            airlineId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            flightCode: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            duration: {
                type: Sequelize.INTEGER,
            },
            startAirportId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            endAirportId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            capacityEconomy: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            capacityBussines: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            capacityFirstClass: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            departureAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            arrivalAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            priceEconomy: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            priceBussines: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            priceFirstClass: {
                allowNull: true,
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("Flights");
    },
};
