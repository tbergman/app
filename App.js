import 'babel-polyfill';
import React from 'react';

import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { Loader } from './src/components/Loader';
import Dialog from './src/containers/Dialog';

import { Raven, Store, Persistor } from './src/setupApp';

import { NavigationContext } from './src/navigation/context';

export const HOC = (options) => (Component) => {
  class Screen extends React.Component {
    static options = options;

    render() {
      const { componentId } = this.props;
      return (
        <ErrorBoundary raven={Raven}>
          <Provider store={Store}>
            <PersistGate loading={<Loader />} persistor={Persistor}>
              <NavigationContext.Provider value={{ componentId }}>
                <Component {...this.props} />
                <Dialog />
              </NavigationContext.Provider>
            </PersistGate>
          </Provider>
        </ErrorBoundary>
      );
    }
  }

  return Screen;
};
