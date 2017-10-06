const R = require("ramda")
const dotProp = require("dot-prop-immutable")
import {
  LOADED_ONBOARDING,
  LOADED_MESSAGES,
  CHOICE_SELECTED,
  SET_RESPONSE_VALUE
} from "../actions/types"
import { MOCK_LOADED_CLAIM_MESSAGES } from "../actions/mock/types"

const selectChoice = (state, { payload: { message, choice } }) => {
  let messages = state.messages
  let messageIndex = messages.findIndex(m => R.equals(m, message))
  let choiceIndex = messages[messageIndex].body.choices.findIndex(l =>
    R.equals(l, choice)
  )
  let currentSelection =
    messages[messageIndex].body.choices[choiceIndex].selected
  let newState = dotProp.set(
    state,
    `messages.${messageIndex}.body.choices.${choiceIndex}.selected`,
    !currentSelection
  )
  return newState
}

const setResponseValue = (state, { payload: { message, value } }) => {
  let messages = state.messages
  let messageIndex = messages.findIndex(m => R.equals(m, message))
  let newState = dotProp.set(
    state,
    `messages.${messageIndex}._inputValue`,
    value
  )
  return newState
}

const reducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case MOCK_LOADED_CLAIM_MESSAGES:
    case LOADED_MESSAGES:
    case LOADED_ONBOARDING:
      return Object.assign({}, state, {
        messages: R.sortBy(R.path(["timestamp"]), R.values(action.payload))
      })
    case CHOICE_SELECTED:
      return selectChoice(state, action)
    case SET_RESPONSE_VALUE:
      return setResponseValue(state, action)
    default:
      return state
  }
}

export default reducer
