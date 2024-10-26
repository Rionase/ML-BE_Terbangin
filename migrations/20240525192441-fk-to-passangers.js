"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("Passangers", {
            fields: ["userId"],
            type: "foreign key",
            name: "fk-to-passangers", // optional, tetapi direkomendasikan untuk memberi nama constraint
            references: {
                table: "Users",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint("Passangers", "fk-to-passangers");
    },
};
