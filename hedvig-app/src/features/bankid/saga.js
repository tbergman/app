import { Linking, Platform } from 'react-native';
import { Constants } from 'expo';

import {
  call,
  take,
  takeEvery,
  takeLatest,
  put,
  select,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  BANKID_SIGN,
  BANKID_SIGN_CLIENT_FAILED_TO_OPEN,
  BANKID_SIGN_COMPLETE,
  BANKID_SIGN_FAILED,
  BANKID_SIGN_RESPONSE,
  BANKID_SIGN_CANCEL,
  BANKID_SIGN_RESET,
  BANKID_COLLECT,
  BANKID_COLLECT_PREPARE,
  BANKID_COLLECT_RESPONSE,
  BANKID_COLLECT_COMPLETE,
  BANKID_COLLECT_FAILED,
  BANKID_COLLECT_CANCEL,
  BANKID_COLLECT_RESET,
} from './actions';
import { APP_STATE_CHANGE } from '../../actions/appState';

import { types } from 'hedvig-redux';

const COLLECT_DELAY_MS = 1000;
const MAX_TRIES_COLLECT = 1000;
const SIGN_COMPLETE_DELAY_MS = 1000;

const buildBankIdClientUrl = (autoStartToken) => {
  const params = `?autostarttoken=${autoStartToken}&redirect=${
    Constants.linkingUri
  }`;
  const androidBankIdClientUrl = `bankid:///${params}`;
  const iOsBankIdClientUrl = `https://app.bankid.com/${params}`;
  const bankIdClientUrl =
    Platform.OS === 'ios' ? iOsBankIdClientUrl : androidBankIdClientUrl;
  return bankIdClientUrl;
};

const canOpenURL = (url) => {
  return Linking.canOpenURL(url)
    .then(() => true)
    .catch(() => false);
};

const openURL = (url) => {
  return Linking.openURL(url)
    .then(() => true)
    .catch(() => false);
};

const openBankId = function*(bankIdClientUrl) {
  let isBankIdInstalled = yield call(canOpenURL, bankIdClientUrl);
  return isBankIdInstalled ? yield call(openURL, bankIdClientUrl) : false;
};

const bankIdSignHandler = function*() {
  yield put({
    type: types.API,
    payload: {
      url: `/hedvig/onboarding/sign`,
      method: 'POST',
      SUCCESS: BANKID_SIGN_RESPONSE,
      ERROR: BANKID_SIGN_RESPONSE,
    },
  });

  yield take(BANKID_SIGN_RESPONSE);

  const state = yield select();
  const { sign } = state.bankid;
  if (
    sign.isCurrentlySigning &&
    sign.response.orderRef &&
    sign.response.autoStartToken
  ) {
    yield put({
      type: BANKID_COLLECT_PREPARE,
      payload: {
        orderRef: sign.response.orderRef,
      },
    });

    const bankIdClientUrl = buildBankIdClientUrl(sign.response.autoStartToken);
    let hasOpenedBankId = yield* openBankId(bankIdClientUrl);
    if (!hasOpenedBankId) {
      yield put({
        type: BANKID_SIGN_CLIENT_FAILED_TO_OPEN,
        payload: { hasClientFailedToOpen: true },
      });

      yield put({
        type: BANKID_COLLECT,
        payload: {
          orderRef: sign.response.orderRef,
        },
      });
    }
  } else {
    // report sentry
    yield put({ type: BANKID_SIGN_FAILED });
  }
};

const bankIdCollectHandler = function*() {
  let state = yield select();

  // Quit if the sign has been cancelled
  if (!state.bankid.sign.isCurrentlySigning) return;

  let { collect } = state.bankid;
  if (!collect.orderRef) {
    throw new Error(
      `No order ref for bank id collect: ${JSON.stringify(state.bankid)}`,
    );
  }
  yield put({
    type: types.API,
    payload: {
      url: `/hedvig/onboarding/collect`,
      method: 'POST',
      body: JSON.stringify({
        orderRef: collect.orderRef,
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      SUCCESS: BANKID_COLLECT_RESPONSE,
      ERROR: BANKID_COLLECT_RESPONSE,
    },
  });

  yield take(BANKID_COLLECT_RESPONSE);

  state = yield select();
  collect = state.bankid.collect;
  if (collect.response.status === 'complete') {
    yield put({ type: BANKID_COLLECT_COMPLETE });
  } else if (
    collect.response.status === 'failed' ||
    collect.tryCount >= MAX_TRIES_COLLECT
  ) {
    yield put({ type: BANKID_COLLECT_FAILED });
  } else {
    yield call(delay, COLLECT_DELAY_MS);
    yield put({
      type: BANKID_COLLECT,
      payload: { orderRef: collect.orderRef },
    });
  }
};

const bankIdSignCancelHandler = function*() {
  yield put({ type: BANKID_COLLECT_CANCEL });
  yield put({ type: BANKID_SIGN_RESET });
  yield put({ type: BANKID_COLLECT_RESET });
};

const bankIdCollectCompleteHandler = function*() {
  const state = yield select();
  if (state.bankid.sign.isCurrentlySigning) {
    // Show success message for a little while before redirecting to chat
    yield call(delay, SIGN_COMPLETE_DELAY_MS);
    yield put({ type: BANKID_SIGN_COMPLETE });
    yield put({ type: BANKID_SIGN_RESET });
    yield put({ type: BANKID_COLLECT_RESET });
  }
};

const bankIdAppStateChangeHandler = function*() {
  let state = yield select();

  const orderRef = state.bankid.collect.orderRef;
  if (
    state.appState.currentState === 'active' &&
    state.bankid.sign.isCurrentlySigning &&
    orderRef
  ) {
    yield put({
      type: BANKID_COLLECT,
      payload: { orderRef },
    });
  }
};

const bankIdSignSaga = function*() {
  yield takeLatest(BANKID_SIGN, bankIdSignHandler);
};

const bankIdSignCancelSaga = function*() {
  yield takeLatest(BANKID_SIGN_CANCEL, bankIdSignCancelHandler);
};

const bankIdCollectSaga = function*() {
  yield takeLatest(BANKID_COLLECT, bankIdCollectHandler);
};

const bankIdCollectCompleteSaga = function*() {
  yield takeLatest(BANKID_COLLECT_COMPLETE, bankIdCollectCompleteHandler);
};

const bankIdAppStateChangeSaga = function*() {
  yield takeEvery(APP_STATE_CHANGE, bankIdAppStateChangeHandler);
};

export {
  bankIdSignSaga,
  bankIdCollectSaga,
  bankIdCollectCompleteSaga,
  bankIdSignCancelSaga,
  bankIdAppStateChangeSaga,
};
