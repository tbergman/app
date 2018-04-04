import { connect } from 'react-redux';
import Offer from '../../components/dashboard/Offer';
import { insuranceActions, types, eventActions } from 'hedvig-redux';

const mapStateToProps = (state) => {
  return {
    insurance: state.insurance,
    currentTotalPrice: state.insurance.currentTotalPrice,
    newTotalPrice: state.insurance.newTotalPrice,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInsurance: () => dispatch(insuranceActions.getInsurance()),
    checkout: () => {
      dispatch({
        type: types.CHECKOUT,
        payload: {},
      });
      ownProps.navigation.goBack();
    },
    closeModal: () => {
      dispatch(
        eventActions.event(
          {
            type: 'MODAL_CLOSED',
            value: 'quote',
          },
          {
            getMessagesAfter: true,
            showLoadingIndicator: true,
          },
        ),
      );
      ownProps.navigation.navigate({
        routeName: 'ChatBase',
      });
    },
    dispatch,
  };
};

const OfferContainer = connect(mapStateToProps, mapDispatchToProps)(Offer);

export default OfferContainer;
