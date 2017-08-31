import { LOADED_ONBOARDING, LOADED_INTRO_MESSAGES } from "../actions/types"

const reducer = (state = { messages: [] }, action) => {
  switch (action.type) {
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
