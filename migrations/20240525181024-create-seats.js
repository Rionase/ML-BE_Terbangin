"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Seats", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            flightId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            seatNumber: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            airlineClass: {
                allowNull: false,
                type: Sequelize.ENUM("ECONOMY", "BUSINESS", "FIRST_CLASS"),
            },
            isAvailable: {
                allowNull: false,
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
        await queryInterface.dropTable("Seats");
    },
};
