'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      activitiesNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('Unmarked', 'Done', 'Canceled'),
        allowNull: false,
        defaultValue: 'Unmarked',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
    await queryInterface.addColumn(
      'Todos', // name of Source model
      'UserId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    )
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'Todos',
      'UserId',
    )
    await queryInterface.dropTable('Todos')
  },
}
