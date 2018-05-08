import { LOADED_CASHBACK_ALTERNATIVES } from "../actions/types"

const reducer = (state = { alternatives: {} }, action) => {
  switch (action.type) {
    case LOADED_CASHBACK_ALTERNATIVES:
      return Object.assign({}, state, { alternatives: action.payload })
    default:
      return state
  }
}

export default reducer
