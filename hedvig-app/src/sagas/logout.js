import { types, chatActions } from "hedvig-redux"
import { take, takeEvery, put } from "redux-saga/effects"
import { showChatAction } from "../actions/baseNavigation"

const handleLogout = function*(action) {
  // Delete session from backend, then create a new one
  yield put({
    type: types.API,
    payload: {
      method: "POST",
      url: "/logout",
      body: null,
      SUCCESS: "LOGOUT_REQUESTED"
    }
  })

  // Delete existing token from frontend
  yield put({ type: types.DELETE_TOKEN, payload: {} })

  // yield take("LOGOUT_REQUESTED") <-- Don't wait == Fire and forget
  // Get a new token
  yield put({ type: types.AUTHENTICATE, payload: {} })

  // Switch to the chat
  yield put(showChatAction())

  // GET /messages
  yield put(chatActions.getMessages())
}

const logoutSaga = function*() {
  yield takeEvery(types.LOGOUT, handleLogout)
}

export { logoutSaga }
