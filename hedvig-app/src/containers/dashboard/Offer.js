import { connect } from 'react-redux';
import Offer from '../../components/dashboard/Offer';
import { insuranceActions, types, eventActions } from 'hedvig-redux';

const mapStateToProps = (state) => {
  return {
    insurance: state.insurance,
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
      ownProps.navigation.navigate({
        routeName: 'Conversation',
      });
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
        routeName: 'Conversation',
      });
    },
    dispatch,
  };
};

const OfferContainer = connect(mapStateToProps, mapDispatchToProps)(Offer);

export default OfferContainer;
