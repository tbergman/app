const R = require("ramda")
import { LOADED_ONBOARDING, LOADED_MESSAGES } from "../actions/types"
import { MOCK_LOADED_CLAIM_MESSAGES } from "../actions/mock/types"

const reducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case MOCK_LOADED_CLAIM_MESSAGES:
    case LOADED_MESSAGES:
    case LOADED_ONBOARDING:
      return Object.assign({}, state, {
        messages: R.sortBy(
          R.path(["header", "timeStamp"]),
          R.values(action.payload)
        )
      })
    default:
      return state
  }
}

export default reducer
