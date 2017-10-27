export const KEYBOARD_STATE_CHANGE = "KEYBOARD_STATE_CHANGE"

export function keyboardStateChange(newState) {
  return {
    type: KEYBOARD_STATE_CHANGE,
    payload: newState
  }
}
