import {
  STATUS_MESSAGE
} from "../actions/types"

const reducer = (state = { message: null, warning: null, error: null }, action) => {
  switch (action.type) {
    case STATUS_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload.message,
        warning: action.payload.warning,
        error: action.payload.error
      })
    default:
      return state
  }
}

export default reducer
