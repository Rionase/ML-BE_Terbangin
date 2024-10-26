"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("Notifications", {
            fields: ["userId"],
            type: "foreign key",
            name: "fk-to-notifications-userId",
            references: {
                table: "Users",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        await queryInterface.addConstraint("Notifications", {
            fields: ["bookingId"],
            type: "foreign key",
            name: "fk-to-notifications-bookingId",
            references: {
                table: "Bookings",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint(
            "Notifications",
            "fk-to-notifications-userId"
        );
        await queryInterface.removeConstraint(
            "Notifications",
            "fk-to-notifications-bookingId"
        );
    },
};
