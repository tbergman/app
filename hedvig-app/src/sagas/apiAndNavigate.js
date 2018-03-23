import { take, takeEvery, put } from 'redux-saga/effects';
import { types, chatActions } from 'hedvig-redux';
import { showChatAction } from '../actions/baseNavigation';

const apiAndNavigateToChat = function*({ payload }) {
  if (payload) {
    yield put({
      type: types.API,
      payload,
    });
    yield take(payload.SUCCESS);
    yield put(chatActions.getMessages());
  }
  yield put(showChatAction());
};

const apiAndNavigateToChatSaga = function*() {
  yield takeEvery(types.API_AND_NAVIGATE_TO_CHAT, apiAndNavigateToChat);
};

export { apiAndNavigateToChatSaga };
