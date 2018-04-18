import { take, takeEvery, put, select } from 'redux-saga/effects';
import { types, chatActions } from 'hedvig-redux';
import { showChatAction } from '../actions/baseNavigation';

const apiAndNavigateToChat = function*({ payload }) {
  if (payload) {
    yield put({
      type: types.API,
      payload,
    });
    yield take(payload.SUCCESS);
    const state = yield select();
    const intent = state.conversation.intent;
    yield put(chatActions.getMessages({ intent }));
  }
  yield put(showChatAction());
};

const apiAndNavigateToChatSaga = function*() {
  yield takeEvery(types.API_AND_NAVIGATE_TO_CHAT, apiAndNavigateToChat);
};

export { apiAndNavigateToChatSaga };
