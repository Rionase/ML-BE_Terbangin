'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VerificationTokens", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      token: {
        allowNull:false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull:false,
        type: Sequelize.UUID,
      },
      status: {
        defaultValue:false,
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
    await queryInterface.dropTable('VerificationTokens');
  }
};