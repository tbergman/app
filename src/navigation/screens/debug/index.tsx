import React from 'react';

import { Debug } from 'src/features/debug';
import { ComponentRegistrator } from '../types';

class DebugScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Debug',
        },
      },
    };
  }
  render() {
    return <Debug />;
  }
}

export const DEBUG_SCREEN = {
  component: {
    name: 'DebugScreen',
  },
};

export const register = (registerComponent: ComponentRegistrator) =>
  registerComponent(DEBUG_SCREEN.component.name, () => DebugScreen);
