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
        await queryInterface.changeColumn("Payments", "totalPrice", {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.changeColumn("Payments", "totalPrice", {
            type: Sequelize.INTEGER,
            allowNull: false,
        });
    },
};
