import { Navigation } from 'react-native-navigation';

import { NavigationContext } from './context';

export const NavigationOptions = ({ children, options }) => (
  <NavigationContext.Consumer>
    {({ componentId }) => {
      Navigation.mergeOptions(options);
      return children;
    }}
  </NavigationContext.Consumer>
);
