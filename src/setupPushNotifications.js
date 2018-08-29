import firebase from 'react-native-firebase';
import { Platform } from 'react-native';

import { pushNotificationActions, chatActions } from '../hedvig-redux';
import { openChat } from './sagas/apiAndNavigate';
import { Store } from './setupApp';

export const setupPushNotifications = () => {
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

  const handleNotification = (notification) => {
    const state = Store.getState();
    Store.dispatch(
      chatActions.getMessages({
        intent: state.conversation.intent,
      }),
    );

    if (Platform.OS === 'android') {
      const channel = new firebase.notifications.Android.Channel(
        'hedvig-push',
        'Hedvig Push',
        firebase.notifications.Android.Importance.Max,
      );
      firebase
        .notifications()
        .android.createChannel(channel)
        .then(() => {
          notification.android.setChannelId(channel.channelId);
          firebase.notifications().displayNotification(notification);
        });
    } else {
      firebase.notifications().displayNotification(notification);
    }
  };

  firebase.notifications().onNotification(handleNotification);

  firebase
    .notifications()
    .getInitialNotification()
    .then((notification) => {
      if (notification) {
        setTimeout(() => openChat(), 500);
      }
    });

  firebase.notifications().onNotificationOpened((notification) => {
    if (notification) {
      setTimeout(() => openChat(), 500);
    }
  });
};
