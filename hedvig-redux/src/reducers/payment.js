export default (state = {}, action) => {
  switch (action.type) {
    case "PAYMENT/RECEIVED_IFRAME_URL":
      return Object.assign({}, state, {url: action.payload.url})
    case "PAYMENT/RESET_PAYMENT_STATE":
      return Object.assign({}, state, {url: undefined})
    default:
      return state
  }
}
