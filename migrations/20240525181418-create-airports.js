"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Airports", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          iataCode: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          terminal: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          city: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          country: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          continent: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          picture: {
            type: Sequelize.TEXT,
          },
          timezone: {
            allowNull: false,
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
        await queryInterface.dropTable("Airports");
    },
};
