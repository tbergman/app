import React from 'react';
import { MarketingCarousel } from '../../../features/marketing/MarketingCarousel';

class MarketingScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
      statusBar: {
        visible: true,
        drawBehind: false,
        style: 'light',
      },
    };
  }

  render() {
    return <MarketingCarousel {...this.props} />;
  }
}

export const MARKETING_SCREEN = {
  component: {
    name: 'MarketingScreen',
  },
};

export const register = (registerComponent) =>
  registerComponent(MARKETING_SCREEN.component.name, () => MarketingScreen);
