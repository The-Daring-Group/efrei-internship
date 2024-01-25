const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();
const { Sequelize } = require('sequelize');

const apiRouter = require('./routes/api.js')

const app = express()

app.use(cors({ origin: 'http://localhost:8001' }))
app.use(logger('dev'))
app.use(session({ secret: 'demo secret', saveUninitialized: true, resave: true }))

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PORT = process.env.DB_PORT;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

// Sequelize setup
const sequelize = new Sequelize(
    `${DB_NAME}`,
    `${DB_USERNAME}`,
    `${DB_PASSWORD}`,
    {
        dialect: 'postgres',
        host: `${DB_HOST}`,
        port: `${DB_PORT}`,
    }
);

// Check database connection
sequelize.authenticate()
    .then(() => {
      console.log('Database reached and connected!');
    })
    .catch(err => {
      console.error('Unable to connect to database: ', err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', apiRouter)

app.listen('3002', () => {
    console.log(`Now listening on port 3002`)
})