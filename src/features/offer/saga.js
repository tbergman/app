import { AsyncStorage } from 'react-native';
import { chatActions } from '../../../hedvig-redux';
import { call, takeLatest, take, put, select } from 'redux-saga/effects';

import { showChatAction } from '../../actions/baseNavigation';
import { BANKID_SIGN, BANKID_SIGN_COMPLETE } from '../bankid/actions';
import { OFFER_CHECKOUT } from './actions';

const handleCheckout = function*() {
  yield put({ type: BANKID_SIGN });
  yield take(BANKID_SIGN_COMPLETE);

  const { conversation } = yield select();
  const { intent } = conversation;
  yield put(chatActions.getMessages({ intent }));
  yield put(showChatAction());

  yield call(AsyncStorage.removeItem, '@hedvig:isViewingOffer');
};

const handleCheckoutSaga = function*() {
  yield takeLatest(OFFER_CHECKOUT, handleCheckout);
};

export { handleCheckoutSaga };
