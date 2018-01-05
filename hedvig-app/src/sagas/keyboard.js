import { takeEvery } from "redux-saga/effects"
import { Keyboard } from "react-native"
import { types } from "hedvig-redux"

/*
Hiding the keyboard:
Add actions to KEYBOARD_HIDING_ACTIONS to always hide the keyboard
when those actions are fired
*/

const KEYBOARD_HIDING_ACTIONS = [
  types.DIALOG_MESSAGE,
  types.SWITCH_BASE,
  "Navigation/NAVIGATE"
]

const hideKeyboard = function() {
  Keyboard.dismiss()
}

const keyboardSaga = function*() {
  yield takeEvery(KEYBOARD_HIDING_ACTIONS, hideKeyboard)
}

export { keyboardSaga }
