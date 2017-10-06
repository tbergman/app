const reducer = (state = { token: null }, action) => {
  switch (action.type) {
    case "RECEIVED_TOKEN":
      return Object.assign({}, { token: action.payload })
    default:
      return state
  }
}

export default reducer
