import { takeLatest } from 'redux-saga/effects';

const requestPush = function*() {
  return yield;
  // TODO Do something here
};

const registerPush = function*() {
  return yield;
  // TODO Do something here
};

export const requestPushSaga = function*() {
  yield takeLatest('PUSH_NOTIFICATIONS/REQUEST_PUSH', requestPush);
};

export const registerPushSaga = function*() {
  yield takeLatest('PUSH_NOTIFICATIONS/REGISTER_PUSH', registerPush);
};
