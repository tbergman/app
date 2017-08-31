import { LOADED_ONBOARDING } from "../actions/types"

const reducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case LOADED_ONBOARDING:
      return Object.assign({}, state, {
        messages: [...state.messages, ...action.payload.data]
      })
    default:
      return state
  }
}

export default reducer
