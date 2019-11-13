// export function someMutation (/* state */) {}
export const setTables = (state, payload) => {
  state.tables = payload
  let newTable = {
    _id: null,
    name: '#Lobby',
    info: 'Welcome',
    players: 0,
    seats: [null, null, null, null]
  }
  state.tables.unshift(newTable)
}

export const addTable = (state, payload) => {
  const i = state.tables.findIndex(t => t._id === payload._id)
  if (i >= 0) {
    // remove
    if (payload.state < 0) state.tables.splice(i, 1)
    else state.tables.splice(i, 1, payload)
  } else if (payload.state >= 0) {
    // add
    state.tables.splice(1, 0, payload)
  }
}
