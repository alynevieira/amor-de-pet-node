'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
const http = require('http')
const auth = require('./routes/auth/credentials')
const user = require('./routes/c/users')
const animal = require('./routes/c/animal')

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))
app.use(jwt())

const logIncomingRequest = (req, res, next) => {
    console.log(`HEADER ${JSON.stringify(req.headers, null, 2)}`)

    if(req.method !== 'GET') {
        console.log(`BODY ${JSON.stringify(req.body, null, 2)}`)
    }

    next()
}

function normalizePort(val) {
    let port = parseInt(val, 10)
  
    if (isNaN(port)) {
      return val
    }
  
    if (port >= 0) {
      return port
    }
  
    return false
}

//subir a porta 3000, em caso de erro, mostrar qual
const server = http.createServer(app)
server.listen(port)
server.on('listening', () => {
    let addr = server.address()
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port
    console.log('Listening on ' + bind)
})
server.on('error', error => {
    if (error.syscall !== 'listen') {
      throw error
    }
  
    let bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port
  
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
})

// api routes
app.use('/api/signin', [logIncomingRequest], auth)
app.use('/api/user', [logIncomingRequest], user)
app.use('/api/animal', [logIncomingRequest], animal)

// global error handler
app.use(errorHandler)

module.exports = app
