import { LOADED_DASHBOARD } from "../actions/types"

const reducer = (state = { dashboard: null }, action) => {
  switch (action.type) {
    case LOADED_DASHBOARD:
      return Object.assign({}, { dashboard: action.payload })
    default:
      return state
  }
}

export default reducer
