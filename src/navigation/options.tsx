import React from 'react';
import { Navigation } from 'react-native-navigation';

import { NavigationContext } from './context';
import { Mount, Update } from 'react-lifecycle-components';

interface NavigationOptionsProps {
  options: any;
}

export const NavigationOptions: React.SFC<NavigationOptionsProps> = ({
  children = null,
  options,
}) => (
  <NavigationContext.Consumer>
    {({ componentId = '' }) => {
      return (
        <Mount on={() => Navigation.mergeOptions(componentId, options)}>
          <Update
            was={() => Navigation.mergeOptions(componentId, options)}
            watched={options}
          >
            {children}
          </Update>
        </Mount>
      );
    }}
  </NavigationContext.Consumer>
);
