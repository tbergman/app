import React from 'react';
import { Navigation } from 'react-native-navigation';

import { NavigationContext } from './context';

class NavigationEventsHandler extends React.Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);

    if (props.onNavigationCommand) {
      this.unregisterCommands = Navigation.events().registerCommandListener(
        (name, params) =>
          props.onNavigationCommand(name, params, props.componentId),
      );
    }
  }

  componentWillUnmount() {
    if (this.unregisterCommands) {
      this.unregisterCommands();
    }
  }

  navigationButtonPressed(event) {
    this.props.onNavigationButtonPressed(event, this.props.componentId);
  }

  render() {
    return this.props.children || null;
  }
}

export const NavigationEvents = (props) => (
  <NavigationContext.Consumer>
    {({ componentId }) => (
      <NavigationEventsHandler {...props} componentId={componentId} />
    )}
  </NavigationContext.Consumer>
);

NavigationEvents.defaultProps = {
  onNavigationButtonPressed: () => {},
};
