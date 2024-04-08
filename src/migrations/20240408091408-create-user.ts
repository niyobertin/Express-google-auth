// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from 'sequelize';
module.exports = {
  async up(queryInterface:QueryInterface, Sequelize:typeof DataTypes) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      profileImage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.dropTable('Users');
  }
};