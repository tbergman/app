import { AsyncStorage } from 'react-native';
import { put, takeLatest, call } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { setConversationIntent } from '../actions/conversation';

import { SEEN_MARKETING_CAROUSEL_KEY } from '../constants';

const redirectToChat = function*({ intent }) {
  yield call(AsyncStorage.setItem, SEEN_MARKETING_CAROUSEL_KEY, 'true');
  // `intent` is used to start the right conversation on the backend
  yield put(setConversationIntent({ intent }));

  yield put(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Conversation',
        }),
      ],
    }),
  );
};

const chatStart = function*() {
  yield* redirectToChat({ intent: 'onboarding' });
};

const chatLogin = function*() {
  yield* redirectToChat({ intent: 'login' });
};

export const chatStartSaga = function*() {
  yield takeLatest('MARKETING_CAROUSEL/CHAT_START', chatStart);
};

export const chatLoginSaga = function*() {
  yield takeLatest('MARKETING_CAROUSEL/CHAT_LOGIN', chatLogin);
};
