import React from 'react';

import OfferSwiper from '../../../features/offer';
import { Experiment } from 'src/components/experiment';
import { NewOffer } from 'src/features/new-offer';

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
        drawBehind: false,
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
