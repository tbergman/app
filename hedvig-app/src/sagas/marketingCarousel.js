import { put, takeLatest, take } from "redux-saga/effects"
import { types, chatActions } from "hedvig-redux"

const chatStart = function*(action){
  let tries = 0
  action.payload.onSuccess()
  while (true) {
    yield put({
      type: types.API,
      payload: {
        url: "/chat/start",
        method: "POST",
        SUCCESS: "MARKETING_CAROUSEL_TRIGGER_CHAT_START_SUCCESS" // TODO No hardcoded actions
      },
    })
    const res = yield take(["MARKETING_CAROUSEL_TRIGGER_CHAT_START_SUCCESS", types.API_ERROR])

    if (res.type !== "MARKETING_CAROUSEL_TRIGGER_CHAT_START_SUCCESS") {
      tries += 1
      if (tries >= 5) {
        throw new Error("Failed to start chat!")
      } else {
        continue
      }
    }

    return yield put(chatActions.getMessages())
  }
}

const chatLogin = function*(action) {
  let tries = 0
  action.payload.onSuccess()
  while (true) {
    yield put({
      type: types.API,
      payload: {
        url: "/chat/login",
        method: "POST",
        SUCCESS: "MARKETING_CAROUSEL_TRIGGER_CHAT_LOGIN_SUCCESS" // TODO No hardcoded actions
      },
    })
    const res = yield take(["MARKETING_CAROUSEL_TRIGGER_CHAT_LOGIN_SUCCESS", types.API_ERROR])

    if (res.type !== "MARKETING_CAROUSEL_TRIGGER_CHAT_LOGIN_SUCCESS") {
      tries += 1
      if (tries >= 5) {
        throw new Error("Failed to start chat in login mode!")
      } else {
        continue
      }
    }

    return yield put(chatActions.getMessages())
  }
}

export const chatStartSaga = function*() {
  yield takeLatest("MARKETING_CAROUSEL/CHAT_START", chatStart)
}

export const chatLoginSaga = function*() {
  yield takeLatest("MARKETING_CAROUSEL/CHAT_LOGIN", chatLogin)
}
