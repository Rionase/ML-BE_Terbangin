"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("Flights", {
            fields: ["airlineId"],
            type: "foreign key",
            name: "fk-to-flights-airlineId",
            references: {
                table: "Airlines",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });

        await queryInterface.addConstraint("Flights", {
            fields: ["startAirportId"],
            type: "foreign key",
            name: "fk-to-flights-startAirportId",
            references: {
                table: "Airports",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });

        await queryInterface.addConstraint("Flights", {
            fields: ["endAirportId"],
            type: "foreign key",
            name: "fk-to-flights-endAirportId",
            references: {
                table: "Airports",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint(
            "Flights",
            "fk-to-flights-airlineId"
        );
        await queryInterface.removeConstraint(
            "Flights",
            "fk-to-flights-startAirportId"
        );
        await queryInterface.removeConstraint(
            "Flights",
            "fk-to-flights-endAirportId"
        );
    },
};
