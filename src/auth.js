// Import the Feathers client module that we've created before
import {
  api
} from './api'

const auth = {
  // keep track of the logged in user
  user: null,

  authenticated () {
    return this.user != null
  },

  register (credential) {
    // return api.service('users').create(credential)
    return api.service('users').create({
      email: credential.email,
      password: credential.password
    })
  },

  login (credentials) {
    if (!credentials) {
      // Try to authenticate using an existing token
      return api.reAuthenticate()
    } else {
      // Otherwise log in with the `local` strategy using the credentials we got
      return api.authenticate({
        strategy: 'local',
        ...credentials
      })
    }
  },

  async signout () {
    // api.service('players').remove(this.user._id)
    try {
      await api.logout()
    } catch (err) {
      console.log('logout error', err)
      return Promise.reject(err)
    }
  },

  onLogout (callback) {
    api.on('logout', () => {
      this.user = null
      callback()
    })
  },

  onAuthenticated (callback) {
    api.on('authenticated', response => {
      this.user = response.user
      callback(this.user)
    })
  }
}

export default auth
