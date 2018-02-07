export default (state = {}, action) => {
  switch (action.type) {
    case "PAYMENT/RECEIVED_IFRAME_URL":
      return Object.assign({}, state, {url: action.payload.url})
    default:
      return state
  }
}
