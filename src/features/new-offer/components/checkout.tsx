import * as React from 'react';
import { connect } from 'react-redux';
import { OFFER_CHECKOUT } from 'src/features/offer/state/actions';
import { NavigationEvents } from 'src/navigation/events';
import { Dialog } from 'src/features/bankid/Dialog';

export const CheckoutComp = ({ checkout }) => (
  <>
    <NavigationEvents
      onGlobalEvent={(event) => {
        if (event.id === 'SignButtonPressed') {
          checkout();
        }
      }}
    />
    <Dialog />
  </>
);

const mapDispatchToProps = (dispatch) => {
  return {
    checkout: () => {
      dispatch({
        type: OFFER_CHECKOUT,
      });
    },
  };
};

export const Checkout = connect(
  null,
  mapDispatchToProps,
)(CheckoutComp);
