import { KEYBOARD_STATE_CHANGE } from '../actions/keyboardState';

function handleKeyboardStateChange(state, action) {
  return Object.assign({}, state, {
    currentState: action.payload,
  });
}

export default function reducer(
  state = { currentState: { state: null } },
  action,
) {
  switch (action.type) {
    case KEYBOARD_STATE_CHANGE:
      return handleKeyboardStateChange(state, action);
    default:
      return state;
  }
}
