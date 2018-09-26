import React from 'react';
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ApolloProvider } from 'react-apollo';

import { ErrorBoundary } from './src/components/ErrorBoundary';
import { Loader } from './src/components/Loader';
import Dialog from './src/containers/Dialog';
import { TranslationsProvider } from './src/components/translations/provider';

import { Raven, Store, Persistor } from './src/setupApp';

import { NavigationContext } from './src/navigation/context';
import { client } from 'src/graphql/client';

export const HOC = (options) => (Component) => {
  class Screen extends React.Component {
    static options = options;

    render() {
      const { componentId } = this.props;
      return (
        <ErrorBoundary raven={Raven}>
          <ApolloProvider client={client}>
            <TranslationsProvider>
              <Provider store={Store}>
                <PersistGate loading={<Loader />} persistor={Persistor}>
                  <NavigationContext.Provider value={{ componentId }}>
                    <Component {...this.props} />
                    <Dialog />
                  </NavigationContext.Provider>
                </PersistGate>
              </Provider>
            </TranslationsProvider>
          </ApolloProvider>
        </ErrorBoundary>
      );
    }
  }

  return __DEV__ ? Screen : codePush(Screen);
};
