import { take, takeEvery, put, select } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';
import { types, chatActions } from '../../hedvig-redux';
import { CHAT_SCREEN_MODAL } from '../../src/navigation/screens/chat/modal';

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

  Navigation.showModal({
    stack: {
      children: [CHAT_SCREEN_MODAL],
    },
  });
};

const apiAndNavigateToChatSaga = function*() {
  yield takeEvery(types.API_AND_NAVIGATE_TO_CHAT, apiAndNavigateToChat);
};

export { apiAndNavigateToChatSaga };
