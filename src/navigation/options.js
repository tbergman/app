import React from 'react';
import { Navigation } from 'react-native-navigation';

import { NavigationContext } from './context';

export const NavigationOptions = ({ children = null, options }) => (
  <NavigationContext.Consumer>
    {({ componentId }) => {
      Navigation.mergeOptions(componentId, options);
      return children;
    }}
  </NavigationContext.Consumer>
);
