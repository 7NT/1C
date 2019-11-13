/*
export function someGetter (state) {
}
*/
export const getPlayerById = state => id => {
  let p = state.players.find(player => player.id === id)
  if (!p) p = state.users.find(user => user._id === id)

  return p
}