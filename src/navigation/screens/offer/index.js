import React from 'react';

import OfferSwiper from '../../../features/offer';

class OfferScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false,
        elevation: 0,
        drawBehind: true,
      },
      statusBar: {
        visible: true,
        style: 'light',
      },
    };
  }

  render() {
    return <OfferSwiper {...this.props} />;
  }
}

export const OFFER_SCREEN = {
  component: {
    name: 'OfferScreen',
  },
};

export const register = (registerComponent) =>
  registerComponent(OFFER_SCREEN.component.name, () => OfferScreen);
