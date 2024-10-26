"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Bookings", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            bookingCode: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            status: {
                defaultValue: "One Way",
                type: Sequelize.ENUM("One Way", "Return"),
            },
            paymentId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            roundtripFlightId: {
                allowNull: true,
                type: Sequelize.UUID,
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
        await queryInterface.dropTable("Bookings");
    },
};
