"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Passangers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      type: {
        type: Sequelize.ENUM("BABY", "CHILD", "ADULT"),
      },
      title: {
        type: Sequelize.ENUM("MRS", "MR"),
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      familyName: {
        type: Sequelize.STRING,
      },
      birthDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      nationality: {
        type: Sequelize.STRING,
      },
      identityId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      issuingCountry: {
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
    await queryInterface.dropTable("Passangers");
  },
};
