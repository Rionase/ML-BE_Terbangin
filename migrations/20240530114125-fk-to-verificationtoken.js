"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addConstraint("VerificationTokens", {
            fields: ["userId"],
            type: "foreign key",
            name: "fk-to-verificationtokens-userId",
            references: {
                table: "Users",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeConstraint(
            "VerificationTokens",
            "fk-to-verificationtokens-userId"
        );
    },
};
