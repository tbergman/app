import { Navigation } from 'react-native-navigation';
import firebase from 'react-native-firebase';
import { AppState } from 'react-native';

import { HOC } from './App';
import { setInitialLayout } from './src/navigation/layout';
import { register } from './src/navigation/register';

import { pushNotificationActions, chatActions } from './hedvig-redux';
import { openChat } from './src/sagas/apiAndNavigate';
import { Store } from './src/setupApp';

const registerHandler = (name, componentCreator) =>
  Navigation.registerComponent(name, () => {
    const innerComponent = componentCreator();
    return HOC(innerComponent.options)(innerComponent);
  });

register(registerHandler);

const getInitialNotification = () =>
  firebase
    .notifications()
    .getInitialNotification()
    .then((notification) => {
      if (notification) {
        setTimeout(() => openChat(), 500);
      }
    });

Navigation.events().registerAppLaunchedListener(async () => {
  await setInitialLayout();

  firebase.messaging().onTokenRefresh((token) => {
    Store.dispatch(pushNotificationActions.registerPushToken(token));
  });

  firebase
    .messaging()
    .getToken()
    .then((token) => {
      if (token) {
        Store.dispatch(pushNotificationActions.registerPushToken(token));
      }
    });

  const handleNotification = () => {
    const state = Store.getState();
    Store.dispatch(
      chatActions.getMessages({
        intent: state.conversation.intent,
      }),
    );
  };

  firebase.notifications().onNotification(handleNotification);

  getInitialNotification();

  AppState.addEventListener(
    'change',
    (nextAppState) => nextAppState === 'active' && getInitialNotification(),
  );
});
