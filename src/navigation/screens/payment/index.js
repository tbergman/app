import React from 'react';
import Payment from '../../../features/payment';
import { StandalonePayment } from 'src/features/payment/StandalonePayment';
import { CLOSE_BUTTON } from './buttons';

class PaymentScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: true,
        title: {
          text: 'Betalning',
        },
        leftButtons: [CLOSE_BUTTON],
      },
      statusBar: {
        visible: true,
        style: 'dark',
      },
    };
  }

  render() {
    if (this.props.startedFromChat) {
      return <Payment {...this.props} />;
    }

    return <StandalonePayment {...this.props} />;
  }
}

export const PAYMENT_SCREEN = {
  component: {
    name: 'PaymentScreen',
  },
};

export const register = (registerComponent) =>
  registerComponent(PAYMENT_SCREEN.component.name, () => PaymentScreen);
