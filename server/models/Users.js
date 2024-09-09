'use strict'

import { Model } from 'sequelize'
import bcrypt from 'bcrypt'

export default (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasMany(models.Todos, { foreignKey: 'UserId' })
    }

    validPassword(password) {
      return bcrypt.compareSync(password, this.password)
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a')
            user.password = bcrypt.hashSync(user.password, salt)
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a')
            user.password = bcrypt.hashSync(user.password, salt)
          }
        },
      },
      sequelize,
      modelName: 'Users',
    },
  )
  return Users
}
