import 'dotenv/config'
import process from 'node:process'
import pg from 'pg'

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.POSTGRES_HOST || 'localhost',
    dialect: 'postgres',
    dialectModule: pg,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.POSTGRES_HOST || 'localhost',
    dialect: 'postgres',
    dialectModule: pg,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.POSTGRES_HOST || 'localhost',
    dialect: 'postgres',
    dialectModule: pg,
  },
}
