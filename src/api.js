const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const io = require('socket.io-client')
const auth = require('@feathersjs/authentication-client')

// Set up Socket.io client with the socket
const socket = io('http://localhost:3030')

const api = feathers()

api.configure(socketio(socket))
api.configure(auth())

api.service('/users')
api.service('/messages')
api.service('/players')
api.service('/tables')

export default api
