// app.js
const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const cors = require('cors')
//require('dotenv').config(); // for .env file, need to install dotenv package

const apiRouter = require('./routes/api.js')

const app = express()

app.use(cors({ origin: 'http://localhost:8080' }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'demo secret', saveUninitialized: true, resave: true }))

app.use('/api/', apiRouter)

var port = process.env.PORT || 3002

/*app.listen(port, () => {
  console.log('Server listening on port ' + port)
})*/

module.exports = app
