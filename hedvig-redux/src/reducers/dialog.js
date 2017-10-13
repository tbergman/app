import {
  DIALOG_MESSAGE,
  EMPTY_DIALOG_MESSAGE
} from "../actions/types"

const reducer = (state = { message: { title: null, paragraph: null } }, action) => {
  switch (action.type) {
    case DIALOG_MESSAGE:
      return Object.assign({}, state, {message: action.payload})
    case EMPTY_DIALOG_MESSAGE:
      return Object.assign({}, state, {message: {title: null, paragraph: null}})
    default:
      return state
  }
}

export default reducer
