// Import the Feathers client module that we've created before
import api from './api'

const auth = {
  // keep track of the logged in user
  user: null,

  getUser () {
    return this.user
  },

  fetchUser (accessToken) {
    return api.passport
      .verifyJWT(accessToken)
      .then(payload => {
        return api.service('users').get(payload.userId)
      })
      .then(user => {
        return Promise.resolve(user)
      })
  },

  authenticate () {
    return api
      .authenticate()
      .then(response => {
        console.log('authenticat', response)
        return this.fetchUser(response.accessToken)
      })
      .then(user => {
        this.user = user
        return Promise.resolve(user)
      })
      .catch(err => {
        this.user = null
        return Promise.reject(err)
      })
  },

  authenticated () {
    return this.user != null
  },

  signout () {
    api.service('players').remove(this.user._id)
    return api
      .logout()
      .then(() => {
        this.user = null
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },

  onLogout (callback) {
    api.on('logout', () => {
      this.user = null
      callback()
    })
  },

  onAuthenticated (callback) {
    api.on('authenticated', response => {
      console.log('authenticated', response)
      this.fetchUser(response.accessToken)
        .then(user => {
          this.user = user
          callback(this.user)
        })
        .catch(() => {
          callback(this.user)
        })
    })
  },

  register (email, password) {
    return api.service('users').create({
      email: email,
      password: password
    })
  },

  login (email, password) {
    return api.authenticate({
      strategy: 'local',
      email: email,
      password: password
    })
  },

  getRedir () {
    return api.getRedir();
  }
}

export default auth
