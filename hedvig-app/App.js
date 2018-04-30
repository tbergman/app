import 'babel-polyfill';
import React from 'react';
import { AppState, Platform, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { Notifications } from 'expo';
import Sentry from 'sentry-expo';
import createRavenMiddleware from 'raven-for-redux';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';

import * as hedvigRedux from 'hedvig-redux';
import { theme } from 'hedvig-style';

import nav from './src/reducers/nav';
import { apiAndNavigateToChatSaga } from './src/sagas/apiAndNavigate';
import { tokenStorageSaga } from './src/sagas/TokenStorage';
import { logoutSaga } from './src/sagas/logout';
import { ThemeProvider } from 'styled-components';
import { Router } from './src/components/navigation/Router';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import WithAssets from './src/components/WithAssets';
import { Loader } from './src/components/Loader';
import { appStateChange } from './src/actions/appState';
import appStateChangeReducer from './src/reducers/appState';
import statusMessageReducer from './src/reducers/statusMessage';
import routerReducer from './src/reducers/router';
import conversationReducer from './src/reducers/conversation';
import { bankIdReducer } from './src/features/bankid/reducer';
import { offerReducer } from './src/features/offer/reducer';
import { marketingReducer } from './src/features/marketing/reducer';
import { appStateSaga } from './src/sagas/appState';
import { keyboardSaga } from './src/sagas/keyboard';
import { navigationSaga } from './src/sagas/navigation';
import { handleCheckoutSaga } from './src/features/offer/saga';
import {
  bankIdSignSaga,
  bankIdCollectSaga,
  bankIdSignCancelSaga,
  bankIdCollectCompleteSaga,
  bankIdAppStateChangeSaga,
} from './src/features/bankid/saga';
import {
  requestPushSaga,
  registerPushSaga,
} from './src/sagas/pushNotifications';
import { chatStartSaga, chatLoginSaga } from './src/features/marketing/saga';
import { getOrLoadToken } from './src/services/TokenStorage';
import navigationMiddleware from './src/middleware/navigation';

// Fix HMR
let SentryInstance = Sentry;
let ravenMiddleware;
if (!__DEV__) {
  SentryInstance.config(
    'https://11b25670dab44c79bfd36ec805fda14a@sentry.io/271600',
  ).install();

  ravenMiddleware = createRavenMiddleware(Sentry, {
    stateTransformer: (state) => ({ user: state.user }),
  });
} else {
  SentryInstance = {
    captureException() {},
  };
}

export class App extends React.Component {
  constructor() {
    super();
    const conversationPersistConfig = {
      key: 'conversation',
      storage: AsyncStorage,
      whitelist: ['intent'],
    };
    const additionalMiddleware = [navigationMiddleware];
    if (ravenMiddleware) {
      additionalMiddleware.push(ravenMiddleware);
    }
    this.store = hedvigRedux.configureStore({
      additionalReducers: {
        nav,
        conversation: persistReducer(
          conversationPersistConfig,
          conversationReducer,
        ),
        appState: appStateChangeReducer,
        status: statusMessageReducer,
        router: routerReducer,
        bankid: bankIdReducer,
        offer: offerReducer,
        marketing: marketingReducer,
      },
      additionalSagas: [
        apiAndNavigateToChatSaga,
        appStateSaga,
        keyboardSaga,
        tokenStorageSaga,
        navigationSaga,
        logoutSaga,
        chatStartSaga,
        chatLoginSaga,
        requestPushSaga,
        registerPushSaga,
        handleCheckoutSaga,
        bankIdSignSaga,
        bankIdCollectSaga,
        bankIdSignCancelSaga,
        bankIdCollectCompleteSaga,
        bankIdAppStateChangeSaga,
      ],
      additionalMiddleware: additionalMiddleware,
      raven: SentryInstance,
    });
    window.store = this.store;
    this.persistor = persistStore(this.store);
  }

  _handleAppStateChange = (nextAppState) => {
    this.store.dispatch(appStateChange(nextAppState));
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.store.dispatch({ type: 'PUSH_NOTIFICATIONS/REGISTER_PUSH' });
    }

    AppState.addEventListener('change', this._handleAppStateChange);
    getOrLoadToken(this.store.dispatch);

    this.store.dispatch(
      hedvigRedux.listenerActions.addListener(
        hedvigRedux.types.SHOW_ACTION_SHEET,
        ({ payload: { options, callback } }) =>
          this.props.showActionSheetWithOptions(options, callback),
      ),
    );

    Notifications.addListener(this._handleNotification);
  }

  _handleNotification = () => {
    const state = this.store.getState();
    this.store.dispatch(
      hedvigRedux.chatActions.getMessages({
        intent: state.conversation.intent,
      }),
    );
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    return (
      <ErrorBoundary raven={SentryInstance}>
        <WithAssets>
          <ThemeProvider theme={theme}>
            <Provider store={this.store}>
              <PersistGate loading={<Loader />} persistor={this.persistor}>
                <Router />
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </WithAssets>
      </ErrorBoundary>
    );
  }
}

export class AppWithActionSheet extends React.Component {
  constructor() {
    super();
    this.WrappedComponent = connectActionSheet(App);
  }
  render() {
    return (
      <ActionSheetProvider>
        <this.WrappedComponent />
      </ActionSheetProvider>
    );
  }
}

export default AppWithActionSheet;
