import {
  DIALOG_MESSAGE,
  DIALOG_CONFIRM_PRESSED,
  DIALOG_DISMISS_PRESSED,
} from '../actions/types';
import { take, takeEvery } from 'redux-saga/effects';

const handleDialog = function*(action) {
  let { type } = yield take([DIALOG_CONFIRM_PRESSED, DIALOG_DISMISS_PRESSED]);
  if (type == DIALOG_CONFIRM_PRESSED) {
    action.payload.onConfirm && action.payload.onConfirm();
  } else if (type == DIALOG_DISMISS_PRESSED) {
    action.payload.onDismiss && action.payload.onDismiss();
  }
};

const handleDialogSaga = function*() {
  yield takeEvery(DIALOG_MESSAGE, handleDialog);
};

export { handleDialogSaga };
