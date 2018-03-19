import { takeLatest, call, put } from "redux-saga/effects"
import { Permissions, Notifications } from "expo"

import { pushNotificationActions } from "hedvig-redux"

const requestPush = function*() {
  const { status } = yield call(Permissions.askAsync, Permissions.NOTIFICATIONS)
  if (status !== 'granted') {
    return yield put({
      type: "PUSH_NOTIFICATIONS/REQUEST_NOT_GRANTED"
    })
  }
  return yield call(registerPush)
}

const registerPush = function*() {
  const token = yield call(Notifications.getExpoPushTokenAsync)
  return yield put(pushNotificationActions.registerPushToken(token))
}

export const requestPushSaga = function*() {
  yield takeLatest("PUSH_NOTIFICATIONS/REQUEST_PUSH", requestPush);
}

export const registerPushSaga = function*() {
  yield takeLatest("PUSH_NOTIFICATIONS/REGISTER_PUSH", registerPush)
}
