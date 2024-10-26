"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("HelperBookings", {
            fields: ["passangerId"],
            type: "foreign key",
            name: "fk-to-helperBookings-passangerId",
            references: {
                table: "Passangers",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        await queryInterface.addConstraint("HelperBookings", {
            fields: ["bookingId"],
            type: "foreign key",
            name: "fk-to-helperBookings-bookingId",
            references: {
                table: "Bookings",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        await queryInterface.addConstraint("HelperBookings", {
            fields: ["seatId"],
            type: "foreign key",
            name: "fk-to-helperBookings-seatId",
            references: {
                table: "Seats",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint(
            "HelperBookings",
            "fk-to-helperBookings-passangerId"
        );
        await queryInterface.removeConstraint(
            "HelperBookings",
            "fk-to-helperBookings-bookingId"
        );
        await queryInterface.removeConstraint(
            "HelperBookings",
            "fk-to-helperBookings-seatId"
        );
    },
};
