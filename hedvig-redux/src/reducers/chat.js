import { LOADED_ONBOARDING, LOADED_INTRO_MESSAGES } from "../actions/types"
import { MOCK_LOADED_CLAIM_MESSAGES } from "../actions/mock/types"

const reducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case MOCK_LOADED_CLAIM_MESSAGES:
    case LOADED_INTRO_MESSAGES:
    case LOADED_ONBOARDING:
      return Object.assign({}, state, {
        messages: [...state.messages, ...action.payload.data]
      })
    default:
      return state
  }
}

export default reducer
