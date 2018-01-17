import { LOADED_ASSETS } from "../actions/types"

const reducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case LOADED_ASSETS:
      return Object.assign({}, state, { items: action.payload })
    default:
      return state
  }
}

export default reducer
