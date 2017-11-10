import { types } from "hedvig-redux"

const navReducer = (state = { currentTab: "chat" }, action) => {
  switch (action.type) {
    case types.SWITCH_BASE:
      return Object.assign({}, state, { currentTab: action.payload })
    default:
      return state
  }
}

export default navReducer
