/*
export function someMutation (state) {
}
*/
export const setUser = (state, payload) => {
  // console.log('setUser', payload)
  state.myUser = payload
}
export const setPlayers = (state, payload) => {
  state.players = payload
  const i = state.players.findIndex(p => p.id === state.myUser._id)
  if (i >= 0) {
    state.myUser.tId = state.players[i].tId
    state.myUser.sId = state.players[i].sId
  }
}
export const setPlayer = (state, payload) => {
  const i = state.players.findIndex(p => p.id === payload.id)
  if (i >= 0) {
    if (payload.state < 0) state.players.splice(i, 1)
    else state.players.splice(i, 1, payload)
  } else {
    state.players.push(payload)
  }
  if (state.myUser && payload.id === state.myUser._id) {
    state.myUser.tableId = payload.tableId
    state.myUser.seatId = payload.seatId
  }
}
export const setTables = (state, payload) => {
  state.tables = payload
  let newTable = { _id: null, name: '#Lobby', players: 0, seats: [null, null, null, null] }
  state.tables.unshift(newTable)
}
export const setTable = (state, payload) => {
  const i = state.tables.findIndex(t => t._id === payload._id)
  if (i >= 0) {
    if (payload.state < 0) state.tables.splice(i, 1)
    else state.tables.splice(i, 1, payload)
  } else if (payload.state >= 0) {
    state.tables.splice(1, 0, payload)
  }
  // console.log(i, payload, state.tables)
}
export const setChats = (state, payload) => {
  state.chats.unshift(payload)
  console.log('chat', state.chats)
}
export const setChatTo = (state, payload) => {
  state.chatTo = payload
}
export const setBids = (state, payload) => {
  state.myBids = payload
}
