import api from 'src/api'

const seatX = function (x, x0) {
  try {
    switch (x0) {
      case 1:
      case 2:
      case 3:
      case 4:
        return (x0 + x) % 4 + 1
      default: return x
    }
  } catch (err) {}
  return x
}

/*
const getUser = function (uId) {
  return api.service('users').get(uId).then((user) => {
    console.log('user', user)
    return user
  })
}
*/
module.exports = { seatX }
