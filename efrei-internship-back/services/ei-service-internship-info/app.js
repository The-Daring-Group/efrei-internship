const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const cors = require('cors')

const apiRouter = require('./routes/api.js')

const app = express()

app.use(cors({ origin: 'http://localhost:8080' }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'demo secret', saveUninitialized: true, resave: true }))

app.use('/api/', apiRouter)

const port = process.env.PORT || 3003

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

module.exports = app
