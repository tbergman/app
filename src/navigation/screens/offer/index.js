import React from 'react';

import { OfferSwiper } from '../../../features/offer/OfferSwiper';

class OfferScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false,
      },
      statusBar: {
        visible: false,
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
