import React from 'react';
import Dashboard from '../../../features/dashboard/Dashboard';
import FloatingActionButton from '../../../features/dashboard/containers/fab';

class DashboardScreen extends React.Component {
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
    return (
      <React.Fragment>
        <Dashboard {...this.props} />
        <FloatingActionButton />
      </React.Fragment>
    );
  }
}

export const DASHBOARD_SCREEN = {
  component: {
    name: 'DashboardScreen',
  },
};

export const register = (registerComponent) =>
  registerComponent(DASHBOARD_SCREEN.component.name, () => DashboardScreen);
