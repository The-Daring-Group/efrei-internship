const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const cors = require('cors')

const apiRouter = require('./routes/api.js')

const app = express()

app.use(cors({ origin: ['http://localhost:8000', 'http://localhost:8001']}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'demo secret', saveUninitialized: true, resave: true }))

app.use('/api/', apiRouter)

module.exports = app
