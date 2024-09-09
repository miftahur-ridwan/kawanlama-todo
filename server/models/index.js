'use strict'

import process from 'node:process'
import Sequelize, { DataTypes } from 'sequelize'

// import all models
import Todos from './Todos.js'
import Users from './Users.js'

import dbConfig from '~/config/database.js'

const env = process.env.NODE_ENV || 'development'
const config = dbConfig[env]

const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
}
else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

db.Todos = Todos(sequelize, DataTypes)
db.Users = Users(sequelize, DataTypes)

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
