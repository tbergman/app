import { takeEvery, put } from 'redux-saga/effects';
import { types, userActions } from 'hedvig-redux';

const NAVIGATION_ACTIONS = [types.SWITCH_BASE, 'Navigation/NAVIGATE'];

const navigationHandler = function*() {
  // TODO: Choose what to do based on the action
  yield put(userActions.getCurrentUser());
};

const navigationSaga = function*() {
  yield takeEvery(NAVIGATION_ACTIONS, navigationHandler);
};

export { navigationSaga };
