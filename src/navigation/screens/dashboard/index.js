import React from 'react';
import Dashboard from '../../../features/dashboard/Dashboard';

class DashboardScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false,
        title: {
          text: 'Min hemförsäkring',
        },
      },
      statusBar: {
        visible: true,
        style: 'dark',
      },
    };
  }

  render() {
    return <Dashboard {...this.props} />;
  }
}

export const DASHBOARD_SCREEN = {
  component: {
    name: 'DashboardScreen',
  },
};

export const register = (registerComponent) =>
  registerComponent(DASHBOARD_SCREEN.component.name, () => DashboardScreen);
