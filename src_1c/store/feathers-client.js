import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'

// medium nuxtServerLnit
export const host = process.env.API_HOST || 'http://localhost:3030'

export default (origin, storage) => {
  const socket = io(host, {
    transports: ['websocket'],
    extraHeaders: {
      origin: origin || ''
    }
  })
  
  const api = feathers()
    .configure(socketio(socket))
    .configure(auth({
      storage: window.localStorage,
      cookie: 'feathers-jwt'
    }))
}
