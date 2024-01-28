const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const cors = require('cors')

const apiRouterInternship = require('./routes/apiInternship.js')
const apiRouterEvaluation = require('./routes/apiEvaluation.js')

const app = express()

app.use(cors({ origin: ['http://localhost:8080', "http://localhost:8000"] }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'demo secret', saveUninitialized: true, resave: true }))

app.use('/api/', apiRouterInternship)
app.use('/api/', apiRouterEvaluation)

module.exports = app
