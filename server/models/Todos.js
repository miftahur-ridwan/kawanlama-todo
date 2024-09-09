'use strict'

import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Todos extends Model {
    static associate(models) {
      this.belongsTo(models.Users)
    }

    static getNextActivitiesNo = async () => {
      const lastTodo = await this.findOne({
        order: [['activitiesNo', 'DESC']],
      })

      if (!lastTodo) {
        return 'AC-0001'
      }

      const lastNumber = Number.parseInt(lastTodo.activitiesNo.split('-')[1])
      const nextNumber = lastNumber + 1
      return `AC-${nextNumber.toString().padStart(4, '0')}`
    }

    async changeStatus(newStatus) {
      if (['Unmarked', 'Done', 'Canceled'].includes(newStatus)) {
        this.status = newStatus
        return await this.save()
      }
      else {
        throw new Error('Invalid status. Must be Unmarked, Done, or Canceled.')
      }
    }
  }
  Todos.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      activitiesNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('Unmarked', 'Done', 'Canceled'),
        allowNull: false,
        defaultValue: 'Unmarked',
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      hooks: {
        beforeValidate: async (todo) => {
          if (!todo.activitiesNo) {
            todo.activitiesNo = await Todos.getNextActivitiesNo()
          }
        },
      },
      sequelize,
      modelName: 'Todos',
    },
  )
  return Todos
}
