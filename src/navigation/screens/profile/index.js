import React from 'react';
import Profile from '../../../features/profile';

class ProfileScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false,
      },
      statusBar: {
        visible: true,
        style: 'dark',
      },
    };
  }

  render() {
    return <Profile {...this.props} />;
  }
}

export const PROFILE_SCREEN = {
  component: {
    name: 'ProfileScreen',
  },
};

export const register = (registerComponent) =>
  registerComponent(PROFILE_SCREEN.component.name, () => ProfileScreen);
