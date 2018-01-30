import { types, chatActions } from "hedvig-redux"
import { takeEvery, put, take } from "redux-saga/effects"
import { showChatAction } from "../actions/baseNavigation"

const handleLogout = function*() {
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

  yield put({
    type: types.API,
    payload: {
      method: "POST",
      url: "/chat/start",
      body: null,
      SUCCESS: "LOGOUT/CHAT_START_SUCCESS"
    }
  })

  yield take("LOGOUT/CHAT_START_SUCCESS")

  // GET /messages
  yield put(chatActions.getMessages())
}

const logoutSaga = function*() {
  yield takeEvery(types.LOGOUT, handleLogout)
}

export { logoutSaga }
