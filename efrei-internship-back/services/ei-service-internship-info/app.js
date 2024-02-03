const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();
const { Sequelize } = require('sequelize');

const apiRouterInternship = require('./routes/apiInternship.js')
const apiRouterEvaluation = require('./routes/apiEvaluation.js')

const app = express()

app.use(cors({ origin: ['http://localhost:8001', "http://localhost:8000"] }))
app.use(logger('dev'))
app.use(session({ secret: 'demo secret', saveUninitialized: true, resave: true }))

app.use('/api/', apiRouterInternship)
app.use('/api/', apiRouterEvaluation)

app.listen('3002', () => {
    console.log(`Now listening on port 3002`)
})