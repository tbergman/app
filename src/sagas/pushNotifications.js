import { takeLatest, call, put } from 'redux-saga/effects';
import Permissions from 'react-native-permissions';
import firebase from 'react-native-firebase';
import { pushNotificationActions } from '../../hedvig-redux';

const requestPush = function*() {
  const status = yield call(Permissions.request, 'notification');
  if (status !== 'authorized') {
    return yield put({ type: 'PUSH_NOTIFICATIONS/REQUEST_NOT_GRANTED' });
  }
  return yield call(registerPush);
};

const registerPush = function*() {
  const token = yield call([firebase.messaging(), 'getToken']);
  if (!token) {
    console.log('ERROR: User does not have an FCM token'); // eslint-disable-line no-console
  }
  return yield put(pushNotificationActions.registerPushToken(token));
};

export const requestPushSaga = function*() {
  yield takeLatest('PUSH_NOTIFICATIONS/REQUEST_PUSH', requestPush);
};

export const registerPushSaga = function*() {
  yield takeLatest('PUSH_NOTIFICATIONS/REGISTER_PUSH', registerPush);
};
